# Product Vision

## Frase Guia
> Toda la operacion de tu escuela de conduccion en una sola pantalla: matriculas, agenda, pagos y flota, sin Excel, sin papel, sin errores.

## El Problema

Las escuelas de conduccion en Chile funcionan con Excel, papel y WhatsApp. La secretaria — que es quien sostiene la operacion entera — pierde horas cada dia cruzando planillas para saber si un instructor esta libre, si el vehiculo tiene la revision tecnica al dia y si el alumno no tiene deuda pendiente antes de agendar una clase. Ese cruce manual (el "Triple Match") es donde nacen los errores: doble-booking de instructores, vehiculos con SOAP vencido que siguen circulando, pagos que se pierden entre cuadernos y transferencias sin conciliar, y alumnos menores de 17 anos que llegan sin la autorizacion notarial porque nadie verifico su edad al matricularlos.

Mientras tanto, las boletas del SII se emiten en un sistema aparte, los cierres de caja se hacen a mano, y el dueno de la escuela no tiene visibilidad real de cuanto ingreso ni cuantas clases se dictaron hoy. Cada escuela reinventa su propio caos operativo con las mismas herramientas insuficientes.

## Para Quien Es (Target)

- **Primario**: La secretaria de escuela de conduccion. Ejecuta mas de 100 acciones diarias: matricula alumnos, agenda clases, cobra pagos, cuadra caja, imprime boletas y coordina instructores. Necesita una herramienta que le permita hacer todo eso sin cambiar de sistema ni de pestana. No es una persona tecnica; valora que las cosas funcionen al primer intento.
- **Secundario**: El administrador/dueno de la escuela. Necesita visibilidad financiera y operativa en tiempo real, control multi-sede, y la tranquilidad de que los procesos criticos (documentos vigentes, pagos registrados, normativa cumplida) estan bajo control sin depender de preguntar por WhatsApp.
- **Terciario**: Instructores (ven su agenda del dia, firman fichas digitales) y alumnos (consultan sus clases, su estado de cuenta, agendan horarios disponibles).

## Como Debe Sentirse

Debe sentirse como el mejor dia de trabajo de la secretaria: todo a la mano, sin sorpresas, sin tener que pensar dos veces. Abre la plataforma y ve exactamente que tiene pendiente. Matricula un alumno en 3 minutos con validaciones automaticas que la protegen de errores (RUT invalido, menor sin autorizacion, documentos faltantes). Agenda una clase arrastrando un bloque en el Gantt y el sistema ya verifico por ella que el instructor, el vehiculo y el alumno estan disponibles. Cobra y el pago queda registrado, conciliado y listo para el cierre de caja.

No debe sentirse como "software empresarial". Debe sentirse como una herramienta hecha por alguien que entendio exactamente como funciona una escuela de conductores en Chile.

## Principios de Producto

1. **La secretaria es la estrella.** Cada decision de diseno se evalua primero desde su flujo de trabajo. Si una funcionalidad le agrega un clic innecesario, esta mal disenada.
2. **Validar antes, no corregir despues.** El sistema debe prevenir errores en el punto de entrada — edad minima, RUT, disponibilidad, documentos vencidos — en lugar de permitirlos y generar alertas retroactivas.
3. **Si el sistema puede calcularlo, no lo preguntes.** Horas restantes del alumno, disponibilidad del instructor, estado de deuda, vigencia del SOAP: todo dato derivable se calcula automaticamente. Cero entrada de datos redundante.
4. **Especializado vence a generico.** Cada pantalla, cada campo y cada flujo existe porque resuelve un problema real de una escuela de conduccion chilena. No agregamos funcionalidades "por si acaso" ni generalizamos para otros verticales.
5. **Visibilidad instantanea.** El estado actual de la operacion (financiero, agenda, flota, alumnos) debe ser comprensible en menos de 5 segundos desde el dashboard. Datos accionables, no reportes para descargar.

## Filosofía de Agendamiento y Disponibilidad

El corazón de la operación es el **Triple Match**: Alumno, Instructor y Vehículo. Para que la secretaria no tenga que cruzar datos mentalmente, el sistema se basa en la **Disponibilidad Estructural**:
- **Horarios Reutilizables:** Los instructores y vehículos operan sobre "plantillas semanales" (bloques horarios recurrentes). La secretaria configura la semana típica una sola vez mediante selectores interactivos, y el sistema proyecta esa disponibilidad hacia el futuro.
- **Cálculo, no Input:** Cuando un alumno busca un horario, el sistema ya cruzó la plantilla del instructor, la disponibilidad del vehículo (considerando mantenimientos) y las horas restantes del alumno. Solo se muestran los bloques que garantizan un proceso exitoso.
- **Flexibilidad Controlada:** Si un instructor tiene un imprevisto o un auto va al taller, simplemente se bloquea ese espacio específico en la matriz general. El sistema actualiza en tiempo real la vista de matrícula online, logrando cero fricción y garantizando que no existan reservas superpuestas.

## Anti-Goals (Lo que NO somos)

1. **No somos un CRM generico.** No gestionamos pipelines de venta, ni campanas de marketing, ni leads. Gestionamos la operacion completa desde que el alumno se matricula hasta que recibe su certificado.
2. **No somos un ERP.** No manejamos inventario general, compras, proveedores ni contabilidad completa. Nuestro alcance financiero es pagos de alumnos, boletas SII y cuadratura de caja — lo que la escuela necesita dia a dia.
3. **No somos una plataforma de e-learning.** No impartimos clases teoricas online ni tenemos contenido educativo. Las clases practicas se agendan y registran, pero la ensenanza ocurre en el vehiculo.
4. **No buscamos escalar a otros verticales.** No vamos a "adaptar" el sistema para academias de idiomas, gimnasios o consultorios. Somos software vertical para escuelas de conduccion y toda la profundidad del producto esta ahi.
5. **No reemplazamos al contador.** Generamos boletas y reportes financieros operativos, pero la contabilidad formal, declaraciones de impuestos y balance general siguen siendo responsabilidad del contador de la escuela.
