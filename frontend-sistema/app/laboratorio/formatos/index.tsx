'use client';

import { createElement, type ComponentType } from 'react';
import AcidoUrico from './AcidoUrico';
import AcidosBiliares from './AcidosBiliares';
import Aglutinaciones from './Aglutinaciones';
import AmilasaLipasaFem from './AmilasaLipasaFem';
import AmilasaLipasaMasc from './AmilasaLipasaMasc';
import AntiCcp from './AntiCcp';
import BilirrubinasTotales from './BilirrubinasTotales';
import Bk from './Bk';
import CalcioSerico from './CalcioSerico';
import Colesterol from './Colesterol';
import ColesterolLdl from './ColesterolLdl';
import ColesterolYTrigliceridosFem from './ColesterolYTrigliceridosFem';
import ColesterolYTrigliceridosMasc from './ColesterolYTrigliceridosMasc';
import Coprocultivo from './Coprocultivo';
import Coprologico from './Coprologico';
import CoprologicoMasc from './CoprologicoMasc';
import Cortisol from './Cortisol';
import Creatinina from './Creatinina';
import CultivoSecrecionFaringea from './CultivoSecrecionFaringea';
import CultivoSecrecionOtidica from './CultivoSecrecionOtidica';
import CultivoSecrecionVaginal from './CultivoSecrecionVaginal';
import ElectrolitosSericos from './ElectrolitosSericos';
import ExamenCompletoOrinaFem from './ExamenCompletoOrinaFem';
import ExamenCompletoOrinaMasc from './ExamenCompletoOrinaMasc';
import FactorReumatoideo from './FactorReumatoideo';
import Ferritina from './Ferritina';
import Glucosa from './Glucosa';
import GlucosaColesterolTrigliceridos from './GlucosaColesterolTrigliceridos';
import GrupoSanguineo from './GrupoSanguineo';
import HcgCualitativo from './HcgCualitativo';
import HcgCuantitativo from './HcgCuantitativo';
import HelicobacterPyloriHeces from './HelicobacterPyloriHeces';
import HelicobacterPyloriSangre from './HelicobacterPyloriSangre';
import HematocritoHemoglobina from './HematocritoHemoglobina';
import HemoglobinaGlicosilada from './HemoglobinaGlicosilada';
import HemogramaAutomatizado from './HemogramaAutomatizado';
import HepatitisB from './HepatitisB';
import Herpes1IgmIgg from './Herpes1IgmIgg';
import HierroSerico from './HierroSerico';
import HivElisa from './HivElisa';
import HormonasFemeninas from './HormonasFemeninas';
import InmunoglobulinaE from './InmunoglobulinaE';
import InsulinaBasal from './InsulinaBasal';
import Lh from './Lh';
import Magnesio from './Magnesio';
import MarcadoresTumorales from './MarcadoresTumorales';
import Microalbuminuria from './Microalbuminuria';
import Microalbuminuria24Horas from './Microalbuminuria24Horas';
import Papanicolaou from './Papanicolaou';
import ParasitologicoSeriado from './ParasitologicoSeriado';
import ParasitologicoSimple from './ParasitologicoSimple';
import PcrCuantitativo from './PcrCuantitativo';
import PerfilCoagulacion from './PerfilCoagulacion';
import PerfilHepatico from './PerfilHepatico';
import PerfilHepatitis from './PerfilHepatitis';
import PerfilLipidico from './PerfilLipidico';
import PerfilRenal from './PerfilRenal';
import PerfilTiroideo from './PerfilTiroideo';
import PerfilVitaminaB12Anemia from './PerfilVitaminaB12Anemia';
import ProteinasTotales from './ProteinasTotales';
import Proteinuria24Horas from './Proteinuria24Horas';
import PsaTotalLibre from './PsaTotalLibre';
import Rpr from './Rpr';
import SaturacionTransferrina from './SaturacionTransferrina';
import T4Libre from './T4Libre';
import T4LibreTsh from './T4LibreTsh';
import TestGraham from './TestGraham';
import TgoTgp from './TgoTgp';
import Thevenon from './Thevenon';
import TiempoCoagulacionSangria from './TiempoCoagulacionSangria';
import TiempoProtrombina from './TiempoProtrombina';
import Trigliceridos from './Trigliceridos';
import Tsh from './Tsh';
import Urea from './Urea';
import UreaCreatinina from './UreaCreatinina';
import Urocultivo from './Urocultivo';
import Vdrl from './Vdrl';
import VihPruebaRapida from './VihPruebaRapida';
import VitaminaB12 from './VitaminaB12';
import VitaminaD from './VitaminaD';

export interface FormatoProps {
  valor: string;
  onChange: (valor: string) => void;
  paciente?: { sexo: 'M' | 'F'; edad?: number };
}

type Sexo = 'M' | 'F' | null | undefined;
type Formato = ComponentType<FormatoProps>;

function normalizar(nombre: string) {
  return nombre
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim();
}

