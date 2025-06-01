# Respuestas de Endpoints Especiales FyEvP

## Dashboard

### /api/dashboard/usuarios/colaboradores/count
```json
{
  "totalColaboradores": 5
}
```

### /api/dashboard/temas/count
```json
{
  "totalTemas": 12
}
```

### /api/dashboard/preguntas/count
```json
{
  "totalPreguntas": 50
}
```

### /api/dashboard/respuestas/count
```json
{
  "totalRespuestas": 200
}
```

## Pregunta Aleatoria Pública

### /api/preguntas/public/random/:idTema?exclude=...
```json
[
  {
    "_id": "665f1b...",
    "idTema": "665f1b...",
    "idUsuario": {
      "_id": "665f1b...",
      "nombreUsuario": "colab1",
      "nombreCompleto": "Colaborador Uno"
    },
    "estado": "Activo",
    "enunciado": "¿Cuál es la capital de Francia?",
    "fotoUri": "https://...",
    "tipoPregunta": "MultipleChoice",
    "dificultad": "baja",
    "respuestas": [
      {
        "_id": "666a1b...",
        "idPregunta": "665f1b...",
        "idUsuario": {
          "_id": "665f1b...",
          "nombreUsuario": "colab1"
        },
        "textoRespuesta": "París",
        "fotoUrl": null,
        "esLaCorrecta": true
      },
      {
        "_id": "666a1c...",
        "idPregunta": "665f1b...",
        "idUsuario": {
          "_id": "665f1b...",
          "nombreUsuario": "colab2"
        },
        "textoRespuesta": "Londres",
        "fotoUrl": null,
        "esLaCorrecta": false
      }
    ]
  }
]
```

*Nota: Los endpoints CRUD estándar (GET/POST/PUT/DELETE de cada entidad) retornan los objetos completos según el modelo, pero los endpoints aquí listados retornan objetos agregados, conteos o estructuras enriquecidas.*
