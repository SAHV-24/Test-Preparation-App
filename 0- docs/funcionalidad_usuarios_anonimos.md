
# 📦 Servicio Angular con Cache y Límite de Consultas (localStorage)

Este servicio permite consumir una API desde una aplicación Angular **sin autenticación**, limitando la cantidad de consultas a **3 veces cada 3 días**, y almacenando los datos obtenidos en el `localStorage` del navegador.

---

## 🎯 Objetivo

- Permitir **máximo 3 consultas a la API** por usuario anónimo.
- Los datos obtenidos se guardan en `localStorage`.
- Cada **3 días** se reinicia el contador de consultas y se permite consultar nuevamente.
- Evita consultas innecesarias al servidor.

---

## ⚙️ ¿Cómo funciona?

1. Se guarda la **cantidad de consultas** (`api_intentos`) y la **fecha del primer acceso** (`api_fecha_inicio`) en `localStorage`.
2. Si han pasado **más de 3 días** desde el primer acceso, el contador se reinicia.
3. Si no se ha alcanzado el límite, se permite consultar la API y se actualizan los datos en `localStorage`.
4. Si el límite se alcanzó y no han pasado 3 días, se evita la consulta y se muestra un mensaje de error.

---

## 📁 Ejemplo de uso

### Servicio Angular (`datos.service.ts`)

```ts
@Injectable({ providedIn: "root" })
export class DatosService {
  private readonly KEY_DATOS = "datos_guardados";
  private readonly KEY_INTENTOS = "api_intentos";
  private readonly KEY_FECHA = "api_fecha_inicio";
  private readonly URL = "https://api.ejemplo.com/datos";
  private readonly LIMITE = 3;
  private readonly DIAS_VALIDOS = 3;

  constructor(private http: HttpClient) {}

  private reiniciarSiPasaronTresDias() {
    const fechaInicio = localStorage.getItem(this.KEY_FECHA);
    if (!fechaInicio) return;

    const inicio = new Date(fechaInicio);
    const ahora = new Date();
    const diffEnDias =
      (ahora.getTime() - inicio.getTime()) / (1000 * 60 * 60 * 24);

    if (diffEnDias >= this.DIAS_VALIDOS) {
      localStorage.removeItem(this.KEY_INTENTOS);
      localStorage.removeItem(this.KEY_DATOS);
      localStorage.setItem(this.KEY_FECHA, ahora.toISOString());
    }
  }

  obtenerDatos() {
    this.reiniciarSiPasaronTresDias();

    const intentos = parseInt(
      localStorage.getItem(this.KEY_INTENTOS) || "0",
      10
    );
    const datos = localStorage.getItem(this.KEY_DATOS);

    if (datos) {
      return of(JSON.parse(datos));
    }

    if (intentos >= this.LIMITE) {
      return of({ error: "Límite alcanzado. Intenta más tarde." });
    }

    if (intentos === 0) {
      localStorage.setItem(this.KEY_FECHA, new Date().toISOString());
    }

    return this.http.get(this.URL).pipe(
      tap((res) => {
        localStorage.setItem(this.KEY_DATOS, JSON.stringify(res));
        localStorage.setItem(this.KEY_INTENTOS, String(intentos + 1));
      })
    );
  }
}
```
---

### Componente (`datos.component.ts`)

```ts
ngOnInit() {
  this.datosService.obtenerDatos().subscribe((res) => {
    if ('error' in res) {
      console.warn(res.error);
    } else {
      this.datos = res;
    }
  });
}
```

---

## 💡 Ventajas

- Disminuye carga en el backend
- Controla cuántas veces un usuario anónimo puede hacer peticiones
- Útil para demos, pruebas, o planes gratuitos con límites

---

## 🧪 Bonus: Cómo ver los datos guardados

Puedes abrir la consola del navegador y ejecutar:

```js
localStorage.getItem("datos_guardados");
localStorage.getItem("api_intentos");
localStorage.getItem("api_fecha_inicio");
```

---

## 📌 Consideraciones

- **No es seguro contra manipulación del usuario.** Esto es solo para frontend.
- Si los datos son sensibles o críticos, implementar la lógica también en el **backend** (por IP, token, etc.).

---