// Un formato único para el examen. La clave es el nombre en el catálogo
// (examenes_catalogo.nombre); no importan mayúsculas ni tildes.
const FORMATOS: Record<string, Formato> = {
  [normalizar('ACIDO URICO')]: AcidoUrico,
  [normalizar('ACIDOS BILIARES')]: AcidosBiliares,
  [normalizar('BILIRRUBINA TOTAL Y FRACCIONADA')]: BilirrubinasTotales,
  [normalizar('CALCIO SERICO')]: CalcioSerico,
  [normalizar('COLESTEROL TOTAL')]: Colesterol,
  [normalizar('COLESTEROL LDL')]: ColesterolLdl,
  [normalizar('CREATININA')]: Creatinina,
  [normalizar('AGLUTINACIONES FEBRILES')]: Aglutinaciones,
  [normalizar('GLUCOSA BASAL')]: Glucosa,
  [normalizar('UREA')]: Urea,
  [normalizar('HEMOGRAMA COMPLETO')]: HemogramaAutomatizado,
  [normalizar('HEMOGLOBINA')]: HematocritoHemoglobina,
  [normalizar('GRUPO SANGUINEO Y FACTOR RH')]: GrupoSanguineo,
  [normalizar('PROTEINA C REACTIVA (PCR) CUANTITATIVO')]: PcrCuantitativo,
  [normalizar('PERFIL LIPIDICO')]: PerfilLipidico,
  [normalizar('PERFIL HEPATICO')]: PerfilHepatico,
  [normalizar('PERFIL TIROIDEO I (TSH, T4)')]: T4LibreTsh,
  [normalizar('PERFIL DE COAGULACIÓN')]: PerfilCoagulacion,
  [normalizar('PARASITOLOGICO SIMPLE')]: ParasitologicoSimple,
  [normalizar('PARASITOLOGICO SERIADO')]: ParasitologicoSeriado,
  [normalizar('ANTI-CCP')]: AntiCcp,
  [normalizar('BK DIRECTO')]: Bk,
  [normalizar('COPROCULTIVO')]: Coprocultivo,
  [normalizar('CORTISOL A.M.')]: Cortisol,
  [normalizar('CORTISOL P.M.')]: Cortisol,
  [normalizar('CULTIVO DE SECRECION FARINGEA')]: CultivoSecrecionFaringea,
  [normalizar('CULTIVO DE SECRECION OTIDICA')]: CultivoSecrecionOtidica,
  [normalizar('CULTIVO DE SECRECION VAGINAL')]: CultivoSecrecionVaginal,
  [normalizar('ELECTROLITOS SERICOS')]: ElectrolitosSericos,
  [normalizar('FACTOR REUMATOIDEO (FR)')]: FactorReumatoideo,
  [normalizar('FERRITINA')]: Ferritina,
  [normalizar('GLUCOSA, COLESTEROL Y TRIGLICERIDOS')]: GlucosaColesterolTrigliceridos,
  [normalizar('HCG CUALITATIVO')]: HcgCualitativo,
  [normalizar('HCG CUANTITATIVO')]: HcgCuantitativo,
  [normalizar('HELICOBACTER PYLORI EN HECES (ANTIGENO)')]: HelicobacterPyloriHeces,
  [normalizar('HELICOBACTER PYLORI EN SANGRE (IGM)')]: HelicobacterPyloriSangre,
  [normalizar('HEMOGLOBINA GLICOSILADA (HBA1C)')]: HemoglobinaGlicosilada,
  [normalizar('HEPATITIS B (HBSAG)')]: HepatitisB,
  [normalizar('HERPES 1 (IGM / IGG)')]: Herpes1IgmIgg,
  [normalizar('HIERRO SERICO')]: HierroSerico,
  [normalizar('HIV ELISA')]: HivElisa,
  [normalizar('HORMONAS FEMENINAS (ESTRADIOL, FSH, LH, PROGESTERONA, PROLACTINA)')]: HormonasFemeninas,
  [normalizar('INMUNOGLOBULINA E')]: InmunoglobulinaE,
  [normalizar('INSULINA BASAL')]: InsulinaBasal,
  [normalizar('LH (HORMONA LUTEINIZANTE)')]: Lh,
  [normalizar('MAGNESIO')]: Magnesio,
  [normalizar('MARCADORES TUMORALES (CEA, AFP)')]: MarcadoresTumorales,
  [normalizar('MICROALBUMINURIA')]: Microalbuminuria,
  [normalizar('MICROALBUMINURIA 24 HORAS')]: Microalbuminuria24Horas,
  [normalizar('PAPANICOLAOU')]: Papanicolaou,
  [normalizar('PERFIL DE HEPATITIS (HBSAG, ANTI-HCV)')]: PerfilHepatitis,
  [normalizar('PERFIL RENAL')]: PerfilRenal,
  [normalizar('PERFIL TIROIDEO (TSH, T3 LIBRE, T4 LIBRE)')]: PerfilTiroideo,
  [normalizar('PERFIL DE ANEMIA (VITAMINA B12, ACIDO FOLICO, FERRITINA, TRANSFERRINA)')]: PerfilVitaminaB12Anemia,
  [normalizar('PROTEINAS TOTALES')]: ProteinasTotales,
  [normalizar('PROTEINURIA 24 HORAS')]: Proteinuria24Horas,
  [normalizar('PSA TOTAL Y LIBRE')]: PsaTotalLibre,
  [normalizar('RPR')]: Rpr,
  [normalizar('SATURACION DE TRANSFERRINA')]: SaturacionTransferrina,
  [normalizar('T4 LIBRE')]: T4Libre,
  [normalizar('TEST DE GRAHAM')]: TestGraham,
  [normalizar('TGO / TGP')]: TgoTgp,
  [normalizar('THEVENON')]: Thevenon,
  [normalizar('TIEMPO DE COAGULACION Y SANGRIA')]: TiempoCoagulacionSangria,
  [normalizar('TIEMPO DE PROTROMBINA E INR')]: TiempoProtrombina,
  [normalizar('TRIGLICERIDOS')]: Trigliceridos,
  [normalizar('TSH')]: Tsh,
  [normalizar('UREA Y CREATININA')]: UreaCreatinina,
  [normalizar('UROCULTIVO')]: Urocultivo,
  [normalizar('VDRL')]: Vdrl,
  [normalizar('HIV PRUEBA RAPIDA')]: VihPruebaRapida,
  [normalizar('VITAMINA B12')]: VitaminaB12,
  [normalizar('VITAMINA D')]: VitaminaD,
};

