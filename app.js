require('colors');
const { guardarDB,leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu,
        pausa,
        leerInput,
        listarTareasBorrar,
        confirm,
        mostrarListadoCheckList
        
} = require('./helpers/inquirer');

const Tareas = require('./models/tareas');

const main = async () => {
    let opt ='';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if (tareasDB ){
        tareas.cargarTareasFromArray(tareasDB);

    }

    await pausa();

    do{
        opt = await inquirerMenu();
        switch(opt){
            case '1':
                //crear opcion

                const desc = await leerInput('Descripcion: ');
                tareas.crearTarea(desc);

            break;

            case '2':
                tareas.listadoCompleto();

            break;
            case '3'://listar las tareas completadas
                tareas.listarPendientesCompletadas(true);

            break;
            case '4'://listar las tareas pendientes
                tareas.listarPendientesCompletadas(false);
            break;

            case '5':// dejar como completado o pendientes
                const ids = await mostrarListadoCheckList(tareas.listadoArr);
                tareas.toggleCompletadas(ids);

            break;

            case '6':
                const id = await listarTareasBorrar(tareas.listadoArr);
                if ( id !== '0'){ 
                    const ok = await confirm('¿Estas seguro ? ');
                    if ( ok ){
                        tareas.borrarTarea(id);
                        console.log('tarea borrada');
                    }

                }
            break;

        }

        guardarDB(tareas.listadoArr);
        

        await pausa();


    } while( opt !== '0');
    //pausa();
    
}

main();