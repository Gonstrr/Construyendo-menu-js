const inquirer = require('inquirer');
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: [
        
            {
                value :'1',
                name: `${' 1-'.yellow} Crear una tarea`
            },
            {
                value: '2',
                name: `${' 2-'.yellow} Listar una tarea`
            },
            {
                value: '3',
                name: `${' 3-'.yellow} Listar una tarea completadas`
            },
            {
                value: '4',
                name: `${' 4-'.yellow} Listar tareas pendientes(s)`
            },
            {
                value: '5',
                name: `${' 5-'.yellow} Completar una tarea `
            },
            {
                value: '6',
                name: `${' 6-'.yellow} Borrar una tarea`
            },
            {
                value: '0',
                name: `${' 0-'.red} Salir`
            },
        ]
    }
];

//menu de ejecuccion por consola.
const inquirerMenu = async () => {

    console.clear();
    console.log('|======================|'.green);
    console.log('     Menu de tareas'.yellow);
    console.log('|======================| '.green);
    console.log('');

    const {opcion}   = await inquirer.prompt(preguntas);

    return opcion;
}

const pausa = async () =>{
    const questions = [
        {
            type:'input',
            name:'enter',
            message:`Bienvenido al menu de tareas, Presione ${'Enter'.yellow} para continuar`
        }
    ];
    await inquirer.prompt(questions)
}
// leer lo que se escribe por consola
const leerInput = async(message) =>{

    const question = [
        {
            type:'input',
            name:'desc',
            message,
            validate(value){
                if( value.length === 0){
                    return 'por favor ingrese su valor ';
                }

                return true;
            }
        }
    ];
    const { desc } = await inquirer.prompt(question);
    return desc;
}

//listar tareas que deseas borrar 
const listarTareasBorrar = async( tareas = []) =>{
    const choices = tareas.map(( tarea , i) => {
        const idx = `${i + 1 }.`.green;
        return{
            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0'.green + ' Cancelar'
    });


    const preguntas = [
        {
            type: 'list',
            name:'id',
            message:'Borrar',
            choices
        }
    ]

    const { id } = await inquirer.prompt(preguntas);
    return id;
}  

const confirm = async (message) =>{

    const questions = [
        {
            type:'confirm',
            name:'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(questions);
    return ok;

}

//mostrar listado del checklist

const mostrarListadoCheckList = async( tareas = []) =>{

    const choices = tareas.map(( tarea , i) => {

        const idx = `${i + 1 }.`.green;

        return{
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false 
        }
    });

    const pregunta = [
        {
            type: 'checkbox',
            name:'ids',
            message:'Seleccione',
            choices
        }
    ]

    const { ids } = await inquirer.prompt(pregunta);
    return ids;
}  



module.exports={
    inquirerMenu,
    pausa,
    leerInput,
    listarTareasBorrar,
    confirm,
    mostrarListadoCheckList
}