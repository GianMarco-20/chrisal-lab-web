# Módulo de Laboratorio — Flujo de datos y requerimientos
## Clínica Chrisal · Versión 2.0 (Actualizado)

---

## 1. Enfoque General

El módulo de laboratorio diferencia su flujo del de consultorio médico. En laboratorio se genera una **Orden Médica** que agrupa múltiples exámenes solicitados en un mismo momento.

### Diferencias Clave con Consultorio
* **Atención:** Realizada por Enfermería (rol `recepcion`), sin médico asignado.
* **Momentos del flujo:** 
  1. Triaje (se mantiene por requerimiento actual).
  2. Toma de muestra (se asigna el estado En análisis).
  3. Registro de resultados (por examen).
* **Resultados:** Se registran de forma individual por examen. Una orden puede tener resultados parciales.
* **Roles:** El rol `laboratorio` ha sido eliminado. Las acciones las realiza el personal de recepción o administradores.

---

## 2. Estados de Citas (Órdenes de Laboratorio)

Los estados permiten hacer seguimiento al progreso de la orden médica:

| Estado | Significado | Acciones Permitidas |
|---|---|---|
| **Pendiente** | Orden recién creada. | Registrar triaje, Anular. |
| **Confirmada** | El paciente pasó por triaje. | Registrar toma de muestra. |
| **En análisis** | Se tomó la muestra y está siendo analizada. | Registrar resultados por examen, Anular. |
| **Resultado parcial** | Al menos un examen tiene resultado, pero faltan otros. | Registrar resultados restantes, Anular. |
| **Resultado listo** | Todos los exámenes tienen resultado registrado. (Estado final) | Ver, editar e imprimir resultados. |
| **Anulada** | La orden fue anulada por muestra insuficiente o error. | Ver motivo de anulación. |

---

## 3. Roles del Sistema

| Rol | Permisos en Laboratorio |
|---|---|
| **admin** | Acceso total. Puede crear órdenes, registrar muestras, registrar resultados, imprimir y editar fechas de toma de muestra. |
| **recepcion** | Crear órdenes, registrar triaje, registrar toma de muestra y registrar resultados. Las fechas se asignan automáticamente. |
| **medico** | Sin acceso al módulo de laboratorio. |

> Nota: El usuario que figura en cada acción se toma automáticamente de la sesión activa para propósitos de trazabilidad.

---

## 4. Requerimientos Funcionales

* **RF-LAB-01:** Registrar nueva orden médica. Incluye DNI del paciente, selección de exámenes por categoría y paso previo por triaje.
* **RF-LAB-02:** La fecha y hora de la toma de muestra se asignan automáticamente al momento del registro en el sistema. (Solo el admin puede editarlas posteriormente).
* **RF-LAB-03:** Al registrar la toma de muestra, la orden pasa a estado **En análisis** y se guarda el usuario que tomó la muestra (`usuario_muestra_id`).
* **RF-LAB-04:** El listado de laboratorio incluye filtros por estado (Pendiente, Confirmada, En análisis, Resultado parcial, Resultado listo, Anulada).
* **RF-LAB-05:** El detalle de la orden muestra la trazabilidad: paciente, usuario de toma de muestra, usuario que registró resultados, fechas y el progreso de cada examen.
* **RF-LAB-06:** Se registrará el resultado de manera individual por examen.
* **RF-LAB-07:** Al guardar el resultado de un examen, se registra qué usuario lo ingresó (`resultados_examen.usuario_id`). Si faltan exámenes, el estado de la orden pasa a **Resultado parcial**.
* **RF-LAB-08:** Cuando todos los exámenes de la orden tienen resultado, la cita cambia automáticamente a **Resultado listo**.
* **RF-LAB-09:** Se generará un documento en PDF para la impresión de los resultados, el cual no requiere registrar en base de datos el momento de la impresión.
* **RF-LAB-10:** Se habilita la opción de **Anular** la orden de laboratorio en caso de errores o muestras insuficientes.

---

## 5. Cambios en Base de Datos

1. **Tabla `detalle_laboratorio`**: Relacionada 1 a 1 con la cita, guarda `usuario_muestra_id`, `fecha_muestra`, `usuario_resultado_id`, `fecha_resultado`.
2. **Tabla `resultados_examen`**: Añade `usuario_id` para saber quién ingresó cada resultado específico.
3. **Rol de Laboratorio**: Eliminado de la tabla `roles` y de la gestión de usuarios.
4. **Estados**: Incorporación de los estados `resultado_parcial` y `anulada` al manejo en el backend.
