'use client';

interface Props {
  valor: string;
  onChange: (valor: string) => void;
}

export default function BiopsiaQuirurgica({
  valor,
  onChange,
}: Props) {

  return (
    <div className="space-y-4">

      <div>
        <p className="text-sm font-bold text-gray-800">
          Biopsia Quirúrgica
        </p>

        <p className="text-[11px] text-gray-400 mt-1">
          Registro del resultado del examen
        </p>
      </div>

      <div>

        <label className="block text-xs font-semibold text-gray-600 mb-1.5">
          Resultado
        </label>

        <textarea
          rows={6}
          value={valor}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Ingrese el resultado de la biopsia..."
          className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#0d7a71] resize-none"
        />

      </div>

    </div>
  );
}