import { Ejercicio } from './ejercicio';

export const EJERCICIOS: Ejercicio[] = [
  {
    id: '1.1',
    temaId: '1',
    pregunta:
      'Un empleado solicita un préstamo de $10.000 y debe pagar $10.700 exactamente un año después. Determine el interés pagado por el prestatario.',
    respuesta:
      'El interés pagado se calcula como la diferencia entre la cantidad final que se debe y la suma original del préstamo [1].\nInterés = $10.700 (cantidad que se debe ahora) - $10.000 (suma original) = $700 [2, 3].\nRespuesta: $700',
  },
  {
    id: '1.2',
    temaId: '1',
    pregunta:
      'Usando los datos del Ejercicio 1 ($10.000 de préstamo, $10.700 pagados después de un año, interés pagado de $700), determine la tasa porcentual de interés pagada durante ese año.',
    respuesta:
      'La tasa porcentual de interés se calcula como el interés pagado dividido por la suma original, multiplicado por 100% [2, 3].\nTasa porcentual de interés = ($700 / $10.000) * 100% = 0,07 * 100% = 7% anual [2, 3].\nRespuesta: 7% anual',
  },
  {
    id: '1.3',
    temaId: '1',
    pregunta:
      'Pacific Telephone otorgó un préstamo de $1.000 a un miembro del personal de ingeniería por tres años con un interés simple de 5% anual. Calcule el interés total a pagar al final de los tres años.',
    respuesta:
      'El interés simple se calcula utilizando la fórmula I = P * n * i, donde P es la suma original, n es el número de periodos, e i es la tasa de interés por periodo [4].\nInterés total = $1.000 (P) * 3 (n) * 0.05 (i en decimal) = $150 [5].\nRespuesta: $150',
  },
  {
    id: '1.4',
    temaId: '1',
    pregunta:
      'Retomando el Ejercicio 3 ($1.000 de préstamo, interés simple 5% anual por 3 años, interés total de $150), ¿cuánto debe pagar el ingeniero al final de los tres años en total (principal + interés)?',
    respuesta:
      'El monto total adeudado es la suma original más el interés total [5].\nAdeudo total = $1.000 (Suma original) + $150 (Interés total) = $1.150 [5].\nRespuesta: $1.150',
  },
  {
    id: '1.5',
    temaId: '1',
    pregunta:
      'Un ingeniero solicita un préstamo de $1.000 con un interés anual compuesto de 5%. Utilice la fórmula de interés compuesto para calcular el adeudo total después de 3 años.',
    respuesta:
      'La fórmula para el adeudo total con interés compuesto es: Adeudo total = Suma original * (1 + tasa de interés)^n [6].\nAdeudo total = $1.000 * (1 + 0.05)^3 = $1.000 * (1.05)^3 = $1.000 * 1,157625 = $1.157,63 [6].\nRespuesta: $1.157,63',
  },
  {
    id: '1.6',
    temaId: '1',
    pregunta:
      'Un ingeniero solicita un préstamo de $1.000 con un interés anual compuesto de 5%. Calcule el interés generado en el primer, segundo y tercer año, y el adeudo total al final de cada año.',
    respuesta:
      'Con interés compuesto, el interés de cada periodo se calcula sobre la suma original más los intereses acumulados [7].\nAño 1: Interés = $1.000 * 0.05 = $50. Adeudo = $1.000 + $50 = $1.050 [8].\nAño 2: Interés = $1.050 * 0.05 = $52,50. Adeudo = $1.050 + $52,50 = $1.102,50 [8].\nAño 3: Interés = $1.102,50 * 0.05 = $55,13. Adeudo = $1.102,50 + $55,13 = $1.157,63 [8].\nRespuesta: Año 1: Interés $50, Adeudo $1.050. Año 2: Interés $52,50, Adeudo $1.102,50. Año 3: Interés $55,13, Adeudo $1.157,63.',
  },
  {
    id: '1.7',
    temaId: '1',
    pregunta:
      'Calcule la tasa de interés periódica para un préstamo con una tasa nominal del 9% anual compuesto trimestralmente.',
    respuesta:
      'La tasa de interés periódica (ip) se calcula como la tasa nominal (r) dividida por el número de veces (m) que el periodo de capitalización cabe en el periodo de la tasa nominal [9, 10].\nTasa nominal (r) = 9% anual. Periodo de capitalización = trimestral. Número de trimestres en un año (m) = 4.\nip = 9% anual / 4 trimestres/año = 2,25% trimestral [11, 12].\nRespuesta: 2,25% trimestral',
  },
  {
    id: '1.8',
    temaId: '1',
    pregunta:
      'Calcule la tasa de interés periódica para un préstamo con una tasa nominal del 4,5% semestral compuesto semanalmente.',
    respuesta:
      'La tasa de interés periódica (ip) se calcula como la tasa nominal (r) dividida por el número de veces (m) que el periodo de capitalización cabe en el periodo de la tasa nominal [9, 10].\nTasa nominal (r) = 4,5% semestral. Periodo de capitalización = semanal. Número de semanas en un semestre (m) = 26 (considerando 52 semanas en un año) [11, 12].\nip = 4,5% semestral / 26 semanas/semestre = 0,173% semanal (aproximadamente) [11, 12].\nRespuesta: 0,173% semanal',
  },
  {
    id: '1.9',
    temaId: '1',
    pregunta:
      'Calcule la tasa de interés efectiva anual equivalente a una tasa de interés nominal del 12% anual, compuesta semestralmente.',
    respuesta:
      'La tasa de interés efectiva anual (ie) se calcula a partir de la tasa periódica (ip) y el número de capitalizaciones por año (m) usando la fórmula ie = (1 + ip)^m - 1 [10, 13, 14].\nTasa nominal (r) = 12% anual. Periodo de capitalización = semestral. Número de capitalizaciones por año (m) = 2.\nTasa periódica (ip) = r / m = 12% / 2 = 6% semestral = 0,06.\nie = (1 + 0,06)^2 - 1 = (1,06)^2 - 1 = 1,1236 - 1 = 0,1236 = 12,36% efectivo anual [14].\nRespuesta: 12,36% efectivo anual',
  },
  {
    id: '1.10',
    temaId: '1',
    pregunta:
      '¿Cuál es la tasa efectiva que se cobra por un préstamo bancario que se pactó al 20% de interés anual convertible bimestralmente?',
    respuesta:
      'La tasa efectiva anual (ie) se calcula a partir de la tasa periódica (ip) y el número de capitalizaciones por año (m) usando la fórmula ie = (1 + ip)^m - 1 [10, 13, 15].\nTasa nominal (r) = 20% anual. Periodo de capitalización = bimestral. Número de capitalizaciones por año (m) = 12 meses / 2 meses = 6 [15].\nTasa periódica (ip) = r / m = 20% / 6 = 3,333...% bimestral = 0,20/6.\nie = (1 + 0,20/6)^6 - 1 ≈ (1,033333)^6 - 1 ≈ 1,21740 - 1 = 0,21740 = 21,74% efectivo anual [15].\nRespuesta: 21,74% efectivo anual',
  },
  {
    id: '2.1',
    temaId: '2',
    pregunta:
      'Un cliente recibirá $5.000.000 dentro de 4 años. Si la tasa de descuento es del 12% anual, ¿cuál es el valor presente del dinero hoy?',
    respuesta: '$3.175.579,56',
  },
  {
    id: '2.2',
    temaId: '2',
    pregunta:
      'Una empresa puede invertir en un proyecto que le dará $2.000.000 anuales durante 6 años. Si la tasa de interés es del 10% anual, ¿cuál es el valor presente total de estos flujos?',
    respuesta: '$8.528.200,87',
  },
  {
    id: '2.3',
    temaId: '2',
    pregunta:
      'Una persona debe elegir entre recibir $50.000 hoy o $80.000 dentro de 10 años. Si la tasa es del 5% anual, ¿cuál opción tiene mayor valor presente?',
    respuesta: 'Recibir $50.000 hoy (VP del futuro: $49.078,03)',
  },
  {
    id: '2.4',
    temaId: '2',
    pregunta:
      'Calcular el valor futuro de una inversión de $1.500.000 durante 5 años al 8% anual compuesto.',
    respuesta: '$2.203.476,20',
  },
  {
    id: '2.5',
    temaId: '2',
    pregunta:
      '¿Cuánto deberías invertir hoy para tener $10.000.000 dentro de 7 años si la tasa anual es del 9%?',
    respuesta: '$5.476.986,62',
  },
  {
    id: '2.6',
    temaId: '2',
    pregunta:
      'Una deuda de $25.000.000 será pagada en 5 cuotas anuales iguales al 10% de interés. ¿Cuánto será el valor de cada cuota (amortización clásica)?',
    respuesta: '$6.598.566,63',
  },
  {
    id: '2.7',
    temaId: '2',
    pregunta:
      'Un préstamo de $30.000.000 se paga con 4 cuotas anuales iguales al 12% de interés. Calcula el valor de cada cuota bajo amortización francesa.',
    respuesta: '$9.821.097,66',
  },
  {
    id: '2.8',
    temaId: '2',
    pregunta:
      'Una persona deposita $3.000.000 cada año durante 6 años en una cuenta al 10% anual. ¿Cuál será el valor futuro acumulado?',
    respuesta: '$24.282.177,40',
  },
  {
    id: '2.9',
    temaId: '2',
    pregunta:
      'Una empresa quiere pagar una deuda de $50.000.000 en 10 cuotas mensuales iguales al 2% mensual. ¿Cuánto debe pagar cada mes?',
    respuesta: '$5.578.017,84',
  },
  {
    id: '2.10',
    temaId: '2',
    pregunta:
      'Tienes la opción de recibir $10.000.000 dentro de 5 años o $6.500.000 hoy. Si la tasa es del 10% anual, ¿cuál opción conviene más?',
    respuesta: 'Recibir $6.500.000 hoy (VP del futuro: $6.209.213,67)',
  },
  {
    id: '3.1',
    temaId: '3',
    pregunta:
      '¿Cuál es el objetivo principal de aplicar criterios financieros en la evaluación de proyectos?',
    respuesta:
      'Determinar si un proyecto genera valor económico y tomar decisiones informadas sobre su viabilidad.',
  },
  {
    id: '3.2',
    temaId: '3',
    pregunta:
      '¿Qué representa el Valor Presente Neto (VPN) en un análisis de proyectos?',
    respuesta:
      'La diferencia entre el valor presente de los ingresos y egresos de un proyecto. Si el VPN es positivo, el proyecto es rentable.',
  },
  {
    id: '3.3',
    temaId: '3',
    pregunta: '¿En qué se diferencia la TIR del VPN como criterio de decisión?',
    respuesta:
      'La TIR indica la tasa de rentabilidad de un proyecto, mientras que el VPN muestra el valor monetario generado. Ambos deben usarse en conjunto.',
  },
  {
    id: '3.4',
    temaId: '3',
    pregunta: '¿Qué indica una relación Beneficio/Costo menor a 1?',
    respuesta:
      'Que los costos superan a los beneficios esperados; el proyecto no es rentable.',
  },
  {
    id: '3.5',
    temaId: '3',
    pregunta:
      'Un proyecto requiere una inversión de $50.000.000 y genera flujos anuales de $15.000.000 durante 5 años. Si la tasa es del 10%, ¿el VPN es positivo o negativo?',
    respuesta: 'VPN positivo: $12.317.573,81',
  },
  {
    id: '3.6',
    temaId: '3',
    pregunta:
      'Un proyecto genera un VPN de $8.000.000 y una TIR del 14% con una tasa de descuento del 10%. ¿Es recomendable invertir?',
    respuesta:
      'Sí, porque el VPN es positivo y la TIR es mayor a la tasa de descuento.',
  },
  {
    id: '3.7',
    temaId: '3',
    pregunta:
      'Un proyecto tiene beneficios de $90.000.000 y costos de $60.000.000. ¿Cuál es la relación B/C y qué indica?',
    respuesta: '1.5; indica que el proyecto es rentable (B/C > 1)',
  },
  {
    id: '3.8',
    temaId: '3',
    pregunta:
      'Se invierten $20.000.000 y se reciben $5.000.000 anuales durante 6 años. ¿Cuál es el periodo de recuperación?',
    respuesta: '4 años',
  },
  {
    id: '3.9',
    temaId: '3',
    pregunta:
      'Un proyecto devuelve $6.000.000 anuales y requiere $24.000.000 de inversión. ¿Cuál es el periodo de recuperación y es aceptable si el límite es 5 años?',
    respuesta: 'PR = 4 años. Sí es aceptable.',
  },
  {
    id: '3.10',
    temaId: '3',
    pregunta:
      'Un proyecto genera un VPN de -$2.500.000. ¿Qué decisión debe tomarse?',
    respuesta: 'Rechazar el proyecto; el VPN negativo indica pérdida de valor.',
  },
  {
    id: '3.11',
    temaId: '3',
    pregunta:
      'Se analiza un proyecto con una TIR de 7% y una tasa mínima atractiva del 9%. ¿Qué se concluye?',
    respuesta: 'Rechazar el proyecto; la TIR es menor a la tasa exigida.',
  },
  {
    id: '3.12',
    temaId: '3',
    pregunta: 'Un proyecto tiene B/C = 0.85. ¿Qué indica y qué acción tomar?',
    respuesta:
      'Indica que los beneficios no cubren los costos; debe rechazarse.',
  },
  {
    id: '4.1',
    temaId: '4',
    pregunta:
      '¿Cuáles pueden ser los impactos perjudiciales en un proyecto, la organización y la profesión si un director de proyectos no mantiene los estándares profesionales?',
    respuesta:
      'Si un director de proyectos no logra mantener los estándares profesionales de la profesión puede tener **impactos perjudiciales en el proyecto y en la organización**, como así también en la **profesión como un todo** [1]. **No se puede degradar la credibilidad sobre una certificación y la práctica profesional del ingeniero** [1].',
  },
  {
    id: '4.2',
    temaId: '4',
    pregunta:
      "Dentro de los criterios del sector público para evaluar proyectos, ¿qué significa 'Aporte social' y cómo se define el 'valor agregado' en este contexto?",
    respuesta:
      "El 'Aporte social' corresponde al **aporte en valor agregado que está recibiendo la comunidad** [2]. El valor agregado se define como la **diferencia entre el valor de la venta de la producción estimada en el proyecto y las compras que se hacen a otras empresas** (materia prima, energía, lubricantes, repuestos, etc.) [2]. Numéricamente, el valor agregado es **igual a la suma de sueldos, salarios, arriendos, intereses y utilidades de la empresa** [2].",
  },
  {
    id: '4.3',
    temaId: '4',
    pregunta:
      "Además del 'Aporte social' y la 'Coherencia con los planes de desarrollo', ¿qué otros criterios generales se consideran en la evaluación de proyectos del sector público?",
    respuesta:
      'Otros criterios generales considerados en la evaluación de proyectos del sector público son:\n*   **Crecimiento económico**: Medido cuantitativamente con índices como el Producto Interno Bruto (PIB) y el Ingreso Nacional Bruto (INB) [3].\n*   **Generación de empleo**: Indicando el número de empleos directos durante la etapa de operación, así como algunos indicadores: por ejemplo, capital invertido por persona ocupada (K/E) [3].\n*   **Impacto socioeconómico**: Orientado a identificar y cuantificar los distintos grupos de población afectados por el proyecto, tanto por el lado de los beneficios como por el de los costos; asimismo, estudia las características y su comportamiento en el mercado con la ampliación de la oferta de bienes y/o servicios, producto de la ejecución del proyecto [3].\n*   **Desarrollo tecnológico**: Orientado a indicar los beneficios que representa para el país la utilización de la tecnología propuesta para el proyecto [4].',
  },
  {
    id: '4.4',
    temaId: '4',
    pregunta:
      "¿Qué constituye la 'evaluación social' y qué tipo de aspectos incluye su análisis?",
    respuesta:
      'La evaluación social **constituye la verdadera manera de medir la rentabilidad para la sociedad de la realización de un proyecto** [4]. En este análisis se incluyen **todos aquellos aspectos que no tienen valoración clara en el mercado o que simplemente no pueden ser apropiados por el proyecto** [4]. La evaluación social **estudia y mide el aporte neto de éste al bienestar nacional** [4].',
  },
  {
    id: '4.5',
    temaId: '4',
    pregunta:
      'Mencione y describa brevemente al menos tres características de la evaluación social',
    respuesta:
      'Aquí hay algunas características de la evaluación social:\n*   Es un proceso mediante el cual el inversionista llega a conocer mejor de qué manera el contexto sociocultural, institucional, histórico y político influye en los resultados en materia de desarrollo social de ciertos proyectos de inversión y políticas sectoriales [5].\n*   Es un medio de mejorar la equidad, fortalecer la inclusión y la cohesión sociales, promover una gestión de gobierno transparente y empoderar a los pobres y vulnerables a fin de que puedan participar en el diseño y/o implementación del proyecto [5].\n*   Es un mecanismo para identificar las oportunidades, limitaciones, impactos y riesgos sociales asociados a las políticas públicas y al diseño del proyecto [6].\n*   Es un marco para el diálogo sobre las prioridades de desarrollo entre los grupos sociales, la sociedad civil, las organizaciones populares, diferentes niveles de gobierno y otros actores sociales [6].\n*   Es un enfoque tendiente a identificar y mitigar los posibles riesgos sociales de los proyectos de inversión, incluidos sus impactos sociales adversos [6].',
  },
  {
    id: '4.6',
    temaId: '4',
    pregunta:
      '¿Qué debe incluir un análisis institucional dentro de la evaluación social?',
    respuesta:
      'El análisis institucional dentro de la evaluación social debe incluir el **relevamiento detallado de las organizaciones formales e informales que pueden gravitar en el proyecto**, así como de las **reglas y conductas informales propias de la relación entre dichas organizaciones** [7].',
  },
  {
    id: '4.7',
    temaId: '4',
    pregunta:
      "¿Cómo se define la 'Evaluación Ambiental' y cuál es su objetivo principal?",
    respuesta:
      'La Evaluación Ambiental se define como un **proceso sistemático de evaluación de las potenciales consecuencias ambientales de las iniciativas de propuestas de proyecto** [8]. Su objetivo principal es que los responsables de la toma de decisiones **puedan considerarlas lo más temprano posible en el diseño, conjuntamente con las consideraciones socioeconómicas, con el fin de garantizar la sustentabilidad ambiental** [8].',
  },
  {
    id: '4.8',
    temaId: '4',
    pregunta:
      '¿Qué aspectos clave debe abarcar normalmente una evaluación ambiental para un proyecto específico?',
    respuesta:
      'Una evaluación ambiental para un proyecto específico debe normalmente abarcar:\n*   Las **actuales condiciones ambientales de “base”** [9].\n*   Los **potenciales impactos ambientales directos e indirectos**, incluyendo oportunidades para mejorar el medio ambiente [9].\n*   La **sistemática comparación ambiental entre las alternativas** para inversión, ubicación, tecnología y diseño [9].\n*   Las **medidas preventivas, atenuantes y compensatorias**, generalmente en forma de un plan de acción [9].\n*   La **administración y capacitación ambiental** [9].\n*   El **seguimiento** [9].',
  },
  {
    id: '4.9',
    temaId: '4',
    pregunta:
      'Describa al menos tres características de los impactos ambientales (ej. magnitud, duración, reversibilidad).',
    respuesta:
      'Aquí hay tres características de los impactos ambientales:\n*   **La magnitud del impacto**: Informa de su extensión y representa la “cantidad e intensidad del impacto” [10]. Busca cuantificar el impacto (ej. cuántas hectáreas afectadas, número de especies amenazadas, volumen de contaminantes) [10].\n*   **La duración del impacto**: Se refiere al comportamiento en el tiempo de los impactos ambientales previstos, indicando si es a corto plazo y luego cesa, si aparece rápidamente, si su culminación es a largo plazo, o si es intermitente [11].\n*   **La reversibilidad del impacto**: Tiene en cuenta la posibilidad, dificultad o imposibilidad de retornar a la situación anterior a la acción [12]. Se habla de impactos reversibles y de impactos terminales o irreversibles [12].',
  },
  {
    id: '4.10',
    temaId: '4',
    pregunta:
      'Liste al menos (4) cuatro métodos para medir los impactos ambientales.',
    respuesta:
      'Aquí hay al menos cuatro métodos para medir los impactos ambientales:\n*   Las **reuniones de expertos** [13].\n*   Las **“check lists”** [13].\n*   Las **matrices simples de causa-efecto** [13].\n*   Los **grafos y diagramas de flujo** [13].\n*   La **cartografía ambiental o superposición de mapas (overlay)** [13].\n*   Redes [13].\n*   Sistemas de Información Geográficos [13].\n*   Matrices [13].',
  },
  // Tema 5: PERT/CPM
  {
    id: '5.1',
    temaId: '5',
    pregunta:
      '¿Qué significa la sigla CPM y para qué se utiliza en gestión de proyectos?',
    respuesta:
      "CPM significa 'Critical Path Method' y se usa para identificar la secuencia de actividades que determinan la duración mínima del proyecto.",
  },
  {
    id: '5.2',
    temaId: '5',
    pregunta: '¿Cuál es la principal diferencia entre PERT y CPM?',
    respuesta:
      'PERT considera tiempos probabilísticos (optimista, más probable y pesimista), mientras que CPM trabaja con duraciones deterministas.',
  },
  {
    id: '5.3',
    temaId: '5',
    pregunta: '¿Qué es una actividad crítica en CPM?',
    respuesta:
      'Una actividad cuya demora afecta directamente la duración total del proyecto; tiene holgura cero.',
  },
  {
    id: '5.4',
    temaId: '5',
    pregunta: '¿Qué representa el diagrama de red en PERT/CPM?',
    respuesta:
      'Una representación gráfica de las actividades del proyecto y sus dependencias.',
  },
  {
    id: '5.5',
    temaId: '5',
    pregunta: '¿Qué es la holgura total de una actividad?',
    respuesta:
      'Es el tiempo que una actividad puede retrasarse sin afectar la duración del proyecto.',
  },
  {
    id: '5.6',
    temaId: '5',
    pregunta: '¿Qué se entiende por camino crítico?',
    respuesta:
      'La secuencia de actividades con la mayor duración total, sin holgura, que define el tiempo mínimo del proyecto.',
  },
  {
    id: '5.7',
    temaId: '5',
    pregunta:
      '(Dibuja el Diagrama de Red) y Calcula Lista de Actividades, Ruta Crítica , Duración total del proyecto y Holgura de las Actividades',
    respuesta:
      'Lista de Actividades: A, B, C, D \n Duración Total del Proyecto: 12 días \n Holgura de las Actividades: \n A: 0 días\n B: 2 días\nC: 0 días\nD: 0 días\nRuta Crítica: A -> C -> D',
    fotoUrl: 'https://i.imgur.com/NRJ0Kbj.png',
  },
  {
    id: '5.8',
    temaId: '5',
    pregunta:
      'Calcula la Ruta crítica y la duración total y Dibuja el Diagrama de Red',
    respuesta: 'A → C → D → E.\nDuración Total: 16 días',
    fotoUrl: 'https://i.imgur.com/dAP28oE.png',
  },
  {
    id: '5.9',
    temaId: '5',
    pregunta:
      'Un proyecto tiene las siguientes actividades con sus tiempos estimados: optimista (To), más probable (Tm) y pesimista (Tp). Calcula la duración esperada de la actividad y su varianza.',
    respuesta: 'Duración esperada = 8.3333 días; varianza = 4',
    fotoUrl: 'https://i.imgur.com/08uFLOm.png',
  },
];
