import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  BookOpen, 
  AlertTriangle, 
  Scale, 
  FileText, 
  Download, 
  ChevronRight, 
  GraduationCap, 
  Printer, 
  Menu, 
  X,
  ArrowLeftRight,
  Clock,
  CheckCircle2,
  BookMarked
} from 'lucide-react';

// --- Types & Data ---

type Mode = 'study' | 'exam';

interface Reference {
  law: string;
  article: string;
}

interface Trap {
  title: string;
  description: string;
  correction: string;
}

interface ComparisonRow {
  concept: string;
  definition: string;
  keyDifference: string;
  reference: Reference;
}

interface Unit {
  id: number;
  title: string;
  importance: 'high' | 'medium' | 'low';
  intro: string;
  comparisons: ComparisonRow[];
  traps: Trap[];
  chronology: { year: string; event: string }[];
  content: React.ReactNode;
}

const unitsData: Unit[] = [
  {
    id: 1,
    title: "El Estado de Derecho",
    importance: 'medium',
    intro: "Análisis del paso del Estado Absoluto al Estado de Derecho. El modelo español: Estado Social y Democrático de Derecho (Art 1.1 CE) y sus cuatro rasgos fundamentales: Imperio de la Ley, División de Poderes, Legalidad de la Administración y Derechos Fundamentales.",
    comparisons: [
      {
        concept: "Estado Liberal",
        definition: "S. XIX. Abstencionismo ('Laissez faire'). Derechos civiles y políticos.",
        keyDifference: "Imperio de la ley como expresión de voluntad general. Estado Gendarme.",
        reference: { law: "Doctrina", article: "H. Heller" }
      },
      {
        concept: "Estado Social",
        definition: "Post IGM/IIGM. Intervencionismo. Derechos económicos y sociales.",
        keyDifference: "Procura existencial. Administración prestacional (Welfare State).",
        reference: { law: "CE", article: "1.1" }
      },
      {
        concept: "Imperio de la Ley",
        definition: "Sometimiento de ciudadanos y poderes públicos a la ley.",
        keyDifference: "Ley como norma general, abstracta y producto de la voluntad popular (Parlamento).",
        reference: { law: "CE", article: "9.1" }
      }
    ],
    traps: [
      {
        title: "Separación de Poderes",
        description: "Creer que la separación es absoluta y tajante.",
        correction: "FALSO. Existe colaboración y equilibrio (checks and balances). El Gobierno dirige la Administración pero responde ante el Parlamento. El Rey modera (Poder moderador)."
      },
      {
        title: "Vinculación a la Ley",
        description: "¿Puede la Administración hacer todo lo que no esté prohibido?",
        correction: "NO. La Administración tiene VINCULACIÓN POSITIVA (solo lo que la ley permite). El ciudadano tiene VINCULACIÓN NEGATIVA (todo lo no prohibido)."
      }
    ],
    chronology: [
      { year: "1748", event: "Montesquieu: El Espíritu de las Leyes (División de poderes)" },
      { year: "1789", event: "Declaración Derechos Hombre y Ciudadano (Art 16: Garantía dchos + División poderes = Constitución)" },
      { year: "1978", event: "Constitución Española (Estado Social y Democrático de Derecho)" }
    ],
    content: (
      <div className="space-y-4 text-gray-800">
        <p>El Estado de Derecho es el modelo en el que el poder se somete a la norma jurídica. España se constituye como un <strong>Estado social y democrático de Derecho</strong> (Art 1.1 CE), propugnando como valores superiores la libertad, la justicia, la igualdad y el pluralismo político.</p>
        <div className="bg-slate-100 p-4 rounded border-l-4 border-slate-500">
          <h4 className="font-bold mb-2 text-slate-900">Rasgos Fundamentales (Villota):</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-800">
            <li><strong>Imperio de la Ley:</strong> Primacía de la ley formal (Parlamento). Ley como expresión de la voluntad general.</li>
            <li><strong>Separación de Poderes:</strong> Legislativo, Ejecutivo, Judicial (+ Corona como poder moderador en el Título II).</li>
            <li><strong>Legalidad de la Administración:</strong> Sometimiento pleno a la ley y al Derecho (Art 103.1 CE). Control judicial (Art 106 CE).</li>
            <li><strong>Derechos Fundamentales:</strong> Garantía y tutela judicial efectiva.</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: 2,
    title: "El Sistema Normativo",
    importance: 'high',
    intro: "El Ordenamiento Jurídico Administrativo. Fuentes, Jerarquía y Competencia. Nomenclatura específica de las normas en Estado, CCAA y Entidades Locales.",
    comparisons: [
      {
        concept: "Legislativo (Parlamento)",
        definition: "Poder de dictar LEYES (Norma suprema tras la CE).",
        keyDifference: "Estado: Ley Orgánica/Ordinaria. CCAA: Ley Autonómica. Local: NO tiene potestad legislativa.",
        reference: { law: "CE", article: "66/152" }
      },
      {
        concept: "Ejecutivo (Gobierno) - Rango Ley",
        definition: "Normas del Gobierno con valor de Ley (excepción).",
        keyDifference: "Estado: Real Decreto-Ley / Legislativo. CCAA: Decreto-Ley / Legislativo (si Estatuto prevé).",
        reference: { law: "CE", article: "82/86" }
      },
      {
        concept: "Ejecutivo (Gobierno) - Reglamento",
        definition: "Norma administrativa general (Potestad reglamentaria).",
        keyDifference: "Estado: Real Decreto. CCAA: Decreto. Local: Reglamento Orgánico / Ordenanza.",
        reference: { law: "LPACAP", article: "128" }
      },
      {
        concept: "Miembro Gobierno (Ministro/Consejero)",
        definition: "Norma administrativa de desarrollo o interna.",
        keyDifference: "Estado: Orden Ministerial. CCAA: Orden (del Consejero). Local: Bando / Decreto Alcaldía.",
        reference: { law: "Ley Gob", article: "24" }
      }
    ],
    traps: [
      {
        title: "Ley Estatal vs Ley Autonómica",
        description: "¿Es la Ley Estatal jerárquicamente superior a la Ley Autonómica?",
        correction: "NO. Tienen el mismo rango (Ley). Su relación se rige por el principio de COMPETENCIA (quién tiene la materia atribuida en CE/Estatuto), no de jerarquía."
      },
      {
        title: "Ordenanzas Municipales",
        description: "¿Son leyes locales?",
        correction: "NO. Son REGLAMENTOS. Las Entidades Locales carecen de potestad legislativa. Sus normas se subordinan a las Leyes (Estatales o Autonómicas)."
      },
      {
        title: "Real Decreto vs Decreto",
        description: "Confundir la terminología estatal y autonómica.",
        correction: "'Real Decreto' lo firma el Rey (refrendo Presidente/Ministro) -> Estado. 'Decreto' lo firma el Presidente CCAA/Consejero -> CCAA (o Alcalde en local)."
      }
    ],
    chronology: [
      { year: "1978", event: "CE: Distribución de competencias (Arts. 148/149) y Potestad Reglamentaria (Art 97)." },
      { year: "1985", event: "LRBRL: Potestad normativa local (Ordenanzas y Reglamentos)." },
      { year: "2015", event: "Ley 39/2015: Jerarquía y publicidad de normas (Art 127-133)." }
    ],
    content: (
      <div className="space-y-6 text-gray-800">
        <p>El sistema normativo español es complejo debido a la descentralización. Coexisten tres ordenamientos (Estatal, Autonómico, Local) regidos por el principio de <strong>Competencia</strong>, mientras que dentro de cada uno rige el principio de <strong>Jerarquía</strong>.</p>
        
        {/* Nomenclatura Table */}
        <div className="border rounded-lg overflow-hidden shadow-sm">
            <div className="bg-blue-100 p-3 font-bold text-blue-900 text-center border-b border-blue-200">
                Nomenclatura de Normas por Nivel Territorial y Órgano
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-gray-800 font-bold border-b">
                        <tr>
                            <th className="p-3 text-left w-1/4">Órgano Emisor</th>
                            <th className="p-3 text-left w-1/4 bg-red-50 text-red-900">ESTADO</th>
                            <th className="p-3 text-left w-1/4 bg-green-50 text-green-900">CC.AA.</th>
                            <th className="p-3 text-left w-1/4 bg-yellow-50 text-yellow-900">ENTIDAD LOCAL</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y text-gray-800">
                        <tr>
                            <td className="p-3 font-medium bg-gray-50">Poder Legislativo<br/><span className="text-xs text-gray-700 font-normal">Cortes / Asamblea / Pleno</span></td>
                            <td className="p-3">
                                <div className="font-bold">Ley Orgánica</div>
                                <div>Ley Ordinaria</div>
                            </td>
                            <td className="p-3">
                                <div className="font-bold">Ley (Autonómica)</div>
                            </td>
                            <td className="p-3 text-gray-700 italic">
                                (Carece de potestad legislativa)
                            </td>
                        </tr>
                        <tr>
                            <td className="p-3 font-medium bg-gray-50">Gobierno (Colegiado)<br/><span className="text-xs text-gray-700 font-normal">Consejo Ministros / Gobierno / Pleno</span></td>
                            <td className="p-3">
                                <div className="text-purple-800 font-bold text-xs mb-1">Rango de Ley:</div>
                                <div>Real Decreto-Ley</div>
                                <div>Real Decreto Legislativo</div>
                                <div className="text-blue-800 font-bold text-xs mt-2 mb-1">Reglamento:</div>
                                <div>Real Decreto</div>
                            </td>
                            <td className="p-3">
                                <div className="text-purple-800 font-bold text-xs mb-1">Rango de Ley (si Estatuto):</div>
                                <div>Decreto-Ley</div>
                                <div>Decreto Legislativo</div>
                                <div className="text-blue-800 font-bold text-xs mt-2 mb-1">Reglamento:</div>
                                <div>Decreto</div>
                            </td>
                            <td className="p-3">
                                <div className="text-blue-800 font-bold text-xs mb-1">Reglamento:</div>
                                <div>Ordenanza</div>
                                <div>Reglamento Orgánico</div>
                                <div>(Aprobados por el Pleno)</div>
                            </td>
                        </tr>
                        <tr>
                            <td className="p-3 font-medium bg-gray-50">Miembro Gobierno<br/><span className="text-xs text-gray-700 font-normal">Ministro / Consejero / Alcalde</span></td>
                            <td className="p-3">
                                <div>Orden Ministerial</div>
                            </td>
                            <td className="p-3">
                                <div>Orden (del Consejero)</div>
                            </td>
                            <td className="p-3">
                                <div>Bando (Policía/Emergencia)</div>
                                <div>Decreto de la Alcaldía</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-gray-800">
             <div className="bg-slate-50 p-4 rounded border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-2">Jerarquía Interna Estatal</h4>
                <ol className="list-decimal list-inside text-sm space-y-1">
                    <li><strong>Constitución</strong></li>
                    <li><strong>Ley</strong> (Orgánica/Ordinaria) / Rango Ley</li>
                    <li><strong>Real Decreto</strong> (Consejo de Ministros/Presidente)</li>
                    <li><strong>Orden Ministerial</strong></li>
                </ol>
             </div>
             <div className="bg-slate-50 p-4 rounded border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-2">Jerarquía Interna Local</h4>
                <ol className="list-decimal list-inside text-sm space-y-1">
                    <li><strong>Leyes Estatales/Autonómicas</strong> (Vinculación)</li>
                    <li><strong>Reglamento Orgánico</strong> (Autoorganización)</li>
                    <li><strong>Ordenanza</strong> (Relación con ciudadanos)</li>
                    <li><strong>Bando</strong> (Recordatorio o emergencia)</li>
                </ol>
             </div>
        </div>
      </div>
    )
  },
  {
    id: 3,
    title: "La Administración Pública y sus Principios",
    importance: 'high',
    intro: "Concepto, Personalidad Jurídica y Principios de Organización (Art 103 CE y Ley 40/2015). Diferencias críticas entre fenómenos de transferencia de competencias.",
    comparisons: [
      {
        concept: "Descentralización",
        definition: "Transferencia de titularidad y ejercicio entre ENTES distintos.",
        keyDifference: "Relación intersubjetiva (entre personas). NO hay jerarquía. Control de legalidad (no de oportunidad).",
        reference: { law: "LRJSP", article: "3" }
      },
      {
        concept: "Desconcentración",
        definition: "Traspaso de titularidad y ejercicio entre ÓRGANOS del mismo ente.",
        keyDifference: "Relación intrasubjetiva (interna). Cambio permanente de la norma de competencia. Descongestiona arriba.",
        reference: { law: "LRJSP", article: "8" }
      },
      {
        concept: "Delegación de Competencias",
        definition: "Traslado solo del EJERCICIO (no titularidad) a otro órgano.",
        keyDifference: "La competencia sigue siendo del delegante. Revocable en cualquier momento. No altera estructura.",
        reference: { law: "LRJSP", article: "9" }
      },
      {
        concept: "Jerarquía",
        definition: "Ordenación de órganos en escala (Superior/Inferior).",
        keyDifference: "Solo opera DENTRO de la misma persona jurídica. Permite dictar instrucciones y órdenes de servicio.",
        reference: { law: "LRJSP", article: "6" }
      }
    ],
    traps: [
      {
        title: "Titularidad en Desconcentración",
        description: "¿En la desconcentración se cede solo el ejercicio?",
        correction: "NO. Se cede TITULARIDAD y EJERCICIO. La competencia cambia de dueño (pasa al inferior). En la delegación solo se cede ejercicio."
      },
      {
        title: "Jerarquía Estado-CCAA",
        description: "¿El Ministro es superior jerárquico del Consejero Autonómico?",
        correction: "JAMÁS. Son entes distintos. Rige el principio de COMPETENCIA y colaboración, no jerarquía."
      },
      {
        title: "Personalidad Instrumental",
        description: "¿Los Organismos Autónomos tienen personalidad propia?",
        correction: "SÍ. Tienen personalidad jurídica pública diferenciada de la Administración matriz, aunque dependen de ella (instrumentalidad)."
      }
    ],
    chronology: [
      { year: "1978", event: "Constitución (Art 103): Principios rectores." },
      { year: "2015", event: "Ley 40/2015 (LRJSP): Regulación actual de principios y organización." }
    ],
    content: (
      <div className="space-y-6 text-gray-800">
        <p>La Administración Pública no es un poder difuso, es una <strong>Persona Jurídica</strong>. Esto significa que es un sujeto de derecho capaz de relaciones jurídicas (contratar, sancionar, ser demandada). Según la LRJSP, cada Administración Pública tiene personalidad jurídica única.</p>
        
        <div className="bg-slate-100 p-4 rounded border-l-4 border-slate-500">
           <h4 className="font-bold mb-2 text-slate-900">Principios Rectores (Art 3 LRJSP):</h4>
           <p className="text-sm mb-2 text-slate-800">Deben presidir toda actuación administrativa:</p>
           <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-slate-800">
             <li><span className="font-bold text-blue-900">Servicio efectivo:</span> Al ciudadano.</li>
             <li><span className="font-bold text-blue-900">Simplicidad:</span> Y claridad y proximidad.</li>
             <li><span className="font-bold text-blue-900">Participación:</span> Transparencia y acceso.</li>
             <li><span className="font-bold text-blue-900">Responsabilidad:</span> Por la gestión pública.</li>
             <li><span className="font-bold text-blue-900">Buena fe:</span> Y confianza legítima.</li>
             <li><span className="font-bold text-blue-900">Planificación:</span> Dirección por objetivos (Eficacia vs Eficiencia).</li>
           </ul>
        </div>

        <div className="mt-4 border p-4 rounded-lg bg-white shadow-sm">
            <h4 className="font-bold text-lg mb-3 text-gray-900">Las "Tres D" de la Organización</h4>
            <div className="space-y-3">
                <div className="flex gap-3 items-start">
                    <div className="bg-red-100 text-red-900 font-bold px-2 py-1 rounded text-xs mt-1">DESCENTRALIZACIÓN</div>
                    <div className="text-sm text-gray-800">
                        <strong className="block text-gray-900">Entre Personas Distintas (Padre e Hijo emancipado)</strong>
                        El Estado transfiere poder a la CCAA. El "hijo" es libre (autonomía), el padre solo controla que no viole la ley (legalidad).
                    </div>
                </div>
                <div className="flex gap-3 items-start">
                    <div className="bg-yellow-100 text-yellow-900 font-bold px-2 py-1 rounded text-xs mt-1">DESCONCENTRACIÓN</div>
                    <div className="text-sm text-gray-800">
                        <strong className="block text-gray-900">Dentro de la misma Persona (Cambio de mano)</strong>
                        El Ministro pasa la competencia (titularidad) al Director General permanentemente. La ley cambia.
                    </div>
                </div>
                <div className="flex gap-3 items-start">
                    <div className="bg-green-100 text-green-900 font-bold px-2 py-1 rounded text-xs mt-1">DELEGACIÓN</div>
                    <div className="text-sm text-gray-800">
                        <strong className="block text-gray-900">Prestamo de funciones (Encargo)</strong>
                        El titular sigue siéndolo, pero deja que otro firme y decida por él temporalmente. Es revocable.
                    </div>
                </div>
            </div>
        </div>
      </div>
    )
  },
  {
    id: 4,
    title: "Órganos y Competencia (Régimen Jurídico)",
    importance: 'high',
    intro: "Análisis técnico de la Competencia como medida de la potestad. Requisitos estrictos para la creación de órganos. Régimen de los Órganos Colegiados y cuadro completo de alteraciones competenciales (Arts 5-18 LRJSP).",
    comparisons: [
      {
        concept: "Delegación de Competencias",
        definition: "Traslado del EJERCICIO (no titularidad) a otro órgano. Revocable.",
        keyDifference: "Requiere publicación en BOE. PROHIBIDO: Delegar la jefatura del Estado, aprobación de reglamentos o resolución de recursos de actos ya delegados.",
        reference: { law: "LRJSP", article: "9" }
      },
      {
        concept: "Avocación",
        definition: "El superior atrae para sí el conocimiento de un asunto (ejercicio) cuya competencia corresponde al inferior (propia o delegada).",
        keyDifference: "Para CASOS CONCRETOS (no general). Debe ser MOTIVADA y notificada. No cabe recurso contra ella.",
        reference: { law: "LRJSP", article: "10" }
      },
      {
        concept: "Encomienda de Gestión",
        definition: "Encargo de actividades materiales o técnicas a otros órganos o Entidades (por falta de medios).",
        keyDifference: "NO cede competencia ni firma jurídica. Naturaleza instrumental. Si es entre distintos entes requiere convenio.",
        reference: { law: "LRJSP", article: "11" }
      },
      {
        concept: "Delegación de Firma",
        definition: "Traslado de la facultad mecánica de firmar resoluciones ya adoptadas por el titular.",
        keyDifference: "No requiere BOE. No cabe en resoluciones sancionadoras. Se hace constar la autoridad de procedencia.",
        reference: { law: "LRJSP", article: "12" }
      }
    ],
    traps: [
      {
        title: "Subdelegación",
        description: "¿Se puede delegar una competencia que se tiene delegada?",
        correction: "PROHIBIDO salvo autorización expresa de una Ley. Regla: 'Delegatus non potest delegare'."
      },
      {
        title: "Abstención en Colegiados",
        description: "¿Pueden los miembros de un órgano colegiado abstenerse de votar?",
        correction: "Autoridades/Personal al servicio de AA.PP: NO pueden abstenerse (deber de cargo). Miembros representativos (ej. sindicatos): SÍ pueden."
      },
      {
        title: "Creación de Órganos",
        description: "¿Basta con darle nombre a un órgano para crearlo?",
        correction: "NO. Requisitos Art 5: Forma de integración (dependencia), Funciones precisas y DOTACIÓN PRESUPUESTARIA. Prohibido duplicar sin suprimir."
      }
    ],
    chronology: [],
    content: (
      <div className="space-y-6 text-gray-800">
        <p>La <strong>competencia</strong> es la medida de la potestad atribuida a un órgano. Es <strong>irrenunciable</strong> y se ejerce por quien la tiene atribuida, salvo los supuestos legales de alteración.</p>
        
        <div className="border rounded-lg overflow-hidden shadow-sm bg-white">
            <div className="bg-slate-800 text-white p-3 font-bold text-center">
                Alteraciones de la Competencia (Cuadro Resumen)
            </div>
            <table className="w-full text-sm">
                <thead className="bg-slate-100 border-b">
                    <tr>
                        <th className="p-2 text-left font-bold text-slate-800">Figura</th>
                        <th className="p-2 text-left font-bold text-slate-800">Objeto</th>
                        <th className="p-2 text-left font-bold text-slate-800">Publicación</th>
                        <th className="p-2 text-left font-bold text-slate-800">Límite Clave</th>
                    </tr>
                </thead>
                <tbody className="divide-y text-gray-800">
                    <tr className="bg-blue-50">
                        <td className="p-2 font-bold">Delegación (Art 9)</td>
                        <td className="p-2">Ejercicio</td>
                        <td className="p-2 text-red-700 font-bold">SÍ (BOE/BOCA)</td>
                        <td className="p-2">No Reglamentos / No Jefatura Estado</td>
                    </tr>
                    <tr>
                        <td className="p-2 font-bold">Avocación (Art 10)</td>
                        <td className="p-2">Ejercicio (Caso concreto)</td>
                        <td className="p-2">No (Notificación)</td>
                        <td className="p-2">Debe ser Motivada</td>
                    </tr>
                    <tr className="bg-green-50">
                        <td className="p-2 font-bold">Encomienda (Art 11)</td>
                        <td className="p-2">Actividad Material/Técnica</td>
                        <td className="p-2">SÍ (BOE)</td>
                        <td className="p-2">No Actos Jurídicos</td>
                    </tr>
                    <tr>
                        <td className="p-2 font-bold">Del. Firma (Art 12)</td>
                        <td className="p-2">Firma mecánica</td>
                        <td className="p-2">No</td>
                        <td className="p-2">No Sanciones</td>
                    </tr>
                    <tr className="bg-gray-50">
                        <td className="p-2 font-bold">Suplencia (Art 13)</td>
                        <td className="p-2">Titular (Persona)</td>
                        <td className="p-2">No</td>
                        <td className="p-2">Por vacante/enfermedad</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="bg-indigo-50 p-4 rounded border border-indigo-200">
                <h4 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
                    <GraduationCap size={16}/> Órganos Colegiados (Reglas de Oro)
                </h4>
                <ul className="list-disc list-inside text-sm space-y-1 text-indigo-900">
                    <li><strong>Secretario:</strong> Vela por la legalidad. Voz y Voto (si es miembro) o Voz sin voto (si es funcionario no miembro).</li>
                    <li><strong>Presidente:</strong> Dirime empates con voto de calidad.</li>
                    <li><strong>Quórum (Constitución):</strong> 
                        <br/><span className="ml-4 text-xs font-semibold">- 1ª Convocatoria: Presidente, Secretario + Mitad miembros.</span>
                        <br/><span className="ml-4 text-xs font-semibold">- 2ª Convocatoria: Presi, Secre + 3 miembros (Colegiados AGE).</span>
                    </li>
                </ul>
             </div>
             <div className="bg-red-50 p-4 rounded border border-red-200">
                <h4 className="font-bold text-red-900 mb-2">Prohibiciones de Delegación (Art 9.2)</h4>
                <ul className="list-decimal list-inside text-sm space-y-1 text-red-900">
                    <li>Relaciones con Jefatura del Estado.</li>
                    <li>Adopción de disposiciones de carácter general (Reglamentos).</li>
                    <li>Resolución de recursos de actos ya dictados por delegación (se resolvería a sí mismo).</li>
                    <li>Materias que requieran Ley Orgánica.</li>
                </ul>
             </div>
        </div>
      </div>
    )
  },
  {
    id: 5,
    title: "La Organización Territorial del Estado",
    importance: 'high',
    intro: "El modelo del Estado de las Autonomías (Art 137 CE). Niveles territoriales (Municipio, Provincia, CCAA) y sus principios de relación (Cooperación vs Coordinación). Conflictos de competencias.",
    comparisons: [
      {
        concept: "Cooperación",
        definition: "Acuerdo VOLUNTARIO entre administraciones para fines comunes.",
        keyDifference: "Nace de la igualdad y la voluntariedad (Convenios).",
        reference: { law: "LRJSP", article: "143" }
      },
      {
        concept: "Coordinación",
        definition: "Imposición de medios/sistemas para garantizar homogeneidad.",
        keyDifference: "Es OBLIGATORIA/IMPUESTA (normalmente por el Estado/Superior) para garantizar unidad.",
        reference: { law: "LRJSP", article: "140" }
      },
      {
        concept: "Conflicto Positivo",
        definition: "Dos administraciones reclaman para sí una competencia.",
        keyDifference: "Ambas dicen 'es mío'. Resuelve TC (si es Estado-CCAA) o Contencioso.",
        reference: { law: "LOTC", article: "60" }
      },
      {
        concept: "Delegado del Gobierno",
        definition: "Representa al Gobierno en la CCAA y coordina la AGE en ese territorio.",
        keyDifference: "Dirige la AGE periférica y coordina con la CCAA. Rango de Subsecretario.",
        reference: { law: "CE", article: "154" }
      }
    ],
    traps: [
      {
        title: "Autonomía vs Soberanía",
        description: "¿Tienen las CCAA soberanía?",
        correction: "JAMÁS. Solo tienen AUTONOMÍA (política y administrativa). La soberanía reside en el pueblo español (unidad de la Nación, Art 2 CE)."
      },
      {
        title: "Jerarquía Territorial",
        description: "¿El Estado manda sobre el Municipio?",
        correction: "NO. No hay jerarquía entre entidades territoriales. Se relacionan por competencia. El Estado solo puede impugnar actos ilegales, no dar órdenes (salvo casos extremos Art 155)."
      }
    ],
    chronology: [
       { year: "1978", event: "Constitución: Art 137 (Organización territorial) y Título VIII." },
       { year: "1983", event: "Proceso autonómico completado (mapa actual)." }
    ],
    content: (
      <div className="space-y-6 text-gray-800">
        <p>El Estado se organiza territorialmente en <strong>Municipios, Provincias y Comunidades Autónomas</strong>. Todas gozan de <strong>autonomía</strong> para la gestión de sus respectivos intereses (Art 137 CE), pero el Estado garantiza el principio de solidaridad (Art 138 CE).</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="bg-blue-50 p-4 rounded border border-blue-200">
                <h4 className="font-bold text-blue-900 mb-2">Relaciones Interadministrativas</h4>
                <ul className="list-disc list-inside text-sm space-y-1 text-blue-900">
                    <li><strong>Lealtad Institucional:</strong> Deber de colaborar y no interferir.</li>
                    <li><strong>Colaboración:</strong> Deber de actuar (auxilio).</li>
                    <li><strong>Cooperación:</strong> Acción conjunta voluntaria (Conferencias Sectoriales).</li>
                    <li><strong>Coordinación:</strong> Dirección superior para unidad de acción.</li>
                </ul>
             </div>
             <div className="bg-slate-100 p-4 rounded border border-slate-300">
                <h4 className="font-bold text-slate-900 mb-2">Conflictos de Competencias</h4>
                <div className="text-sm space-y-2 text-slate-800">
                    <p><strong>Estado vs CCAA:</strong> Resuelve el Tribunal Constitucional.</p>
                    <p><strong>Entidades Locales vs Estado/CCAA:</strong> Resuelve la Jurisdicción Contencioso-Administrativa.</p>
                    <p><strong>Órganos misma Admin:</strong> Resuelve el superior jerárquico común.</p>
                </div>
             </div>
        </div>

        <div className="mt-4 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
            <h4 className="font-bold text-yellow-900">Figura Clave: El Delegado del Gobierno (Art 154 CE)</h4>
            <p className="text-sm mt-1 text-yellow-900">
                Es el nexo de unión. Nombrado por Real Decreto del Consejo de Ministros (a propuesta del Presidente). 
                Tiene rango de <strong>Subsecretario</strong> (¡Ojo! No Ministro). Manda sobre los Subdelegados del Gobierno (provincias).
                Protege el libre ejercicio de derechos y libertades y garantiza la seguridad ciudadana (mando de FyCSE en la CCAA).
            </p>
        </div>
      </div>
    )
  },
  {
    id: 6,
    title: "La Admón Territorial (I): Estructura de la AGE",
    importance: 'high',
    intro: "Disección anatómica de la Administración General del Estado (Ley 40/2015). Diferenciación crítica entre Órganos Superiores (Política) y Directivos (Gestión). La Administración Periférica.",
    comparisons: [
      {
        concept: "Ministros",
        definition: "Jefes superiores del Departamento.",
        keyDifference: "Órgano SUPERIOR. Nombrado por Rey a propuesta Presidente. No requiere ser funcionario. Responsabilidad política.",
        reference: { law: "LRJSP", article: "61" }
      },
      {
        concept: "Secretarios de Estado",
        definition: "Órgano Superior de apoyo al Ministro (Opcional).",
        keyDifference: "Dirigen un sector de actividad. No requieren ser funcionarios. Actúan por delegación del Ministro.",
        reference: { law: "LRJSP", article: "62" }
      },
      {
        concept: "Subsecretarios",
        definition: "Jefe de los Servicios Comunes (Jurídico, RRHH, Presupuesto).",
        keyDifference: "Órgano DIRECTIVO. OBLIGATORIO ser Funcionario A1. Es el 'Gerente' del Ministerio.",
        reference: { law: "LRJSP", article: "63" }
      },
      {
        concept: "Delegado del Gobierno",
        definition: "Representa al Gobierno en la CCAA.",
        keyDifference: "Rango de Subsecretario. Nombramiento político (Consejo Ministros). Manda sobre las fuerzas de seguridad en la CCAA.",
        reference: { law: "LRJSP", article: "72" }
      }
    ],
    traps: [
      {
        title: "El Subdirector General",
        description: "¿Es un Alto Cargo?",
        correction: "NO. Es el único órgano directivo que NO tiene la condición de Alto Cargo. Nombrado por el Ministro (no por RD). Es funcionario A1."
      },
      {
        title: "Excepción Directores Generales",
        description: "¿Todos los DG deben ser funcionarios?",
        correction: "REGLA: SÍ. EXCEPCIÓN: Si el RD de estructura lo permite por características específicas, puede ser alguien del sector privado."
      },
      {
        title: "Creación de Ministerios",
        description: "¿Se crean por Ley?",
        correction: "NO. Se crean por Real Decreto del PRESIDENTE del Gobierno (potestad autoorganizativa del Presidente), no del Consejo."
      }
    ],
    chronology: [
      { year: "2015", event: "Ley 40/2015 (LRJSP): Estructura actual órganos superiores y directivos." }
    ],
    content: (
      <div className="space-y-6 text-gray-800">
        <p>La Administración General del Estado (AGE) se organiza en Ministerios. Es vital distinguir quién hace política (decide) y quién gestiona (ejecuta).</p>
        
        <div className="bg-white border rounded-lg overflow-hidden shadow-sm">
           <div className="bg-slate-800 text-white p-3 font-bold text-center">
             Jerarquía y Requisitos (Cuadro Vital para Examen)
           </div>
           <table className="w-full text-sm">
             <thead className="bg-slate-100 border-b">
               <tr>
                 <th className="p-2 text-left font-bold text-slate-800">Órgano</th>
                 <th className="p-2 text-left font-bold text-slate-800">Categoría</th>
                 <th className="p-2 text-left font-bold text-slate-800">Rango</th>
                 <th className="p-2 text-left font-bold text-slate-800">Requisito Funcionario</th>
                 <th className="p-2 text-left md:table-cell hidden font-bold text-slate-800">Nombramiento</th>
               </tr>
             </thead>
             <tbody className="divide-y text-gray-800">
               <tr className="bg-red-50">
                 <td className="p-2 font-bold">Ministro</td>
                 <td className="p-2">SUPERIOR</td>
                 <td className="p-2">Ministro</td>
                 <td className="p-2 text-gray-700">No</td>
                 <td className="p-2 md:table-cell hidden text-xs text-gray-700">RD Rey (Prop. Presi)</td>
               </tr>
               <tr className="bg-red-50">
                 <td className="p-2 font-bold">Secretario de Estado</td>
                 <td className="p-2">SUPERIOR</td>
                 <td className="p-2">Sec. Estado</td>
                 <td className="p-2 text-gray-700">No</td>
                 <td className="p-2 md:table-cell hidden text-xs text-gray-700">RD CM (Prop. Min)</td>
               </tr>
               <tr className="bg-blue-50">
                 <td className="p-2 font-bold">Subsecretario</td>
                 <td className="p-2">DIRECTIVO</td>
                 <td className="p-2">Subsecretario</td>
                 <td className="p-2 font-bold text-green-800">SÍ (A1)</td>
                 <td className="p-2 md:table-cell hidden text-xs text-gray-700">RD CM (Prop. Min)</td>
               </tr>
               <tr className="bg-blue-50">
                 <td className="p-2 font-bold">Secretario General</td>
                 <td className="p-2">DIRECTIVO</td>
                 <td className="p-2">Subsecretario</td>
                 <td className="p-2 font-bold text-gray-700">No* (Cualificación)</td>
                 <td className="p-2 md:table-cell hidden text-xs text-gray-700">RD CM (Prop. Min)</td>
               </tr>
               <tr className="bg-blue-50">
                 <td className="p-2 font-bold">Sec. General Técnico</td>
                 <td className="p-2">DIRECTIVO</td>
                 <td className="p-2">Director Gral</td>
                 <td className="p-2 font-bold text-green-800">SÍ (A1)</td>
                 <td className="p-2 md:table-cell hidden text-xs text-gray-700">RD CM (Prop. Min)</td>
               </tr>
               <tr className="bg-blue-50">
                 <td className="p-2 font-bold">Director General</td>
                 <td className="p-2">DIRECTIVO</td>
                 <td className="p-2">Director Gral</td>
                 <td className="p-2 font-bold text-green-800">SÍ (A1)* (Salvo excep)</td>
                 <td className="p-2 md:table-cell hidden text-xs text-gray-700">RD CM (Prop. Min)</td>
               </tr>
               <tr className="bg-gray-100">
                 <td className="p-2 font-bold">Subdirector Gral</td>
                 <td className="p-2">DIRECTIVO</td>
                 <td className="p-2">Subdirector</td>
                 <td className="p-2 font-bold text-green-800">SÍ (A1)</td>
                 <td className="p-2 md:table-cell hidden text-xs text-gray-700">Nombramiento Ministro</td>
               </tr>
             </tbody>
           </table>
           <div className="p-2 text-xs text-gray-700 bg-gray-50 border-t">
             * Nota: Todos son Altos Cargos EXCEPTO el Subdirector General. Los SG no requieren ser funcionarios pero sí cualificación profesional.
           </div>
        </div>

        {/* Detailed Explanation Blocks */}
        <div className="space-y-4">
            <div className="bg-slate-50 p-4 rounded border border-slate-300">
                <h4 className="font-bold text-slate-900 mb-2">Diferencia Clave: Subsecretario vs Secretario General</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-800">
                    <div>
                        <strong className="block text-blue-900">SUBSECRETARIO (El Gerente)</strong>
                        <ul className="list-disc pl-4 mt-1">
                            <li><strong>Obligatorio</strong> en todos los Ministerios.</li>
                            <li>Gestiona los <strong>Servicios Comunes</strong> (RRHH, Presupuesto, Jurídico, Tecnologías).</li>
                            <li>Jefe superior del personal.</li>
                            <li>De él depende siempre la <strong>Secretaría General Técnica</strong>.</li>
                        </ul>
                    </div>
                    <div>
                        <strong className="block text-purple-900">SECRETARIO GENERAL (El Viceministro Sectorial)</strong>
                        <ul className="list-disc pl-4 mt-1">
                            <li><strong>Opcional</strong> (se crea si hay mucho trabajo sectorial).</li>
                            <li>Gestiona un <strong>Sector</strong> concreto (ej. Universidades, Instituciones Penitenciarias).</li>
                            <li>Tiene rango de Subsecretario.</li>
                            <li>Coordina a sus Direcciones Generales.</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="bg-slate-50 p-4 rounded border border-slate-300">
                <h4 className="font-bold text-slate-900 mb-2">Administración Periférica (El Estado en tu ciudad)</h4>
                <div className="space-y-3 text-sm text-gray-800">
                    <div className="flex gap-2">
                         <div className="min-w-[120px] font-bold text-red-900">Delegado del Gobierno</div>
                         <div>
                            Representa al Gobierno en la CCAA. Nombrado por RD Consejo Ministros. 
                            <strong>Rango de Subsecretario</strong>. Manda sobre las fuerzas de seguridad en la CCAA. 
                            Supervisa a los Subdelegados.
                         </div>
                    </div>
                    <div className="flex gap-2 border-t pt-2 border-slate-200">
                         <div className="min-w-[120px] font-bold text-blue-900">Subdelegado del Gobierno</div>
                         <div>
                            Representa al Gobierno en la Provincia. Nombrado por el Delegado del Gobierno.
                            <strong>Rango de Subdirector General</strong>.
                            REQUISITO: Debe ser <strong>Funcionario de Carrera (A1)</strong>.
                         </div>
                    </div>
                     <div className="flex gap-2 border-t pt-2 border-slate-200">
                         <div className="min-w-[120px] font-bold text-green-900">Director Insular</div>
                         <div>
                            En las islas donde no está la sede de la Delegación/Subdelegación. Mismo rango y requisitos que el Subdelegado.
                         </div>
                    </div>
                </div>
            </div>
            
             <div className="p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded text-sm text-gray-800">
                <strong>¿Quién crea los Ministerios?</strong><br/>
                No es una Ley. No es el Consejo de Ministros. Es competencia exclusiva del <strong>Presidente del Gobierno</strong> mediante Real Decreto (potestad normativa propia).
            </div>
        </div>
      </div>
    )
  },
  {
    id: 7,
    title: "La Admón Territorial (II): El Municipio",
    importance: 'high',
    intro: "Análisis profundo de la Entidad Local Básica (Art 140 CE). Elementos constitutivos (Territorio, Población, Organización). La distinción crítica entre Régimen Común y Gran Población (Título X LRBRL).",
    comparisons: [
      {
        concept: "El Pleno",
        definition: "Órgano de máxima representación política (Cámara 'legislativa' local).",
        keyDifference: "Aprueba Ordenanzas, Presupuestos y controla órganos de gobierno. NO gestiona el día a día.",
        reference: { law: "LRBRL", article: "22/122" }
      },
      {
        concept: "El Alcalde",
        definition: "Presidente de la Corporación y Jefe de la Administración.",
        keyDifference: "Dirige el gobierno y la administración. En Gran Población delega casi toda la gestión en la Junta.",
        reference: { law: "LRBRL", article: "21/124" }
      },
      {
        concept: "Junta Gobierno Local",
        definition: "Órgano colegiado ejecutivo (Ministros locales).",
        keyDifference: "Obligatoria en munis >5000 habs. En Gran Población asume licencias, contratos y gestión económica (ejecutivo fuerte).",
        reference: { law: "LRBRL", article: "23/126" }
      },
      {
        concept: "Concejo Abierto",
        definition: "Régimen especial para pequeños municipios (<100 habs) o tradicionales.",
        keyDifference: "Democracia directa. No hay concejales. Gobierna el Alcalde + Asamblea Vecinal (todos los vecinos).",
        reference: { law: "LRBRL", article: "29" }
      }
    ],
    traps: [
      {
        title: "Disolución del Ayuntamiento",
        description: "¿Puede el Alcalde disolver el Pleno y convocar elecciones anticipadas?",
        correction: "JAMÁS. A diferencia del Presidente del Gobierno o CCAA, el Alcalde NO tiene potestad de disolución. El mandato es fijo (4 años)."
      },
      {
        title: "Comisión Especial de Cuentas",
        description: "¿Es obligatoria en municipios pequeños?",
        correction: "SÍ, EN TODOS. Es un órgano necesario básico para la fiscalización económica, independientemente de la población."
      },
      {
        title: "Junta de Gobierno Local",
        description: "¿Existe en todos los municipios?",
        correction: "NO. Solo es obligatoria en municipios > 5.000 habitantes (o si lo dice el Reglamento Orgánico). En los pequeños es voluntaria."
      }
    ],
    chronology: [
      { year: "1985", event: "Ley 7/1985 (LRBRL): Bases del Régimen Local." },
      { year: "2003", event: "Ley 57/2003: Modernización (Introduce el Título X - Municipios Gran Población)." },
      { year: "2013", event: "LRSAL: Racionalización competencias (Evitar duplicidades)." }
    ],
    content: (
      <div className="space-y-6 text-gray-800">
        <p>El Municipio es la entidad básica de la organización territorial del Estado. Tiene personalidad jurídica plena. Sus elementos son <strong>Territorio</strong>, <strong>Población</strong> y <strong>Organización</strong>.</p>
        
        {/* Population Box */}
        <div className="bg-slate-50 p-4 rounded border border-slate-300">
             <h4 className="font-bold text-slate-900 mb-2">Población y Padrón (Art 15-16 LRBRL)</h4>
             <ul className="list-disc list-inside text-sm space-y-1 text-slate-800">
                <li><strong>Padrón Municipal:</strong> Registro administrativo donde constan los vecinos. Sus datos son prueba de residencia y domicilio.</li>
                <li><strong>Obligación:</strong> Todo español o extranjero que viva en territorio español DEBE empadronarse en el municipio donde resida habitualmente.</li>
                <li><strong>Condición de Vecino:</strong> Se adquiere por la inscripción en el Padrón. Otorga derecho de sufragio (activo/pasivo según ley).</li>
             </ul>
        </div>

        {/* Organization Table */}
        <div className="bg-white border rounded-lg overflow-hidden shadow-sm mt-4">
           <div className="bg-blue-900 text-white p-3 font-bold text-center">
             Organización Municipal: ¿Quién es obligatorio?
           </div>
           <table className="w-full text-sm">
             <thead className="bg-blue-50 border-b">
               <tr>
                 <th className="p-2 text-left font-bold text-blue-900">Órgano</th>
                 <th className="p-2 text-left font-bold text-blue-900">Régimen</th>
                 <th className="p-2 text-left font-bold text-blue-900">Función Clave</th>
               </tr>
             </thead>
             <tbody className="divide-y text-gray-800">
               <tr className="bg-green-50">
                 <td className="p-2 font-bold">Alcalde</td>
                 <td className="p-2">TODOS</td>
                 <td className="p-2">Presidente, Ejecutivo, Jefatura Policía.</td>
               </tr>
               <tr className="bg-green-50">
                 <td className="p-2 font-bold">Tenientes Alcalde</td>
                 <td className="p-2">TODOS</td>
                 <td className="p-2">Sustituyen al Alcalde.</td>
               </tr>
               <tr className="bg-green-50">
                 <td className="p-2 font-bold">Pleno</td>
                 <td className="p-2">TODOS*</td>
                 <td className="p-2">Normativo (Ordenanzas), Fiscalización, Presupuesto. (*Salvo Concejo Abierto)</td>
               </tr>
               <tr className="bg-green-50">
                 <td className="p-2 font-bold">C. Especial Cuentas</td>
                 <td className="p-2">TODOS</td>
                 <td className="p-2">Examen de cuentas antes del Pleno.</td>
               </tr>
               <tr className="bg-yellow-50">
                 <td className="p-2 font-bold">Junta Gobierno Local</td>
                 <td className="p-2">> 5.000 habs</td>
                 <td className="p-2">Asistencia y competencias delegadas (o propias en Gran Pob).</td>
               </tr>
               <tr className="bg-red-50">
                 <td className="p-2 font-bold">Comisión Sugerencias</td>
                 <td className="p-2">Gran Población</td>
                 <td className="p-2">Defensa de los vecinos (Defensor pueblo local).</td>
               </tr>
               <tr className="bg-red-50">
                 <td className="p-2 font-bold">Consejo Social Ciudad</td>
                 <td className="p-2">Gran Población</td>
                 <td className="p-2">Participación organizaciones económicas/sociales.</td>
               </tr>
             </tbody>
           </table>
        </div>

        {/* Competencies Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div className="bg-orange-50 p-4 rounded border-l-4 border-orange-500">
              <h4 className="font-bold text-orange-900">Competencias Obligatorias (Art 26)</h4>
              <p className="text-xs text-orange-900 mb-2">El municipio DEBE prestar estos servicios sí o sí:</p>
              <ul className="text-sm space-y-2 text-orange-900">
                <li><span className="font-bold">Todos:</span> Alumbrado, cementerio, basura, limpieza viaria, agua, alcantarillado, acceso núcleos.</li>
                <li><span className="font-bold">> 5.000:</span> + Parque público, biblioteca, mercado, residuos.</li>
                <li><span className="font-bold">> 20.000:</span> + Protección civil, servicios sociales, incendios, deporte, matadero.</li>
                <li><span className="font-bold">> 50.000:</span> + Transporte urbano, medio ambiente.</li>
              </ul>
            </div>
            
            <div className="bg-indigo-50 p-4 rounded border-l-4 border-indigo-500">
               <h4 className="font-bold text-indigo-900">Gran Población (Título X)</h4>
               <p className="text-xs text-indigo-900 mb-2">Se aplica a:</p>
               <ul className="list-disc list-inside text-sm mb-2 text-indigo-900">
                 <li>Municipios > 250.000 habs.</li>
                 <li>Capitales de Provincia > 175.000 habs.</li>
                 <li>Capitales Autonómicas o Sedes Institucionales (requiere Ley Autonómica).</li>
               </ul>
               <p className="text-xs font-bold text-indigo-900 mt-2">Rasgos distintivos:</p>
               <p className="text-sm text-indigo-900">División en Distritos obligatoria, Asesoría Jurídica propia, Órgano de Gestión Tributaria, Director General (Directivo profesional).</p>
            </div>
        </div>
      </div>
    )
  },
  {
    id: 8,
    title: "La Administración Institucional y Corporativa",
    importance: 'medium',
    intro: "El Sector Público Institucional (instrumental) y la Administración Corporativa. La 'huida del Derecho Administrativo'. Clasificación de los Organismos Públicos según la Ley 40/2015 (LRJSP).",
    comparisons: [
      {
        concept: "Organismo Autónomo (OA)",
        definition: "Depende de un Ministerio. Realiza funciones administrativas/fomento.",
        keyDifference: "Régimen de Derecho Administrativo. Personal Funcionario. Presupuesto Limitativo (Gasto Público puro).",
        reference: { law: "LRJSP", article: "98" }
      },
      {
        concept: "E.P. Empresarial (EPE)",
        definition: "Prestación de servicios susceptibles de contraprestación económica.",
        keyDifference: "Régimen Mixto (Privado en gestión, Público en voluntad/potestades). Personal Laboral. Presupuesto Estimativo.",
        reference: { law: "LRJSP", article: "103" }
      },
      {
        concept: "Autoridad Adm. Indep. (AAI)",
        definition: "Funciones de regulación/supervisión externa sobre sectores económicos.",
        keyDifference: "INDEPENDENCIA funcional (no recibe instrucciones del Gobierno). Ej: CNMC, AEPD.",
        reference: { law: "LRJSP", article: "109" }
      },
      {
        concept: "Colegios Profesionales",
        definition: "Base asociativa privada con fines públicos delegados (Admin Corporativa).",
        keyDifference: "Actos sujetos a Derecho Admin SOLO cuando ejercen funciones públicas (ej. colegiación, sanción deontológica).",
        reference: { law: "L. Col. Prof.", article: "1" }
      }
    ],
    traps: [
      {
        title: "Potestades en Sociedades Mercantiles",
        description: "¿Puede Correos (Sociedad Estatal) poner multas o expropiar?",
        correction: "JAMÁS. Las Sociedades Mercantiles Estatales se rigen por derecho privado y NO pueden ejercer potestades administrativas que impliquen ejercicio de autoridad."
      },
      {
        title: "Dictámenes Consejo Estado",
        description: "¿Son vinculantes los dictámenes del Consejo de Estado?",
        correction: "REGLA: NO (son preceptivos pero no vinculantes). EXCEPCIÓN: Solo si la Ley lo dice expresamente (muy raro). El Gobierno puede decidir en contra (motivando)."
      },
      {
        title: "Personal OA vs EPE",
        description: "¿En una EPE solo hay laborales?",
        correction: "PREDOMINA el laboral, pero los puestos que impliquen ejercicio de potestades públicas quedan reservados a FUNCIONARIOS."
      }
    ],
    chronology: [
        { year: "1974", event: "Ley Colegios Profesionales." },
        { year: "2015", event: "Ley 40/2015 (LRJSP): Regula todo el Sector Público Institucional." }
    ],
    content: (
      <div className="space-y-6 text-gray-800">
        <p>La Administración Institucional busca eficacia mediante la <strong>descentralización funcional</strong> (crear un ente para un fin). El problema histórico ha sido la 'huida del Derecho Administrativo' para evitar controles, algo que la Ley 40/2015 trata de limitar.</p>
        
        {/* La Matriz del Sector Público */}
        <div className="bg-white border rounded-lg overflow-hidden shadow-sm">
           <div className="bg-purple-900 text-white p-3 font-bold text-center">
             La Matriz del Sector Público Institucional (Ley 40/2015)
           </div>
           <table className="w-full text-sm">
             <thead className="bg-purple-50 border-b">
               <tr>
                 <th className="p-2 text-left font-bold text-purple-900">Tipo de Ente</th>
                 <th className="p-2 text-left font-bold text-purple-900">Derecho Aplicable</th>
                 <th className="p-2 text-left font-bold text-purple-900">Personal</th>
                 <th className="p-2 text-left font-bold text-purple-900">Presupuesto</th>
               </tr>
             </thead>
             <tbody className="divide-y text-gray-800">
               <tr className="bg-green-50">
                 <td className="p-2">
                    <div className="font-bold">Organismo Autónomo</div>
                    <div className="text-xs text-gray-700">Ej: Muface, INE, CHJ</div>
                 </td>
                 <td className="p-2">Administrativo (Siempre)</td>
                 <td className="p-2 font-bold text-blue-900">Funcionario / Laboral</td>
                 <td className="p-2">Limitativo</td>
               </tr>
               <tr className="bg-yellow-50">
                 <td className="p-2">
                    <div className="font-bold">E.P. Empresarial (EPE)</div>
                    <div className="text-xs text-gray-700">Ej: ADIF, FNMT</div>
                 </td>
                 <td className="p-2">
                    <span className="block font-bold">Privado (Actividad)</span>
                    <span className="text-xs text-gray-800">Público (Potestades/Voluntad)</span>
                 </td>
                 <td className="p-2 text-gray-800">Laboral* <br/><span className="text-xs text-gray-700">(Funcionario para potestades)</span></td>
                 <td className="p-2">Estimativo</td>
               </tr>
               <tr className="bg-gray-50">
                 <td className="p-2">
                    <div className="font-bold">Sociedad Mercantil</div>
                    <div className="text-xs text-gray-700">Ej: Correos, Paradores</div>
                 </td>
                 <td className="p-2 font-bold">Privado (Mercantil/Civil)</td>
                 <td className="p-2 text-gray-800">Laboral (Siempre)</td>
                 <td className="p-2">Estimativo</td>
               </tr>
                <tr className="bg-red-50">
                 <td className="p-2">
                    <div className="font-bold">Autoridad Indep. (AAI)</div>
                    <div className="text-xs text-gray-700">Ej: CNMC, AEPD</div>
                 </td>
                 <td className="p-2">Administrativo</td>
                 <td className="p-2">Funcionario / Laboral</td>
                 <td className="p-2">Limitativo / Estimativo</td>
               </tr>
             </tbody>
           </table>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div className="bg-slate-50 p-4 rounded border border-slate-300">
               <h4 className="font-bold text-slate-900 mb-2">Administración Corporativa</h4>
               <p className="text-sm text-slate-800 mb-2">Son asociaciones privadas obligatorias para ciertos fines públicos (Colegios Profesionales, Cámaras de Comercio).</p>
               <div className="bg-white p-2 rounded border text-sm text-gray-800">
                 <strong>El Régimen Dual:</strong>
                 <ul className="list-disc pl-4 mt-1">
                   <li><strong>Derecho Privado:</strong> Contratación de sedes, personal, fiestas patronales. (Juez Civil).</li>
                   <li><strong>Derecho Administrativo:</strong> Colegiación obligatoria, sanciones disciplinarias a colegiados, visado de proyectos. (Juez Contencioso).</li>
                 </ul>
               </div>
            </div>

            <div className="bg-slate-50 p-4 rounded border border-slate-300">
               <h4 className="font-bold text-slate-900 mb-2">Administración Consultiva</h4>
               <p className="text-sm text-slate-800 mb-2"><strong>El Consejo de Estado</strong> (Supremo órgano consultivo, Art 107 CE).</p>
               <ul className="list-disc pl-4 text-sm space-y-1 text-slate-800">
                 <li><strong>Función:</strong> Juzga la LEGALIDAD, no la oportunidad política (salvo que se lo pidan expresamente).</li>
                 <li><strong>Dictámenes:</strong> Son <em>Preceptivos</em> (obligatorio pedirlos en reglamentos, responsabilidad patrimonial >50k) pero <em>No Vinculantes</em> (el gobierno puede no hacer caso).</li>
                 <li><strong>Composición:</strong> Consejeros Permanentes (vitalicios, los "sabios"), Natos (por cargo) y Electivos (políticos, 4 años).</li>
               </ul>
            </div>
        </div>
      </div>
    )
  },
  {
    id: 9,
    title: "Los Administrados (El Ciudadano)",
    importance: 'medium',
    intro: "El ciudadano ante la Administración. No basta con ser 'administrado', hay que ser 'interesado' para actuar. Análisis de la Capacidad de Obrar ampliada (Art 3), el concepto de Interesado (Art 4) y la Representación (Art 5) en la Ley 39/2015 (LPACAP).",
    comparisons: [
      {
        concept: "Capacidad de Obrar (Admin)",
        definition: "Aptitud para ejercer derechos ante la Admin.",
        keyDifference: "MÁS AMPLIA que la civil. Los menores pueden ejercer derechos por sí mismos si la ley lo permite sin asistencia.",
        reference: { law: "LPACAP", article: "3" }
      },
      {
        concept: "Interesado Necesario",
        definition: "Titular de derecho que puede verse afectado por una decisión que no ha pedido.",
        keyDifference: "La Administración está OBLIGADA a llamarlo al procedimiento (si no, indefensión).",
        reference: { law: "LPACAP", article: "4" }
      },
      {
        concept: "Representación 'Apud Acta'",
        definition: "Poder otorgado personalmente ante funcionario o sede electrónica.",
        keyDifference: "Es gratuito y simple. Sirve para acreditar la representación en procedimientos administrativos.",
        reference: { law: "LPACAP", article: "6" }
      },
      {
        concept: "Sede Electrónica",
        definition: "Dirección electrónica disponible para los ciudadanos.",
        keyDifference: "Garantiza la autenticidad, integridad y disponibilidad de la información.",
        reference: { law: "LRJSP", article: "38" }
      }
    ],
    traps: [
      {
        title: "Recurso de Menores",
        description: "¿Puede un niño de 14 años recurrir una beca denegada?",
        correction: "SÍ. La LPACAP permite a los menores defender sus derechos e intereses si el ordenamiento les permite ejercerlos sin asistencia (Art 3)."
      },
      {
        title: "Acreditar Representación",
        description: "¿Siempre tengo que probar que represento a otro?",
        correction: "NO. Para actos de trámite (ej. presentar papeles) se PRESUME. Solo se exige para formular solicitudes, recurrir, desistir o renunciar."
      },
      {
        title: "Obligados Electrónicos",
        description: "¿Un autónomo está obligado a relacionarse electrónicamente?",
        correction: "SÍ, pero solo para lo relativo a su actividad profesional. Como ciudadano particular (ej. multa de tráfico personal) puede elegir papel."
      }
    ],
    chronology: [
        { year: "2015", event: "Ley 39/2015 (LPACAP): Regula la capacidad, interesados y relaciones electrónicas." }
    ],
    content: (
      <div className="space-y-6 text-gray-800">
        <p>En Derecho Administrativo, la condición de <strong>Administrado</strong> es general (todos lo somos), pero la condición de <strong>Interesado</strong> es procesal y específica. Solo el interesado puede actuar válidamente en un procedimiento.</p>
        
        {/* Concepto Interesado */}
        <div className="bg-slate-50 p-4 rounded border-l-4 border-blue-600">
           <h4 className="font-bold text-blue-900 mb-2">¿Quién es Interesado? (Art 4 LPACAP)</h4>
           <p className="text-sm mb-2 text-slate-800">Solo hay 3 formas de entrar en el "club":</p>
           <ul className="list-decimal list-inside text-sm space-y-1 text-gray-800">
             <li><strong>El Promotor:</strong> Quien inicia el procedimiento por interés propio (individual o colectivo).</li>
             <li><strong>El Titular de Derechos:</strong> (Afectado necesario). Quien tiene un derecho subjetivo que puede resultar perjudicado. Deben ser llamados obligatoriamente.</li>
             <li><strong>El Titular de Intereses:</strong> (Afectado eventual). Quien tiene un interés legítimo y <strong>se persona</strong> en el procedimiento antes de la resolución definitiva.</li>
           </ul>
        </div>

        {/* Capacidad */}
        <div className="bg-white border rounded p-4 shadow-sm">
           <h4 className="font-bold text-gray-900 mb-2">Capacidad de Obrar (Art 3 LPACAP) - La Excepción Admin</h4>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-800">
             <div className="bg-red-50 p-3 rounded">
               <strong className="block text-red-900 mb-1">Regla General (Civil)</strong>
               Menores e incapacitados necesitan representante legal (padres/tutores) para actuar.
             </div>
             <div className="bg-green-50 p-3 rounded">
               <strong className="block text-green-900 mb-1">Regla Administrativa (Villota)</strong>
               Los menores <strong>PUEDEN ACTUAR</strong> por sí mismos si el ordenamiento les permite ejercer el derecho sin asistencia (ej. matricularse, pedir beca, recurrir nota).
             </div>
           </div>
        </div>

        {/* Representación */}
        <div className="bg-white border rounded-lg overflow-hidden shadow-sm">
           <div className="bg-slate-800 text-white p-3 font-bold text-center">
             La Representación (Art 5 LPACAP)
           </div>
           <table className="w-full text-sm">
             <thead className="bg-slate-100 border-b">
               <tr>
                 <th className="p-2 text-left font-bold text-slate-800">Tipo de Acto</th>
                 <th className="p-2 text-left font-bold text-slate-800">Requisito</th>
                 <th className="p-2 text-left font-bold text-slate-800">Ejemplos</th>
               </tr>
             </thead>
             <tbody className="divide-y text-gray-800">
               <tr className="bg-green-50">
                 <td className="p-2 font-bold">Actos de Trámite</td>
                 <td className="p-2">Se PRESUME (No pide papel)</td>
                 <td className="p-2">Presentar documentos, recibir notificaciones, pedir información.</td>
               </tr>
               <tr className="bg-red-50">
                 <td className="p-2 font-bold">Actos Cualificados</td>
                 <td className="p-2 font-bold text-red-700">Debe ACREDITARSE</td>
                 <td className="p-2">
                    1. Formular solicitudes.<br/>
                    2. Presentar recursos.<br/>
                    3. Desistir de acciones.<br/>
                    4. Renunciar a derechos.
                 </td>
               </tr>
             </tbody>
           </table>
           <div className="p-2 text-xs bg-gray-50 text-gray-700">
             * La falta de acreditación es un defecto subsanable (10 días).
           </div>
        </div>

        {/* Obligados Electrónicos */}
         <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
            <h4 className="font-bold text-indigo-900 mb-2">Los Obligados Electrónicos (Art 14.2)</h4>
            <p className="text-sm text-indigo-900 mb-2">NO pueden elegir papel. Deben relacionarse obligatoriamente por medios electrónicos:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-indigo-900">
                <div className="flex items-center gap-2"><CheckCircle2 size={14} className="text-indigo-700"/> Personas Jurídicas (S.A., S.L.).</div>
                <div className="flex items-center gap-2"><CheckCircle2 size={14} className="text-indigo-700"/> Entidades sin personalidad (Comunidades Bienes).</div>
                <div className="flex items-center gap-2"><CheckCircle2 size={14} className="text-indigo-700"/> Profesionales Colegiados (Abogados, Médicos...).</div>
                <div className="flex items-center gap-2"><CheckCircle2 size={14} className="text-indigo-700"/> Empleados Públicos (en su trabajo).</div>
                <div className="flex items-center gap-2"><CheckCircle2 size={14} className="text-indigo-700"/> Representantes de obligados.</div>
            </div>
         </div>

      </div>
    )
  },
  {
    id: 10,
    title: "El Personal de las AA.PP.",
    importance: 'medium',
    intro: "Régimen del empleo público (TREBEP). Clases de personal: Funcionario (Carrera/Interino) vs Laboral vs Eventual.",
    comparisons: [
      {
        concept: "Funcionario de Carrera",
        definition: "Relación estatutaria. Nombramiento legal. Permanencia.",
        keyDifference: "Inamovilidad. Derecho Administrativo. Potestades públicas reservadas (Art 9.2).",
        reference: { law: "TREBEP", article: "9" }
      },
      {
        concept: "Funcionario Interino",
        definition: "Nombramiento por urgencia/necesidad justificada. Temporal.",
        keyDifference: "Casos tasados: Vacante, Sustitución, Programas (<3 años), Acumulación tareas (<9 meses en 18).",
        reference: { law: "TREBEP", article: "10" }
      },
      {
        concept: "Personal Laboral",
        definition: "Contrato de trabajo formalizado por escrito.",
        keyDifference: "Derecho Laboral. Fijo, indefinido o temporal. NO puede ejercer potestades públicas.",
        reference: { law: "TREBEP", article: "11" }
      },
      {
        concept: "Personal Eventual",
        definition: "Confianza o asesoramiento especial (cargos políticos).",
        keyDifference: "Nombramiento/cese libre. Cesa con la autoridad. No mérito para acceso a función pública.",
        reference: { law: "TREBEP", article: "12" }
      }
    ],
    traps: [
      {
        title: "Personal Directivo",
        description: "¿Es una clase básica de empleado público?",
        correction: "El TREBEP lo cita (Art 13) pero NO es una clase básica (son 4). Su régimen se desarrolla por normas específicas. Puede ser funcionario o laboral."
      },
      {
        title: "Indefinido no fijo",
        description: "¿Es funcionario interino?",
        correction: "NO. Es una figura jurisprudencial laboral (fraude ley contratación). Es personal laboral, no funcionario."
      }
    ],
    chronology: [
      { year: "2015", event: "Real Decreto Legislativo 5/2015 (TREBEP) - Texto Refundido Estatuto Básico" }
    ],
    content: (
      <div className="space-y-4 text-gray-800">
        <p>El régimen del personal se basa en el TREBEP. El acceso se rige por <strong>igualdad, mérito y capacidad</strong>.</p>
        <div className="bg-purple-50 p-4 rounded border-l-4 border-purple-500">
          <h4 className="font-bold text-purple-900">Situaciones Administrativas (Funcionarios - Art 85):</h4>
          <ul className="text-sm list-disc list-inside mt-2 text-purple-900">
            <li><strong>Servicio Activo:</strong> Plenos derechos/deberes.</li>
            <li><strong>Servicios Especiales:</strong> Cargos políticos, diputados, TC, CGPJ. (Computa antigüedad y trienios, reserva plaza).</li>
            <li><strong>Servicio en otras AA.PP.:</strong> Transferencias o provisión de puestos.</li>
            <li><strong>Excedencia:</strong> Voluntaria (interés particular, agrupación familiar) o Forzosa. Cuidado familiares (computa trienios).</li>
            <li><strong>Suspensión de Funciones:</strong> Firme (condena/sanción) o Provisional (durante expediente/juicio).</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: 11,
    title: "La Unión Europea (UE)",
    importance: 'high',
    intro: "De la CEE a la Unión Europea. Evolución histórica, Instituciones y Ordenamiento Jurídico Comunitario. Principios de Primacía y Efecto Directo.",
    comparisons: [
      {
        concept: "Reglamento (UE)",
        definition: "Norma de alcance general.",
        keyDifference: "Obligatorio en todos sus elementos y DIRECTAMENTE aplicable (no requiere transposición).",
        reference: { law: "TFUE", article: "288" }
      },
      {
        concept: "Directiva",
        definition: "Norma que obliga en cuanto al RESULTADO.",
        keyDifference: "Requiere TRANSPOSICIÓN (ley/reglamento nacional). Si no se hace en plazo -> Efecto directo vertical.",
        reference: { law: "TFUE", article: "288" }
      },
      {
        concept: "Consejo Europeo",
        definition: "Jefes de Estado/Gobierno + Presidente Comisión.",
        keyDifference: "Impulso político y estrategias. NO ejerce función legislativa.",
        reference: { law: "TUE", article: "15" }
      },
      {
        concept: "Consejo de la UE",
        definition: "Ministros de los Estados miembros.",
        keyDifference: "Poder LEGISLATIVO (junto al Parlamento) y presupuestario.",
        reference: { law: "TUE", article: "16" }
      }
    ],
    traps: [
      {
        title: "Los 3 Consejos",
        description: "Confundir Consejo Europeo, Consejo de la UE y Consejo de Europa.",
        correction: "Consejo de Europa: NO ES DE LA UE (es DDHH, Tribunal Estrasburgo). Consejo Europeo: Cumbres políticas. Consejo UE: Ministros que legislan."
      },
      {
        title: "Primacía vs Supremacía",
        description: "¿La Constitución está por debajo del Derecho UE?",
        correction: "La CE sigue siendo la norma suprema interna, pero se aplica la PRIMACÍA del Derecho UE en caso de conflicto (desplazamiento de la norma nacional, no nulidad)."
      }
    ],
    chronology: [
      { year: "1957", event: "Tratados de Roma (CEE y Euratom)." },
      { year: "1986", event: "Adhesión de España a las Comunidades Europeas." },
      { year: "1992", event: "Tratado de Maastricht (Nace la Unión Europea y ciudadanía)." },
      { year: "2007", event: "Tratado de Lisboa (TUE y TFUE actuales)." }
    ],
    content: (
      <div className="space-y-4 text-gray-800">
        <p>La Unión Europea es una organización supranacional a la que los Estados ceden competencias soberanas (Art 93 CE). Su ordenamiento jurídico es autónomo y se integra en el derecho interno con primacía.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded border border-blue-200">
            <h4 className="font-bold text-blue-900 mb-2">Derecho Originario</h4>
            <p className="text-sm text-blue-900">Tratados fundacionales (TUE, TFUE) y sus modificaciones. Son la "Constitución" de la UE.</p>
          </div>
          <div className="bg-indigo-50 p-4 rounded border border-indigo-200">
            <h4 className="font-bold text-indigo-900 mb-2">Derecho Derivado</h4>
            <p className="text-sm text-indigo-900">Normas aprobadas por las instituciones: Reglamentos (Ley directa), Directivas (Ley marco a trasponer) y Decisiones.</p>
          </div>
        </div>
      </div>
    )
  }
];

// --- Components ---

const Header = ({ mode, setMode }: { mode: Mode, setMode: (m: Mode) => void }) => (
  <header className="bg-gradient-to-r from-blue-900 to-blue-700 text-white shadow-lg no-print">
    <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="flex items-center gap-3">
        <div className="bg-white p-2 rounded-full text-blue-900">
          <GraduationCap size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">VILLOTA READY</h1>
          <p className="text-blue-100 text-sm">Compendio Derecho Administrativo UDIMA 2025</p>
        </div>
      </div>
      
      <div className="flex bg-blue-800/50 p-1 rounded-lg">
        <button 
          onClick={() => setMode('study')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${mode === 'study' ? 'bg-white text-blue-900 font-bold shadow-sm' : 'text-blue-100 hover:text-white'}`}
        >
          <BookOpen size={18} />
          Modo Estudio
        </button>
        <button 
          onClick={() => setMode('exam')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${mode === 'exam' ? 'bg-white text-blue-900 font-bold shadow-sm' : 'text-blue-100 hover:text-white'}`}
        >
          <FileText size={18} />
          Modo Examen
        </button>
      </div>
    </div>
  </header>
);

const UnitSelector = ({ current, setUnit }: { current: number, setUnit: (id: number) => void }) => (
  <div className="bg-white border-r border-gray-200 w-full md:w-64 flex-shrink-0 h-full overflow-y-auto no-print">
    <div className="p-4 border-b border-gray-100">
      <h2 className="font-bold text-gray-700 uppercase text-xs tracking-wider mb-2">Temario</h2>
    </div>
    <nav>
      {unitsData.map((unit) => (
        <button
          key={unit.id}
          onClick={() => setUnit(unit.id)}
          className={`w-full text-left px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors flex items-center justify-between group ${
            current === unit.id ? 'bg-blue-50 border-l-4 border-l-blue-600' : 'border-l-4 border-l-transparent'
          }`}
        >
          <div>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full mb-1 inline-block ${
              unit.importance === 'high' ? 'bg-red-100 text-red-700' : 
              unit.importance === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-800'
            }`}>
              UD {unit.id}
            </span>
            <div className={`text-sm font-medium ${current === unit.id ? 'text-blue-900' : 'text-gray-900'}`}>
              {unit.title}
            </div>
          </div>
          {current === unit.id && <ChevronRight size={16} className="text-blue-600" />}
        </button>
      ))}
    </nav>
  </div>
);

const NormativeTag = ({ reference }: { reference: Reference }) => (
  <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-800 px-2 py-0.5 rounded text-xs font-mono border border-slate-200 whitespace-nowrap" title={`Ley: ${reference.law}, Artículo: ${reference.article}`}>
    <Scale size={10} />
    {reference.law} art.{reference.article}
  </span>
);

const ComparisonTable = ({ comparisons, mode }: { comparisons: ComparisonRow[], mode: Mode }) => {
  if (comparisons.length === 0) return null;

  return (
    <div className="my-6">
      <h3 className="flex items-center gap-2 font-bold text-lg mb-3 text-gray-900">
        <ArrowLeftRight className="text-blue-600" />
        Comparativa Clave
      </h3>
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-900 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Concepto</th>
              <th className="px-4 py-3">Definición</th>
              <th className="px-4 py-3 bg-yellow-50">Diferencia Clave</th>
              {mode === 'study' && <th className="px-4 py-3">Base Legal</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-gray-800">
            {comparisons.map((row, idx) => (
              <tr key={idx} className="bg-white hover:bg-gray-50">
                <td className="px-4 py-3 font-bold text-blue-900">{row.concept}</td>
                <td className="px-4 py-3 text-gray-800">{row.definition}</td>
                <td className="px-4 py-3 bg-yellow-50/50 font-medium text-gray-900">{row.keyDifference}</td>
                {mode === 'study' && (
                  <td className="px-4 py-3">
                    <NormativeTag reference={row.reference} />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const TrapCard: React.FC<{ trap: Trap }> = ({ trap }) => (
  <div className="bg-white border-l-4 border-amber-500 shadow-sm rounded-r-lg p-4 mb-4">
    <div className="flex items-start gap-3">
      <div className="bg-amber-100 p-2 rounded-full text-amber-600 flex-shrink-0 mt-1">
        <AlertTriangle size={20} />
      </div>
      <div>
        <h4 className="font-bold text-amber-900 text-sm uppercase tracking-wide mb-1">Trampa Villota: {trap.title}</h4>
        <p className="text-gray-800 italic mb-2">"{trap.description}"</p>
        <div className="bg-amber-50 p-2 rounded text-sm text-amber-900 font-medium flex gap-2">
          <CheckCircle2 size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
          {trap.correction}
        </div>
      </div>
    </div>
  </div>
);

const Chronology = ({ events }: { events: { year: string, event: string }[] }) => {
  if (events.length === 0) return null;
  return (
    <div className="mt-8 mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
       <h3 className="flex items-center gap-2 font-bold text-lg mb-4 text-slate-800">
        <Clock className="text-slate-700" />
        Cronología Normativa
      </h3>
      <div className="space-y-4 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-300 ml-2">
        {events.map((e, idx) => (
          <div key={idx} className="relative pl-8">
            <div className="absolute left-0 top-1.5 w-4 h-4 bg-white border-2 border-blue-500 rounded-full"></div>
            <span className="font-bold text-blue-900 block">{e.year}</span>
            <span className="text-gray-800 text-sm">{e.event}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const ExamCheatSheet = ({ unit }: { unit: Unit }) => (
  <div className="print-only hidden space-y-4">
    <h2 className="text-xl font-bold border-b-2 border-black mb-2">RESUMEN EXAMEN: UD {unit.id} - {unit.title}</h2>
    
    <div className="grid grid-cols-2 gap-4 text-xs">
      <div>
        <h3 className="font-bold mb-1">Conceptos Clave</h3>
        <ul className="list-disc pl-4 space-y-1">
          {unit.comparisons.map((c, i) => (
            <li key={i}>
              <strong>{c.concept}:</strong> {c.keyDifference}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="font-bold mb-1">¡Ojo Trampas!</h3>
        <ul className="list-disc pl-4 space-y-1">
          {unit.traps.map((t, i) => (
            <li key={i}>
              {t.title}: {t.correction}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

const WelcomeScreen = ({ start }: { start: () => void }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
    <div className="bg-blue-100 p-6 rounded-full text-blue-800 mb-6">
      <BookOpen size={64} />
    </div>
    <h1 className="text-4xl font-bold text-blue-900 mb-4">Bienvenido a Villota Ready 2025</h1>
    <p className="text-xl text-gray-800 max-w-2xl mb-8">
      Tu compendio interactivo para dominar Fundamentos de Derecho Administrativo.
      Diseñado específicamente para el método UDIMA.
    </p>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl w-full mb-10">
      <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-blue-500">
        <h3 className="font-bold text-lg mb-2 flex items-center gap-2 justify-center text-gray-900">
          <BookOpen size={20} className="text-blue-500"/> Modo Estudio
        </h3>
        <p className="text-gray-700 text-sm">Contenido detallado, explicaciones profundas, referencias normativas interactivas y todas las trampas explicadas.</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-green-500">
        <h3 className="font-bold text-lg mb-2 flex items-center gap-2 justify-center text-gray-900">
          <FileText size={20} className="text-green-500"/> Modo Examen
        </h3>
        <p className="text-gray-700 text-sm">Tablas de repaso rápido, esquemas visuales de alta densidad y formato optimizado para imprimir.</p>
      </div>
    </div>

    <button 
      onClick={start}
      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-full shadow-lg transition-transform transform hover:scale-105 flex items-center gap-3 text-lg"
    >
      Comenzar Estudio <ChevronRight />
    </button>
  </div>
);

// --- Main Application ---

const App = () => {
  const [currentUnitId, setCurrentUnitId] = useState<number | null>(null);
  const [mode, setMode] = useState<Mode>('study');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentUnit = unitsData.find(u => u.id === currentUnitId);

  const downloadPack = () => {
    // Simulator for the download requirement
    const element = document.createElement("a");
    const file = new Blob([
      `VILLOTA READY 2025 - LEEME PRIMERO\n\nEste archivo confirma que has descargado el pack de estudio.\n\nContenido del Pack:\n1. Resúmenes interactivos (Ver App)\n2. Tablas Comparativas (Modo Examen)\n3. Hoja de Trampas (Sección Alertas)\n\n¡Mucha suerte en el examen!`
    ], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "LEEME_PRIMERO.txt";
    document.body.appendChild(element);
    element.click();
    alert("Descargando Pack Villota Ready (Simulación)...");
  };

  if (!currentUnitId) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header mode={mode} setMode={setMode} />
        <main className="flex-grow bg-gray-50">
          <WelcomeScreen start={() => setCurrentUnitId(2)} />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row h-screen overflow-hidden">
      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden bg-blue-900 text-white p-4 flex justify-between items-center no-print">
        <span className="font-bold">Villota Ready</span>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'block' : 'hidden'} md:block absolute md:relative z-20 h-full w-64 bg-white shadow-xl md:shadow-none`}>
         <div className="h-full flex flex-col">
            <div className="p-4 bg-blue-900 text-white hidden md:block">
               <div className="font-bold text-xl tracking-tight">VILLOTA READY</div>
               <div className="text-xs text-blue-100 mt-1">Derecho Administrativo</div>
            </div>
            <UnitSelector current={currentUnitId || 0} setUnit={(id) => { setCurrentUnitId(id); setSidebarOpen(false); }} />
            <div className="p-4 border-t border-gray-100 no-print">
              <button onClick={downloadPack} className="w-full flex items-center justify-center gap-2 bg-green-50 text-green-700 border border-green-200 p-2 rounded hover:bg-green-100 transition-colors text-sm font-bold">
                <Download size={16} /> Descargar .ZIP
              </button>
            </div>
         </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full bg-white overflow-hidden relative">
        {/* Mode Toggle Bar */}
        <div className="bg-gray-50 border-b border-gray-200 p-4 flex justify-between items-center no-print">
          <div className="flex gap-2">
             <button 
               onClick={() => setMode('study')}
               className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === 'study' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-700 hover:bg-gray-200'}`}
             >
               Modo Estudio
             </button>
             <button 
               onClick={() => setMode('exam')}
               className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === 'exam' ? 'bg-white text-blue-900 font-bold shadow-sm' : 'text-blue-700 hover:text-blue-900'}`}
             >
               Modo Examen
             </button>
          </div>
          <button onClick={() => window.print()} className="text-gray-600 hover:text-gray-900" title="Imprimir unidad">
            <Printer size={20} />
          </button>
        </div>

        {/* Scrollable Unit Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-12 scroll-smooth">
          {currentUnit && (
            <div className={`max-w-4xl mx-auto ${mode === 'exam' ? 'font-serif' : ''}`}>
              
              {/* Header of Unit */}
              <div className="mb-8 border-b pb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-bold text-gray-600 uppercase tracking-wider">Unidad Didáctica {currentUnit.id}</span>
                  {currentUnit.importance === 'high' && <span className="bg-red-100 text-red-800 text-xs font-bold px-2 py-0.5 rounded-full">ALTA IMPORTANCIA</span>}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{currentUnit.title}</h1>
                <p className="text-lg text-gray-800 leading-relaxed font-light italic border-l-4 border-gray-300 pl-4">
                  {currentUnit.intro}
                </p>
              </div>

              {/* Study Mode Content */}
              {mode === 'study' && (
                <div className="animate-in fade-in duration-500">
                  <div className="prose prose-blue max-w-none text-gray-800 text-justify">
                    {currentUnit.content}
                  </div>
                  
                  <ComparisonTable comparisons={currentUnit.comparisons} mode="study" />
                  
                  <Chronology events={currentUnit.chronology} />

                  <div className="mt-10">
                    <h3 className="font-bold text-xl mb-4 text-gray-900 flex items-center gap-2">
                      <AlertTriangle className="text-amber-600" />
                      Trampas & Errores Frecuentes
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {currentUnit.traps.map((trap, idx) => (
                        <TrapCard key={idx} trap={trap} />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Exam Mode Content */}
              {mode === 'exam' && (
                <div className="animate-in fade-in duration-500">
                  <div className="bg-yellow-50 border border-yellow-200 p-4 mb-6 rounded text-sm text-yellow-900 no-print flex gap-3">
                    <BookMarked className="flex-shrink-0" />
                    <div>
                      <strong>Modo Examen Activado:</strong> Vista optimizada para repaso rápido e impresión. Se han eliminado elementos decorativos y texto superfluo.
                    </div>
                  </div>

                  <h2 className="text-xl font-bold mb-4 border-b border-gray-300">Esquema Rápido</h2>
                  <ComparisonTable comparisons={currentUnit.comparisons} mode="exam" />
                  
                  {currentUnit.traps.length > 0 && (
                     <div className="mt-8">
                       <h3 className="text-lg font-bold mb-2">⚠️ Ojo al dato (Trampas)</h3>
                       <ul className="list-disc pl-5 space-y-2">
                         {currentUnit.traps.map((t, i) => (
                           <li key={i} className="text-sm">
                             <strong>{t.title}:</strong> {t.correction}
                           </li>
                         ))}
                       </ul>
                     </div>
                  )}

                   {/* Print helper */}
                   <ExamCheatSheet unit={currentUnit} />
                </div>
              )}
              
              {/* Footer */}
              <div className="mt-16 pt-8 border-t border-gray-100 text-center text-gray-600 text-sm no-print">
                Villota Ready 2025 • Material de apoyo no oficial para UDIMA
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);