require('dotenv').config();
const OpenAI = require('openai');

class AIService {
  constructor() {
    // Debes crear un archivo .env y añadir la variable DEEPSEEK_API_KEY con tu clave de DeepSeek
    this.apiKey = process.env.DEEPSEEK_API_KEY || 'tu-api-key-aqui';
    
    // Inicializar el cliente de OpenAI pero configurado para DeepSeek
    this.client = new OpenAI({
      apiKey: this.apiKey,
      baseURL: 'https://api.deepseek.com/v1', // URL base de la API de DeepSeek
    });
  }

  async generateAIComment(userData, evaluationData) {
    try {
      // Si no hay API key configurada, usar el método simulado
      if (this.apiKey === 'tu-api-key-aqui') {
        return this._generateSimulatedComment(userData, evaluationData);
      }
      
      const contexto = `Eres un asistente especializado de una empresa líder en desarrollo de software, aplicaciones web y soluciones en la nube. 
      Tu rol es brindar planes de mejora, asesoría técnica y estratégica a clientes, desarrolladores y stakeholders, combinando conocimientos técnicos
      profundos con habilidades de comunicación efectiva.

          Características clave que debes reflejar:
          Experto en Tecnología:
          Dominio de lenguajes de programación (JavaScript, Python, Java, C#, etc.).
          Desarrollo de aplicaciones web (frontend/backend, frameworks como React, Angular, Node.js).
          Plataformas cloud (AWS, Azure, Google Cloud) y arquitecturas (microservicios, serverless).
          Manejo de bases de datos (SQL, NoSQL) y optimización de consultas.
          Protocolos de seguridad (OWASP, cifrado, IAM, compliance GDPR/HIPAA).

          Habilidades Blandas:
          Comunicación clara y adaptada al interlocutor (técnico o no técnico).
          Empatía para resolver dudas o conflictos.
          Capacidad para guiar en gestión de proyectos (Scrum, Kanban).
          Funcionalidades del Chatbot:
          Explicar conceptos técnicos con ejemplos prácticos.
          Recomendar tecnologías según casos de uso.

          Alertar sobre riesgos de seguridad en implementaciones.

          Ofrecer guías paso a paso (ej.: "Cómo migrar una app a la nube").

          Sugerir recursos (documentación, cursos, herramientas).
          
          Tono:

          Profesional pero accesible.

          Evita jerga técnica si el usuario no es experto.

          Sé proactivo/añade ejemplos cuando sea útil.

          Limites:

          Si no sabes algo, dilo y ofrece investigarlo.

          No hagas suposiciones sobre requisitos del proyecto sin preguntar.`;

      // Construir el prompt para DeepSeek
      const prompt = `Genera un plan de mejora para ${userData.nombreFinal} ${userData.apellidoFinal} 
                    basado en su evaluación con puntuación ${evaluationData.puntuacion}/100. 
                    ${evaluationData.comentarioEvaluacion ? `Evaluación general: ${evaluationData.comentarioEvaluacion}` : ''}
                    ${evaluationData.comentarioHabilidad ? `Habilidades: ${evaluationData.comentarioHabilidad}` : ''}
                    Objetivos: ${JSON.stringify(evaluationData.objetivos_usuario || [])}
                    
                    El plan debe incluir:
                    1. Un análisis de fortalezas y debilidades basado en la puntuación
                    2. Recomendaciones específicas para mejorar
                    3. Un cronograma sugerido para implementar mejoras
                    4. Métricas para evaluar el progreso
                    
                    Formato el plan de manera clara y concisa, evitando generalidades.`;
      
      // Llamar a la API de DeepSeek
      const response = await this.client.chat.completions.create({
        model: 'deepseek-reasoner', // Modelo DeepSeek-R1 optimizado para razonamiento complejo
        messages: [
          { role: 'system', 
            content: `Eres un asistente especializado en evaluación de desempeño, 
            análisis empresarial y desarrollo profesional. Ofrece análisis detallados, 
            precisos y con fundamento técnico. Tus respuestas deben ser estructuradas, específicas y 
            orientadas a resultados medibles.
            Contexto: ${contexto}` },
          { role: 'user', content: prompt }
        ],
        max_tokens: 1000,
        temperature: 0.5, // Reducido para respuestas más consistentes y precisas
      });
      
      return response.choices[0].message.content;

    } catch (error) {
      console.error('Error llamando a la API de DeepSeek:', error);
      // Si hay error con la API, usar el método simulado como fallback
      return this._generateSimulatedComment(userData, evaluationData);
    }
  }
  
  // Método privado para generar un comentario simulado cuando no hay API key
  _generateSimulatedComment(userData, evaluationData) {
    let calificacion = "";
    const puntuacion = parseInt(evaluationData.puntuacion, 10);
    
    if (puntuacion >= 90) {
      calificacion = "excelente";
    } else if (puntuacion >= 70) {
      calificacion = "bueno";
    } else if (puntuacion >= 50) {
      calificacion = "satisfactorio";
    } else {
      calificacion = "necesita mejorar";
    }
    
    return `Análisis generado por IA para ${userData.nombreFinal} ${userData.apellidoFinal}:
    
    Basado en la evaluación realizada, el desempeño general es ${calificacion} con una puntuación de ${evaluationData.puntuacion}/100. 
    
    Análisis de fortalezas y áreas de mejora:
    - El evaluado demuestra ${puntuacion > 70 ? 'fortalezas notables' : 'aspectos a desarrollar'} en sus responsabilidades asignadas.
    - ${evaluationData.comentarioHabilidad ? `Respecto a sus habilidades: ${evaluationData.comentarioHabilidad}` : 'No hay comentarios específicos sobre habilidades.'}
    - ${evaluationData.comentarioEvaluacion ? `Evaluación general: ${evaluationData.comentarioEvaluacion}` : 'No hay comentarios generales disponibles.'}
    
    Recomendaciones:
    - Continuar reforzando las áreas de mayor puntuación
    - Establecer plan de desarrollo en los aspectos con menor rendimiento
    - Revisar periódicamente el avance en los objetivos establecidos
    
    Este análisis fue generado automáticamente y debe considerarse como complementario a la evaluación humana.`;
  }
}

module.exports = AIService;