// Exámenes con un formato distinto para cada sexo. Si el sexo del paciente
// no se conoce, se usa el femenino.
const FORMATOS_POR_SEXO: Record<string, { M: Formato; F: Formato }> = {
  [normalizar('AMILASA')]: { M: AmilasaLipasaMasc, F: AmilasaLipasaFem },
  [normalizar('EXAMEN DE ORINA COMPLETO')]: { M: ExamenCompletoOrinaMasc, F: ExamenCompletoOrinaFem },
  [normalizar('COPROLOGICO FUNCIONAL')]: { M: CoprologicoMasc, F: Coprologico },
  [normalizar('COLESTEROL Y TRIGLICERIDOS')]: { M: ColesterolYTrigliceridosMasc, F: ColesterolYTrigliceridosFem },
};

function buscarFormato(nombreExamen: string, sexo?: Sexo): Formato | null {
  const clave = normalizar(nombreExamen);
  const porSexo = FORMATOS_POR_SEXO[clave];
  if (porSexo) return sexo === 'M' ? porSexo.M : porSexo.F;
  return FORMATOS[clave] ?? null;
}

/** ¿Este examen ya tiene un formato para registrar su resultado? */
export function tieneFormato(nombreExamen: string): boolean {
  const clave = normalizar(nombreExamen);
  return clave in FORMATOS || clave in FORMATOS_POR_SEXO;
}

export function FormatoResultado({
  nombreExamen,
  valor,
  onChange,
  paciente,
}: FormatoProps & { nombreExamen: string }) {
  const Formato = buscarFormato(nombreExamen, paciente?.sexo);
  if (!Formato) return null;
  // createElement (y no <Formato />): el formato se elige según el examen y el
  // sexo, no se define dentro de este componente.
  return createElement(Formato, { valor, onChange, paciente });
}

/* =========================================================
   MOSTRAR UN RESULTADO GUARDADO
   Los formatos guardan JSON; en la lista de exámenes se muestra como líneas
   "Campo: valor". El texto libre se muestra tal cual.
========================================================= */

function etiqueta(clave: string) {
  const texto = clave.replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/_/g, ' ').toLowerCase();
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

function aLineas(dato: unknown, prefijo = ''): string[] {
  if (dato === null || dato === undefined || dato === '') return [];
  if (typeof dato !== 'object') return [prefijo ? `${prefijo}: ${String(dato)}` : String(dato)];
  if (Array.isArray(dato)) return dato.flatMap((item) => aLineas(item, prefijo));
  return Object.entries(dato as Record<string, unknown>).flatMap(([clave, valor]) =>
    typeof valor === 'object' && valor !== null
      ? aLineas(valor, prefijo ? `${prefijo} · ${etiqueta(clave)}` : etiqueta(clave))
      : aLineas(valor, prefijo ? `${prefijo} · ${etiqueta(clave)}` : etiqueta(clave)),
  );
}

export function resultadoLegible(texto: string): string {
  const limpio = texto.trim();
  if (!limpio.startsWith('{') && !limpio.startsWith('[')) return texto;
  try {
    const dato: unknown = JSON.parse(limpio);
    // Un solo valor suelto (p. ej. {"acidoUrico":"3.6"}) se muestra sin etiqueta.
    if (dato && typeof dato === 'object' && !Array.isArray(dato)) {
      const valores = Object.values(dato as Record<string, unknown>);
      if (valores.length === 1 && typeof valores[0] !== 'object') return String(valores[0]);
    }
    const lineas = aLineas(dato);
    return lineas.length ? lineas.join('\n') : texto;
  } catch {
    return texto;
  }
}
