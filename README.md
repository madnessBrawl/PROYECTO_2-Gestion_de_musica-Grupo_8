# PROYECTO_2-Gestion_de_musica-Grupo_8

objetivo: crear una pagina de gestion de musica(artistas, albunes, detalles,etc)

Fecha de entrega: 09/07/2026 (semana 16) 

Partes:

1) Pagina de inicio

- interfaz de bienvenidad
- flujo de autentificacion (inicion de sesion con sus datos y validacion de estos) que conecte a un servidor personal.
- feebak visual (indicador de carga - spinners - durante la validacion de datos)
- el usuario debe tener control total para cerrar su sesión de forma segura, garantizando la limpieza de tokens y el retorno a la pantalla de bienvenida.

2) Dashboard(pagina principal de busqueda - core musical)

-  buscador de artistas dinamico debe ser capaz de
procesar peticiones asíncronas mediante APIs(Deezer)
- manejar casos donde el artista no exista o no tenga contenido, es decir, mostrar estados vacíos descriptivos 
en lugar de errores genéricos.
- panel de detalles de artistas con presentacion estetica y semantica(albunes y tracks)
- reproductor integrado con iteraccion con los albunes para desplegar sus canciones y habilitar su reproduccion inmediata

3) Gestion de albunes por usuario

-coleccion privada de usuario(albunes favoritos) y su visualizacion privada.
- sistema de calificacion por estrellas (1-5 estrellas) por albun
- persistencia de los datos
- filtro dinamico de albunes segun la calificacion otorgada.

(+) Requerimientos tecnicos: 

+ modo claro/oscuro
+ modo offline
+ persistencia de los datos con gestionamiento de los mismo de forma local para asegurar que se mantengan incluso tras cerrar sesion.
+ diseño adaptable y responsivo a cualquier resolucion de dispositivo.
+ Sincronizacion de datos, con la  capacidad de carga de la interfaz y registro de calificaciones en ausencia de red y los cambios realizados localmente deben impactar en el sistema al recuperar la conexión.

(!!!)Está prohibido el uso de:
◆ Cualquier marco de trabajo (framework) o de desarrollo de software: React, Angular, Vue.js, Svelte, Solid.js, Next.js, Nuxt, js, entre otros.

(-) Cosas a tomar en cuenta:

- Se puede usar librerías o preprocesadores de estilos: Bootstrap, Tailwind CSS, etc .
- Se utilizarán datos del API de deezer.
- Se deberá optar exclusivamente por el uso de CSS puro o una única librería de estilos. La implementación combinada de ambas tecnologías se considerará una falta a los criterios de evaluación y conlleva una penalización en la calificación final.
- Se utilizará Deezer como API para realizar peticiones HTTP.
- El código tendrá una ponderación en base a 5 puntos, y la defensa consta de los otros 15 puntos.