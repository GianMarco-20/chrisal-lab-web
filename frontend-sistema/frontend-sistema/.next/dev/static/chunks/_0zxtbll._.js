(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/citas/estados/ModalBase.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AlertIcon",
    ()=>AlertIcon,
    "CITA_EJEMPLO",
    ()=>CITA_EJEMPLO,
    "CalendarIcon",
    ()=>CalendarIcon,
    "Campo",
    ()=>Campo,
    "CloseIcon",
    ()=>CloseIcon,
    "DocIcon",
    ()=>DocIcon,
    "EstadoBadge",
    ()=>EstadoBadge,
    "ModalShell",
    ()=>ModalShell,
    "PulseIcon",
    ()=>PulseIcon,
    "Signo",
    ()=>Signo,
    "TRIAJE_VACIO",
    ()=>TRIAJE_VACIO,
    "Tarjeta",
    ()=>Tarjeta,
    "TarjetaPaciente",
    ()=>TarjetaPaciente,
    "TarjetaTriaje",
    ()=>TarjetaTriaje,
    "TriajeFormulario",
    ()=>TriajeFormulario,
    "UserIcon",
    ()=>UserIcon,
    "btnDanger",
    ()=>btnDanger,
    "btnPrimary",
    ()=>btnPrimary,
    "btnSecondary",
    ()=>btnSecondary,
    "formatFecha",
    ()=>formatFecha,
    "formatHora",
    ()=>formatHora,
    "inputClass",
    ()=>inputClass,
    "labelClass",
    ()=>labelClass,
    "textareaClass",
    ()=>textareaClass
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
const TRIAJE_VACIO = {
    presionArterial: '',
    frecuenciaCardiaca: '',
    frecuenciaRespiratoria: '',
    temperatura: '',
    saturacion: '',
    peso: '',
    talla: '',
    motivoConsulta: ''
};
const CITA_EJEMPLO = {
    id: 'CIT-001',
    hc: 'HC-000002',
    dni: '71977410',
    paciente: 'JHOSSEP DILSON FERNANDEZ ASTO',
    celular: '987 654 321',
    sexo: 'Masculino',
    especialidad: 'Medicina General',
    medico: 'Por asignar',
    fecha: '2026-10-01',
    hora: '07:30'
};
function formatFecha(fecha) {
    const [y, m, d] = fecha.slice(0, 10).split('-');
    return `${d}/${m}/${y}`;
}
function formatHora(hora) {
    const [h, min] = hora.split(':');
    const horas = Number(h);
    return `${horas % 12 || 12}:${min} ${horas >= 12 ? 'PM' : 'AM'}`;
}
const inputClass = 'h-10 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/15';
const textareaClass = 'w-full resize-none rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/15';
const labelClass = 'mb-1.5 block text-xs font-semibold text-gray-700';
const btnBase = 'inline-flex h-10 items-center justify-center rounded-xl px-5 text-sm font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0d7a71]/40';
const btnPrimary = `${btnBase} bg-[#0d7a71] text-white shadow-sm shadow-[#0d7a71]/25 hover:bg-[#0a625b]`;
const btnSecondary = `${btnBase} border border-gray-200 bg-white text-gray-600 hover:bg-gray-50`;
const btnDanger = `${btnBase} bg-red-50 text-red-600 hover:bg-red-100`;
const svgProps = (size)=>({
        width: size,
        height: size,
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
    });
const CalendarIcon = ({ size = 16 })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        ...svgProps(size),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "3",
                y: "4",
                width: "18",
                height: "17",
                rx: "2"
            }, void 0, false, {
                fileName: "[project]/app/citas/estados/ModalBase.tsx",
                lineNumber: 153,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M16 2v4M8 2v4M3 10h18"
            }, void 0, false, {
                fileName: "[project]/app/citas/estados/ModalBase.tsx",
                lineNumber: 160,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/app/citas/estados/ModalBase.tsx",
        lineNumber: 152,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c = CalendarIcon;
const PulseIcon = ({ size = 16 })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        ...svgProps(size),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M3 12h4l2-7 4 14 2-7h6"
        }, void 0, false, {
            fileName: "[project]/app/citas/estados/ModalBase.tsx",
            lineNumber: 168,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/app/citas/estados/ModalBase.tsx",
        lineNumber: 167,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c1 = PulseIcon;
const DocIcon = ({ size = 16 })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        ...svgProps(size),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"
            }, void 0, false, {
                fileName: "[project]/app/citas/estados/ModalBase.tsx",
                lineNumber: 176,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M14 3v5h5"
            }, void 0, false, {
                fileName: "[project]/app/citas/estados/ModalBase.tsx",
                lineNumber: 177,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M9 13h6M9 17h4"
            }, void 0, false, {
                fileName: "[project]/app/citas/estados/ModalBase.tsx",
                lineNumber: 178,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/app/citas/estados/ModalBase.tsx",
        lineNumber: 175,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c2 = DocIcon;
const UserIcon = ({ size = 16 })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        ...svgProps(size),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "12",
                cy: "8",
                r: "4"
            }, void 0, false, {
                fileName: "[project]/app/citas/estados/ModalBase.tsx",
                lineNumber: 186,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M5 21a7 7 0 0 1 14 0"
            }, void 0, false, {
                fileName: "[project]/app/citas/estados/ModalBase.tsx",
                lineNumber: 191,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/app/citas/estados/ModalBase.tsx",
        lineNumber: 185,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c3 = UserIcon;
const AlertIcon = ({ size = 16 })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        ...svgProps(size),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M12 9v4M12 17h.01"
            }, void 0, false, {
                fileName: "[project]/app/citas/estados/ModalBase.tsx",
                lineNumber: 199,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M10.3 3.9 2.5 17.4A2 2 0 0 0 4.2 20.5h15.6a2 2 0 0 0 1.7-3.1L13.7 3.9a2 2 0 0 0-3.4 0z"
            }, void 0, false, {
                fileName: "[project]/app/citas/estados/ModalBase.tsx",
                lineNumber: 200,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/app/citas/estados/ModalBase.tsx",
        lineNumber: 198,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c4 = AlertIcon;
const CloseIcon = ({ size = 20 })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        ...svgProps(size),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M6 18 18 6M6 6l12 12"
        }, void 0, false, {
            fileName: "[project]/app/citas/estados/ModalBase.tsx",
            lineNumber: 208,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/app/citas/estados/ModalBase.tsx",
        lineNumber: 207,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c5 = CloseIcon;
/* =========================================================
   INSIGNIA DE ESTADO
========================================================= */ const tonos = {
    amber: {
        badge: 'bg-amber-50 text-amber-700',
        dot: 'bg-amber-500',
        icon: 'bg-amber-50 text-amber-600'
    },
    red: {
        badge: 'bg-red-50 text-red-600',
        dot: 'bg-red-500',
        icon: 'bg-red-50 text-red-600'
    },
    violet: {
        badge: 'bg-violet-50 text-violet-700',
        dot: 'bg-violet-500',
        icon: 'bg-violet-50 text-violet-600'
    },
    blue: {
        badge: 'bg-blue-50 text-blue-700',
        dot: 'bg-blue-500',
        icon: 'bg-blue-50 text-blue-600'
    },
    gray: {
        badge: 'bg-gray-100 text-gray-600',
        dot: 'bg-gray-500',
        icon: 'bg-gray-100 text-gray-600'
    }
};
function EstadoBadge({ tono, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-sm font-semibold text-gray-500",
                children: "Estado de la cita"
            }, void 0, false, {
                fileName: "[project]/app/citas/estados/ModalBase.tsx",
                lineNumber: 259,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${tonos[tono].badge}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `h-2 w-2 rounded-full ${tonos[tono].dot}`
                    }, void 0, false, {
                        fileName: "[project]/app/citas/estados/ModalBase.tsx",
                        lineNumber: 266,
                        columnNumber: 9
                    }, this),
                    children
                ]
            }, void 0, true, {
                fileName: "[project]/app/citas/estados/ModalBase.tsx",
                lineNumber: 263,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/citas/estados/ModalBase.tsx",
        lineNumber: 258,
        columnNumber: 5
    }, this);
}
_c6 = EstadoBadge;
function ModalShell({ titulo, subtitulo, tono, icono, onClose, footer, children }) {
    _s();
    /* Cerrar con ESC */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ModalShell.useEffect": ()=>{
            const onKey = {
                "ModalShell.useEffect.onKey": (e)=>{
                    if (e.key === 'Escape') {
                        onClose();
                    }
                }
            }["ModalShell.useEffect.onKey"];
            document.addEventListener('keydown', onKey);
            return ({
                "ModalShell.useEffect": ()=>document.removeEventListener('keydown', onKey)
            })["ModalShell.useEffect"];
        }
    }["ModalShell.useEffect"], [
        onClose
    ]);
    /* Bloquear scroll del body */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ModalShell.useEffect": ()=>{
            document.body.style.overflow = 'hidden';
            return ({
                "ModalShell.useEffect": ()=>{
                    document.body.style.overflow = '';
                }
            })["ModalShell.useEffect"];
        }
    }["ModalShell.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        role: "dialog",
        "aria-modal": "true",
        "aria-label": titulo,
        className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/45 p-3 backdrop-blur-sm sm:p-5",
        onMouseDown: (e)=>{
            if (e.target === e.currentTarget) {
                onClose();
            }
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-2xl",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                    className: "flex shrink-0 items-center justify-between gap-4 border-b border-gray-100 px-5 py-4 sm:px-7 sm:py-5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex min-w-0 items-center gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${tonos[tono].icon}`,
                                    children: icono ?? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CalendarIcon, {
                                        size: 22
                                    }, void 0, false, {
                                        fileName: "[project]/app/citas/estados/ModalBase.tsx",
                                        lineNumber: 347,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/citas/estados/ModalBase.tsx",
                                    lineNumber: 343,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "min-w-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "truncate text-lg font-bold leading-tight text-gray-900",
                                            children: titulo
                                        }, void 0, false, {
                                            fileName: "[project]/app/citas/estados/ModalBase.tsx",
                                            lineNumber: 352,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-0.5 text-[13px] text-gray-500",
                                            children: subtitulo
                                        }, void 0, false, {
                                            fileName: "[project]/app/citas/estados/ModalBase.tsx",
                                            lineNumber: 356,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/citas/estados/ModalBase.tsx",
                                    lineNumber: 351,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/citas/estados/ModalBase.tsx",
                            lineNumber: 342,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: onClose,
                            "aria-label": "Cerrar",
                            className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-gray-400 transition hover:bg-gray-100 hover:text-gray-700",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CloseIcon, {}, void 0, false, {
                                fileName: "[project]/app/citas/estados/ModalBase.tsx",
                                lineNumber: 368,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/citas/estados/ModalBase.tsx",
                            lineNumber: 362,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/citas/estados/ModalBase.tsx",
                    lineNumber: 341,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 space-y-5 overflow-y-auto bg-gray-50/60 px-5 py-5 sm:px-7 sm:py-6",
                    children: children
                }, void 0, false, {
                    fileName: "[project]/app/citas/estados/ModalBase.tsx",
                    lineNumber: 374,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                    className: "flex shrink-0 flex-wrap items-center justify-end gap-2.5 border-t border-gray-100 bg-white px-5 py-4 sm:px-7",
                    children: footer
                }, void 0, false, {
                    fileName: "[project]/app/citas/estados/ModalBase.tsx",
                    lineNumber: 380,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/citas/estados/ModalBase.tsx",
            lineNumber: 338,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/citas/estados/ModalBase.tsx",
        lineNumber: 327,
        columnNumber: 5
    }, this);
}
_s(ModalShell, "3ubReDTFssvu4DHeldAg55cW/CI=");
_c7 = ModalShell;
function Campo({ label, children, className = '' }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: className,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-[11px] font-semibold text-gray-400",
                children: label
            }, void 0, false, {
                fileName: "[project]/app/citas/estados/ModalBase.tsx",
                lineNumber: 403,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-0.5 text-sm font-semibold text-gray-800",
                children: children
            }, void 0, false, {
                fileName: "[project]/app/citas/estados/ModalBase.tsx",
                lineNumber: 407,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/citas/estados/ModalBase.tsx",
        lineNumber: 402,
        columnNumber: 5
    }, this);
}
_c8 = Campo;
function Tarjeta({ titulo, icono, derecha, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "rounded-2xl border border-gray-100 bg-white p-5 shadow-sm",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4 flex items-center justify-between gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex h-8 w-8 items-center justify-center rounded-lg bg-[#0d7a71]/10 text-[#0d7a71]",
                                children: icono
                            }, void 0, false, {
                                fileName: "[project]/app/citas/estados/ModalBase.tsx",
                                lineNumber: 429,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "text-sm font-bold text-gray-900",
                                children: titulo
                            }, void 0, false, {
                                fileName: "[project]/app/citas/estados/ModalBase.tsx",
                                lineNumber: 433,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/citas/estados/ModalBase.tsx",
                        lineNumber: 428,
                        columnNumber: 9
                    }, this),
                    derecha
                ]
            }, void 0, true, {
                fileName: "[project]/app/citas/estados/ModalBase.tsx",
                lineNumber: 427,
                columnNumber: 7
            }, this),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/app/citas/estados/ModalBase.tsx",
        lineNumber: 426,
        columnNumber: 5
    }, this);
}
_c9 = Tarjeta;
function Signo({ label, valor, unidad }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-xl border border-gray-100 bg-gray-50 px-3 py-2.5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-[11px] font-semibold text-gray-400",
                children: label
            }, void 0, false, {
                fileName: "[project]/app/citas/estados/ModalBase.tsx",
                lineNumber: 457,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-0.5 text-sm font-semibold text-gray-800",
                children: [
                    valor || '---',
                    ' ',
                    valor && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs font-medium text-gray-400",
                        children: unidad
                    }, void 0, false, {
                        fileName: "[project]/app/citas/estados/ModalBase.tsx",
                        lineNumber: 465,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/citas/estados/ModalBase.tsx",
                lineNumber: 461,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/citas/estados/ModalBase.tsx",
        lineNumber: 456,
        columnNumber: 5
    }, this);
}
_c10 = Signo;
function TarjetaPaciente({ cita, completo = false, modo = 'normal' }) {
    const soloPaciente = modo === 'soloPaciente';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tarjeta, {
        titulo: "Paciente",
        icono: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(UserIcon, {}, void 0, false, {
            fileName: "[project]/app/citas/estados/ModalBase.tsx",
            lineNumber: 509,
            columnNumber: 14
        }, this),
        derecha: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "rounded-lg bg-gray-100 px-2.5 py-1 text-[11px] font-bold text-gray-600",
            children: [
                "HC: ",
                cita.hc
            ]
        }, void 0, true, {
            fileName: "[project]/app/citas/estados/ModalBase.tsx",
            lineNumber: 511,
            columnNumber: 9
        }, this),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Campo, {
                    label: "Nombres y apellidos",
                    children: cita.paciente
                }, void 0, false, {
                    fileName: "[project]/app/citas/estados/ModalBase.tsx",
                    lineNumber: 519,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-2 gap-x-4 gap-y-3.5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Campo, {
                            label: "DNI",
                            children: cita.dni
                        }, void 0, false, {
                            fileName: "[project]/app/citas/estados/ModalBase.tsx",
                            lineNumber: 524,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Campo, {
                            label: "Celular",
                            children: cita.celular
                        }, void 0, false, {
                            fileName: "[project]/app/citas/estados/ModalBase.tsx",
                            lineNumber: 528,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Campo, {
                            label: "Sexo",
                            children: cita.sexo
                        }, void 0, false, {
                            fileName: "[project]/app/citas/estados/ModalBase.tsx",
                            lineNumber: 532,
                            columnNumber: 11
                        }, this),
                        !soloPaciente && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Campo, {
                            label: "Servicio",
                            children: cita.especialidad
                        }, void 0, false, {
                            fileName: "[project]/app/citas/estados/ModalBase.tsx",
                            lineNumber: 543,
                            columnNumber: 13
                        }, this),
                        !soloPaciente && completo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Campo, {
                                    label: "N° de cita",
                                    children: cita.id
                                }, void 0, false, {
                                    fileName: "[project]/app/citas/estados/ModalBase.tsx",
                                    lineNumber: 559,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Campo, {
                                    label: "Médico",
                                    children: cita.medico
                                }, void 0, false, {
                                    fileName: "[project]/app/citas/estados/ModalBase.tsx",
                                    lineNumber: 563,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Campo, {
                                    label: "Fecha",
                                    children: formatFecha(cita.fecha)
                                }, void 0, false, {
                                    fileName: "[project]/app/citas/estados/ModalBase.tsx",
                                    lineNumber: 567,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Campo, {
                                    label: "Hora",
                                    children: formatHora(cita.hora)
                                }, void 0, false, {
                                    fileName: "[project]/app/citas/estados/ModalBase.tsx",
                                    lineNumber: 571,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/citas/estados/ModalBase.tsx",
                            lineNumber: 558,
                            columnNumber: 13
                        }, this),
                        !soloPaciente && !completo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Campo, {
                                    label: "Fecha",
                                    children: formatFecha(cita.fecha)
                                }, void 0, false, {
                                    fileName: "[project]/app/citas/estados/ModalBase.tsx",
                                    lineNumber: 587,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Campo, {
                                    label: "Hora",
                                    children: formatHora(cita.hora)
                                }, void 0, false, {
                                    fileName: "[project]/app/citas/estados/ModalBase.tsx",
                                    lineNumber: 591,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/citas/estados/ModalBase.tsx",
                            lineNumber: 586,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/citas/estados/ModalBase.tsx",
                    lineNumber: 523,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/citas/estados/ModalBase.tsx",
            lineNumber: 516,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/citas/estados/ModalBase.tsx",
        lineNumber: 507,
        columnNumber: 5
    }, this);
}
_c11 = TarjetaPaciente;
function TarjetaTriaje({ triaje, titulo = 'Triaje' }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tarjeta, {
        titulo: titulo,
        icono: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PulseIcon, {}, void 0, false, {
            fileName: "[project]/app/citas/estados/ModalBase.tsx",
            lineNumber: 616,
            columnNumber: 14
        }, this),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-2 gap-2.5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Signo, {
                            label: "P. arterial",
                            valor: triaje.presionArterial,
                            unidad: "mmHg"
                        }, void 0, false, {
                            fileName: "[project]/app/citas/estados/ModalBase.tsx",
                            lineNumber: 620,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Signo, {
                            label: "F. cardiaca",
                            valor: triaje.frecuenciaCardiaca,
                            unidad: "lpm"
                        }, void 0, false, {
                            fileName: "[project]/app/citas/estados/ModalBase.tsx",
                            lineNumber: 626,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Signo, {
                            label: "F. respiratoria",
                            valor: triaje.frecuenciaRespiratoria,
                            unidad: "rpm"
                        }, void 0, false, {
                            fileName: "[project]/app/citas/estados/ModalBase.tsx",
                            lineNumber: 632,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Signo, {
                            label: "Temperatura",
                            valor: triaje.temperatura,
                            unidad: "°C"
                        }, void 0, false, {
                            fileName: "[project]/app/citas/estados/ModalBase.tsx",
                            lineNumber: 638,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Signo, {
                            label: "SpO₂",
                            valor: triaje.saturacion,
                            unidad: "%"
                        }, void 0, false, {
                            fileName: "[project]/app/citas/estados/ModalBase.tsx",
                            lineNumber: 644,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Signo, {
                            label: "Peso / Talla",
                            valor: triaje.peso || triaje.talla ? `${triaje.peso}/${triaje.talla}` : '',
                            unidad: "kg/cm"
                        }, void 0, false, {
                            fileName: "[project]/app/citas/estados/ModalBase.tsx",
                            lineNumber: 650,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/citas/estados/ModalBase.tsx",
                    lineNumber: 619,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Campo, {
                    label: "Motivo de consulta",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-medium text-gray-700",
                        children: triaje.motivoConsulta || '---'
                    }, void 0, false, {
                        fileName: "[project]/app/citas/estados/ModalBase.tsx",
                        lineNumber: 662,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/citas/estados/ModalBase.tsx",
                    lineNumber: 661,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/citas/estados/ModalBase.tsx",
            lineNumber: 618,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/citas/estados/ModalBase.tsx",
        lineNumber: 614,
        columnNumber: 5
    }, this);
}
_c12 = TarjetaTriaje;
function TriajeFormulario({ cita, form, onChange }) {
    const peso = parseFloat(form.peso);
    const tallaM = parseFloat(form.talla) / 100;
    const imc = peso > 0 && tallaM > 0 ? (peso / (tallaM * tallaM)).toFixed(1) : null;
    const campo = (name, label, placeholder, extra = {})=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                    htmlFor: name,
                    className: labelClass,
                    children: [
                        label,
                        extra.required && ' *'
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/citas/estados/ModalBase.tsx",
                    lineNumber: 715,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    id: name,
                    name: name,
                    value: form[name],
                    onChange: onChange,
                    placeholder: placeholder,
                    className: inputClass,
                    ...extra
                }, void 0, false, {
                    fileName: "[project]/app/citas/estados/ModalBase.tsx",
                    lineNumber: 724,
                    columnNumber: 7
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/citas/estados/ModalBase.tsx",
            lineNumber: 714,
            columnNumber: 5
        }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid grid-cols-1 gap-5 md:grid-cols-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TarjetaPaciente, {
                        cita: cita
                    }, void 0, false, {
                        fileName: "[project]/app/citas/estados/ModalBase.tsx",
                        lineNumber: 739,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tarjeta, {
                        titulo: "Motivo de consulta",
                        icono: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DocIcon, {}, void 0, false, {
                            fileName: "[project]/app/citas/estados/ModalBase.tsx",
                            lineNumber: 745,
                            columnNumber: 18
                        }, this),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: "motivoConsulta",
                                className: "sr-only",
                                children: "Motivo de consulta"
                            }, void 0, false, {
                                fileName: "[project]/app/citas/estados/ModalBase.tsx",
                                lineNumber: 747,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                id: "motivoConsulta",
                                name: "motivoConsulta",
                                required: true,
                                rows: 4,
                                value: form.motivoConsulta,
                                onChange: onChange,
                                placeholder: "Describa por qué acude el paciente",
                                className: textareaClass
                            }, void 0, false, {
                                fileName: "[project]/app/citas/estados/ModalBase.tsx",
                                lineNumber: 754,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/citas/estados/ModalBase.tsx",
                        lineNumber: 743,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/citas/estados/ModalBase.tsx",
                lineNumber: 738,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tarjeta, {
                titulo: "Signos vitales",
                icono: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PulseIcon, {}, void 0, false, {
                    fileName: "[project]/app/citas/estados/ModalBase.tsx",
                    lineNumber: 769,
                    columnNumber: 16
                }, this),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-2 gap-x-4 gap-y-3.5",
                    children: [
                        campo('presionArterial', 'Presión arterial', '120/80 mmHg', {
                            required: true
                        }),
                        campo('frecuenciaCardiaca', 'Frec. cardiaca', '80 lpm', {
                            type: 'number',
                            inputMode: 'numeric',
                            required: true
                        }),
                        campo('frecuenciaRespiratoria', 'Frec. respiratoria', '18 rpm', {
                            type: 'number',
                            inputMode: 'numeric'
                        }),
                        campo('temperatura', 'Temperatura (°C)', '36.5', {
                            type: 'number',
                            step: '0.1',
                            inputMode: 'decimal',
                            required: true
                        }),
                        campo('saturacion', 'Saturación O₂ (%)', '98', {
                            type: 'number',
                            inputMode: 'numeric'
                        }),
                        campo('peso', 'Peso (kg)', '70', {
                            type: 'number',
                            step: '0.1',
                            inputMode: 'decimal'
                        }),
                        campo('talla', 'Talla (cm)', '170', {
                            type: 'number',
                            inputMode: 'numeric'
                        }),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col justify-end",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: labelClass,
                                    children: "IMC calculado"
                                }, void 0, false, {
                                    fileName: "[project]/app/citas/estados/ModalBase.tsx",
                                    lineNumber: 846,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex h-10 items-center rounded-xl border border-gray-100 bg-gray-50 px-3 text-sm font-bold text-gray-600",
                                    children: imc ?? '---'
                                }, void 0, false, {
                                    fileName: "[project]/app/citas/estados/ModalBase.tsx",
                                    lineNumber: 850,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/citas/estados/ModalBase.tsx",
                            lineNumber: 845,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/citas/estados/ModalBase.tsx",
                    lineNumber: 771,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/citas/estados/ModalBase.tsx",
                lineNumber: 767,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/citas/estados/ModalBase.tsx",
        lineNumber: 737,
        columnNumber: 5
    }, this);
}
_c13 = TriajeFormulario;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11, _c12, _c13;
__turbopack_context__.k.register(_c, "CalendarIcon");
__turbopack_context__.k.register(_c1, "PulseIcon");
__turbopack_context__.k.register(_c2, "DocIcon");
__turbopack_context__.k.register(_c3, "UserIcon");
__turbopack_context__.k.register(_c4, "AlertIcon");
__turbopack_context__.k.register(_c5, "CloseIcon");
__turbopack_context__.k.register(_c6, "EstadoBadge");
__turbopack_context__.k.register(_c7, "ModalShell");
__turbopack_context__.k.register(_c8, "Campo");
__turbopack_context__.k.register(_c9, "Tarjeta");
__turbopack_context__.k.register(_c10, "Signo");
__turbopack_context__.k.register(_c11, "TarjetaPaciente");
__turbopack_context__.k.register(_c12, "TarjetaTriaje");
__turbopack_context__.k.register(_c13, "TriajeFormulario");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/citas/estados/ModalCitaAtendida.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ModalCitaAtendida
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/citas/estados/ModalBase.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
/* =========================================================
   DATOS DE EJEMPLO
   Simulan lo registrado en los estados anteriores.
   Con el backend, el padre pasa los datos reales.
========================================================= */ const TRIAJE_EJEMPLO = {
    presionArterial: '120/80',
    frecuenciaCardiaca: '78',
    frecuenciaRespiratoria: '18',
    temperatura: '36.8',
    saturacion: '98',
    peso: '72',
    talla: '170',
    motivoConsulta: 'Dolor de cabeza intenso desde hace dos días, acompañado de malestar general.'
};
const DIAGNOSTICO_EJEMPLO = {
    sintomas: 'Cefalea de intensidad moderada desde hace dos días, sin fiebre. Refiere cansancio y poco apetito.',
    diagnostico: 'Cefalea tensional',
    indicaciones: 'Paracetamol 500 mg cada 8 horas por 3 días. Reposo, hidratación y control en una semana si persiste.',
    requiereLaboratorio: true,
    examenesLaboratorio: 'Hemograma completo, examen de orina'
};
const inputInline = 'w-full min-w-0 bg-transparent text-sm font-semibold text-gray-800 outline-none placeholder:font-normal placeholder:text-gray-300';
const casillaEdit = 'block rounded-xl border border-[#0d7a71]/25 bg-white px-3 py-2.5 transition focus-within:border-[#0d7a71] focus-within:ring-2 focus-within:ring-[#0d7a71]/15';
const labelCasilla = 'text-[11px] font-semibold text-gray-400';
const btnIcono = 'flex h-8 w-8 items-center justify-center rounded-lg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0d7a71]/40';
/* =========================================================
   ÍCONOS
========================================================= */ const iconProps = (size)=>({
        width: size,
        height: size,
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
    });
const EditIcon = ({ size = 16 })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        ...iconProps(size),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M12 20h9"
            }, void 0, false, {
                fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                lineNumber: 120,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"
            }, void 0, false, {
                fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                lineNumber: 121,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
        lineNumber: 119,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c = EditIcon;
const CheckIcon = ({ size = 16 })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        ...iconProps(size),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "m5 12 5 5L20 7"
        }, void 0, false, {
            fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
            lineNumber: 127,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
        lineNumber: 126,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c1 = CheckIcon;
const CheckCircleIcon = ({ size = 16 })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        ...iconProps(size),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "12",
                cy: "12",
                r: "9"
            }, void 0, false, {
                fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                lineNumber: 133,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "m8 12.5 2.8 2.8L16 10"
            }, void 0, false, {
                fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                lineNumber: 134,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
        lineNumber: 132,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c2 = CheckCircleIcon;
const XIcon = ({ size = 16 })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        ...iconProps(size),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M6 18 18 6M6 6l12 12"
        }, void 0, false, {
            fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
            lineNumber: 140,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
        lineNumber: 139,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c3 = XIcon;
const ClipboardIcon = ({ size = 16 })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        ...iconProps(size),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M9 3h6v3H9z"
            }, void 0, false, {
                fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                lineNumber: 146,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M9 4.5H7a2 2 0 0 0-2 2V19a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6.5a2 2 0 0 0-2-2h-2"
            }, void 0, false, {
                fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                lineNumber: 147,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M9 12h6M9 16h4"
            }, void 0, false, {
                fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                lineNumber: 148,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
        lineNumber: 145,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c4 = ClipboardIcon;
const PillIcon = ({ size = 16 })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        ...iconProps(size),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M10.5 20.5a4.95 4.95 0 0 1-7-7l10-10a4.95 4.95 0 0 1 7 7z"
            }, void 0, false, {
                fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                lineNumber: 154,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "m8.5 8.5 7 7"
            }, void 0, false, {
                fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                lineNumber: 155,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
        lineNumber: 153,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c5 = PillIcon;
const FlaskIcon = ({ size = 16 })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        ...iconProps(size),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M9 3h6M10 3v6L4.5 19a1.5 1.5 0 0 0 1.3 2.2h12.4a1.5 1.5 0 0 0 1.3-2.2L14 9V3"
            }, void 0, false, {
                fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                lineNumber: 161,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M7.5 15h9"
            }, void 0, false, {
                fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                lineNumber: 162,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
        lineNumber: 160,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c6 = FlaskIcon;
/* =========================================================
   ACCIONES DE CADA TARJETA
   Lápiz en lectura; ✕ y ✓ en edición.
========================================================= */ function Acciones({ editando, bloqueado, guardando, formId, etiqueta, onEditar, onCancelar }) {
    if (editando) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-1.5",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    onClick: onCancelar,
                    disabled: guardando,
                    "aria-label": "Cancelar edición",
                    title: "Cancelar",
                    className: `${btnIcono} text-gray-400 hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50`,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(XIcon, {}, void 0, false, {
                        fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                        lineNumber: 199,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                    lineNumber: 191,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "submit",
                    form: formId,
                    disabled: guardando,
                    "aria-label": "Guardar cambios",
                    title: "Guardar",
                    className: `${btnIcono} bg-[#0d7a71] text-white shadow-sm shadow-[#0d7a71]/25 hover:bg-[#0a625b] disabled:cursor-not-allowed disabled:opacity-60`,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CheckIcon, {}, void 0, false, {
                        fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                        lineNumber: 210,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                    lineNumber: 202,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
            lineNumber: 190,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: onEditar,
        disabled: bloqueado,
        "aria-label": `Editar ${etiqueta}`,
        title: bloqueado ? 'Guarde o cancele la edición en curso' : `Editar ${etiqueta}`,
        className: `${btnIcono} text-gray-400 hover:bg-[#0d7a71]/10 hover:text-[#0d7a71] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-gray-400`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EditIcon, {}, void 0, false, {
            fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
            lineNumber: 225,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
        lineNumber: 217,
        columnNumber: 5
    }, this);
}
_c7 = Acciones;
function ModalCitaAtendida({ cita = __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CITA_EJEMPLO"], triaje = TRIAJE_EJEMPLO, diagnostico = DIAGNOSTICO_EJEMPLO, examenesCatalogo = [], examenIdsActuales = [], onClose, onVolver, onGuardarTriaje, onGuardarDiagnostico }) {
    _s();
    /* Datos que se muestran (se actualizan al guardar) */ const [triajeActual, setTriajeActual] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(triaje);
    const [diagActual, setDiagActual] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(diagnostico);
    const [examenesActuales, setExamenesActuales] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(examenIdsActuales);
    /* Borradores mientras se edita */ const [triajeForm, setTriajeForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(triaje);
    const [diagForm, setDiagForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(diagnostico);
    const [examenesSeleccionados, setExamenesSeleccionados] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(examenIdsActuales);
    const [busquedaExamen, setBusquedaExamen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    /* Qué tarjeta se está editando (solo una a la vez) */ const [editando, setEditando] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    /* Guardando/error por grupo: el triaje tiene su propio formulario; las
     otras 4 tarjetas comparten el mismo guardarDiagnostico */ const [guardandoTriaje, setGuardandoTriaje] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [errorTriaje, setErrorTriaje] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [guardandoDiag, setGuardandoDiag] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [errorDiag, setErrorDiag] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const empezar = (seccion)=>{
        setTriajeForm(triajeActual);
        setDiagForm(diagActual);
        setExamenesSeleccionados(examenesActuales);
        setBusquedaExamen('');
        setErrorTriaje('');
        setErrorDiag('');
        setEditando(seccion);
    };
    const cancelar = ()=>{
        setErrorTriaje('');
        setErrorDiag('');
        setEditando(null);
    };
    const handleTriajeChange = (e)=>{
        const { name, value } = e.target;
        setTriajeForm((prev)=>({
                ...prev,
                [name]: value
            }));
    };
    const handleDiagChange = (e)=>{
        const { name, value } = e.target;
        setDiagForm((prev)=>({
                ...prev,
                [name]: value
            }));
    };
    const toggleExamen = (id)=>{
        setExamenesSeleccionados((prev)=>prev.includes(id) ? prev.filter((x)=>x !== id) : [
                ...prev,
                id
            ]);
    };
    const examenesFiltrados = busquedaExamen.trim() ? examenesCatalogo.filter((ex)=>ex.nombre.toLowerCase().includes(busquedaExamen.trim().toLowerCase())) : examenesCatalogo;
    const examenesPorCategoria = examenesFiltrados.reduce((grupos, ex)=>{
        (grupos[ex.categoria] ??= []).push(ex);
        return grupos;
    }, {});
    const guardarTriaje = async (e)=>{
        e.preventDefault();
        if (!onGuardarTriaje) {
            setEditando(null);
            return;
        }
        setErrorTriaje('');
        setGuardandoTriaje(true);
        try {
            await onGuardarTriaje(triajeForm);
            setTriajeActual(triajeForm);
            setEditando(null);
        } catch (err) {
            setErrorTriaje(err instanceof Error ? err.message : 'No se pudo guardar el triaje.');
        } finally{
            setGuardandoTriaje(false);
        }
    };
    const guardarDiagnostico = async (e)=>{
        e.preventDefault();
        if (!onGuardarDiagnostico) {
            setEditando(null);
            return;
        }
        const idsFinales = diagForm.requiereLaboratorio ? examenesSeleccionados : [];
        setErrorDiag('');
        setGuardandoDiag(true);
        try {
            await onGuardarDiagnostico({
                sintomas: diagForm.sintomas,
                diagnostico: diagForm.diagnostico,
                indicaciones: diagForm.indicaciones,
                examenIds: idsFinales
            });
            const nombresFinales = examenesCatalogo.filter((ex)=>idsFinales.includes(ex.id)).map((ex)=>ex.nombre).join(', ');
            setDiagActual({
                ...diagForm,
                examenesLaboratorio: diagForm.requiereLaboratorio ? nombresFinales : ''
            });
            setExamenesActuales(idsFinales);
            setEditando(null);
        } catch (err) {
            setErrorDiag(err instanceof Error ? err.message : 'No se pudo guardar el diagnóstico.');
        } finally{
            setGuardandoDiag(false);
        }
    };
    const hayEdicion = editando !== null;
    /* Acciones comunes de cada tarjeta */ const acciones = (seccion, etiqueta)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Acciones, {
            editando: editando === seccion,
            bloqueado: hayEdicion,
            guardando: seccion === 'triaje' ? guardandoTriaje : guardandoDiag,
            formId: `form-${seccion}`,
            etiqueta: etiqueta,
            onEditar: ()=>empezar(seccion),
            onCancelar: cancelar
        }, void 0, false, {
            fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
            lineNumber: 372,
            columnNumber: 5
        }, this);
    /* Casilla editable del triaje */ const casilla = (name, label, placeholder, unidad, extra = {})=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            htmlFor: `edit-${name}`,
            className: casillaEdit,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: labelCasilla,
                    children: [
                        label,
                        extra.required && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-red-500",
                            children: " *"
                        }, void 0, false, {
                            fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                            lineNumber: 399,
                            columnNumber: 28
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                    lineNumber: 397,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-0.5 flex items-center gap-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            id: `edit-${name}`,
                            name: name,
                            value: triajeForm[name],
                            onChange: handleTriajeChange,
                            placeholder: placeholder,
                            className: inputInline,
                            ...extra
                        }, void 0, false, {
                            fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                            lineNumber: 403,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "shrink-0 text-xs font-medium text-gray-400",
                            children: unidad
                        }, void 0, false, {
                            fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                            lineNumber: 413,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                    lineNumber: 402,
                    columnNumber: 7
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
            lineNumber: 396,
            columnNumber: 5
        }, this);
    /* Texto largo en modo lectura */ const texto = (valor)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "whitespace-pre-line text-sm leading-6 text-gray-700",
            children: valor || '---'
        }, void 0, false, {
            fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
            lineNumber: 422,
            columnNumber: 5
        }, this);
    /* Exámenes de laboratorio como etiquetas */ const examenes = diagActual.examenesLaboratorio.split(/[,\n]/).map((x)=>x.trim()).filter(Boolean);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalShell"], {
        titulo: "Resumen de la atención",
        subtitulo: "Triaje, diagnóstico y tratamiento registrados",
        tono: "blue",
        icono: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CheckCircleIcon, {
            size: 22
        }, void 0, false, {
            fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
            lineNumber: 438,
            columnNumber: 14
        }, this),
        onClose: onClose,
        footer: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                onVolver && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    onClick: onVolver,
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["btnSecondary"],
                    children: "Volver"
                }, void 0, false, {
                    fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                    lineNumber: 443,
                    columnNumber: 13
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    onClick: onClose,
                    className: onVolver ? __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["btnPrimary"] : __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["btnSecondary"],
                    children: "Cerrar"
                }, void 0, false, {
                    fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                    lineNumber: 447,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
            lineNumber: 441,
            columnNumber: 9
        }, this),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tarjeta"], {
                titulo: "Paciente",
                icono: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserIcon"], {}, void 0, false, {
                    fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                    lineNumber: 463,
                    columnNumber: 16
                }, this),
                derecha: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "rounded-lg bg-gray-100 px-2.5 py-1 text-[11px] font-bold text-gray-600",
                    children: [
                        "HC: ",
                        cita.hc
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                    lineNumber: 465,
                    columnNumber: 11
                }, this),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-base font-bold leading-tight text-gray-900",
                            children: cita.paciente
                        }, void 0, false, {
                            fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                            lineNumber: 471,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-2 gap-x-4 gap-y-3.5 border-t border-gray-100 pt-4 md:grid-cols-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Campo"], {
                                    label: "DNI",
                                    children: cita.dni
                                }, void 0, false, {
                                    fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                                    lineNumber: 476,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Campo"], {
                                    label: "Celular",
                                    children: cita.celular
                                }, void 0, false, {
                                    fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                                    lineNumber: 477,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Campo"], {
                                    label: "Sexo",
                                    children: cita.sexo
                                }, void 0, false, {
                                    fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                                    lineNumber: 478,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Campo"], {
                                    label: "Servicio",
                                    children: cita.especialidad
                                }, void 0, false, {
                                    fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                                    lineNumber: 479,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Campo"], {
                                    label: "N° de cita",
                                    children: cita.id
                                }, void 0, false, {
                                    fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                                    lineNumber: 481,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Campo"], {
                                    label: "Médico",
                                    children: cita.medico
                                }, void 0, false, {
                                    fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                                    lineNumber: 482,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Campo"], {
                                    label: "Fecha",
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatFecha"])(cita.fecha)
                                }, void 0, false, {
                                    fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                                    lineNumber: 483,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Campo"], {
                                    label: "Hora",
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatHora"])(cita.hora)
                                }, void 0, false, {
                                    fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                                    lineNumber: 484,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                            lineNumber: 475,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                    lineNumber: 470,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                lineNumber: 461,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 items-start gap-5 md:grid-cols-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tarjeta"], {
                        titulo: "Triaje registrado",
                        icono: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PulseIcon"], {}, void 0, false, {
                            fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                            lineNumber: 497,
                            columnNumber: 18
                        }, this),
                        derecha: acciones('triaje', 'triaje'),
                        children: editando === 'triaje' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            id: "form-triaje",
                            onSubmit: guardarTriaje,
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 gap-2.5",
                                    children: [
                                        casilla('presionArterial', 'P. arterial', '120/80', 'mmHg', {
                                            required: true
                                        }),
                                        casilla('frecuenciaCardiaca', 'F. cardiaca', '80', 'lpm', {
                                            type: 'number',
                                            inputMode: 'numeric',
                                            required: true
                                        }),
                                        casilla('frecuenciaRespiratoria', 'F. respiratoria', '18', 'rpm', {
                                            type: 'number',
                                            inputMode: 'numeric'
                                        }),
                                        casilla('temperatura', 'Temperatura', '36.5', '°C', {
                                            type: 'number',
                                            step: '0.1',
                                            inputMode: 'decimal',
                                            required: true
                                        }),
                                        casilla('saturacion', 'SpO₂', '98', '%', {
                                            type: 'number',
                                            inputMode: 'numeric'
                                        }),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: casillaEdit,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: labelCasilla,
                                                    children: "Peso / Talla"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                                                    lineNumber: 536,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-0.5 flex items-center gap-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            name: "peso",
                                                            type: "number",
                                                            step: "0.1",
                                                            inputMode: "decimal",
                                                            "aria-label": "Peso en kg",
                                                            value: triajeForm.peso,
                                                            onChange: handleTriajeChange,
                                                            placeholder: "70",
                                                            className: inputInline
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                                                            lineNumber: 539,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-gray-300",
                                                            children: "/"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                                                            lineNumber: 551,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            name: "talla",
                                                            type: "number",
                                                            inputMode: "numeric",
                                                            "aria-label": "Talla en cm",
                                                            value: triajeForm.talla,
                                                            onChange: handleTriajeChange,
                                                            placeholder: "170",
                                                            className: inputInline
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                                                            lineNumber: 553,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "shrink-0 text-xs font-medium text-gray-400",
                                                            children: "kg/cm"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                                                            lineNumber: 564,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                                                    lineNumber: 538,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                                            lineNumber: 535,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                                    lineNumber: 506,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "edit-motivoConsulta",
                                            className: labelCasilla,
                                            children: "Motivo de consulta"
                                        }, void 0, false, {
                                            fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                                            lineNumber: 572,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                            id: "edit-motivoConsulta",
                                            name: "motivoConsulta",
                                            rows: 3,
                                            value: triajeForm.motivoConsulta,
                                            onChange: handleTriajeChange,
                                            placeholder: "Describa por qué acude el paciente",
                                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["textareaClass"]} mt-1`
                                        }, void 0, false, {
                                            fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                                            lineNumber: 576,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                                    lineNumber: 571,
                                    columnNumber: 15
                                }, this),
                                errorTriaje && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs font-semibold text-red-600",
                                    children: errorTriaje
                                }, void 0, false, {
                                    fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                                    lineNumber: 588,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                            lineNumber: 501,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 gap-2.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Signo"], {
                                            label: "P. arterial",
                                            valor: triajeActual.presionArterial,
                                            unidad: "mmHg"
                                        }, void 0, false, {
                                            fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                                            lineNumber: 594,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Signo"], {
                                            label: "F. cardiaca",
                                            valor: triajeActual.frecuenciaCardiaca,
                                            unidad: "lpm"
                                        }, void 0, false, {
                                            fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                                            lineNumber: 595,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Signo"], {
                                            label: "F. respiratoria",
                                            valor: triajeActual.frecuenciaRespiratoria,
                                            unidad: "rpm"
                                        }, void 0, false, {
                                            fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                                            lineNumber: 596,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Signo"], {
                                            label: "Temperatura",
                                            valor: triajeActual.temperatura,
                                            unidad: "°C"
                                        }, void 0, false, {
                                            fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                                            lineNumber: 597,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Signo"], {
                                            label: "SpO₂",
                                            valor: triajeActual.saturacion,
                                            unidad: "%"
                                        }, void 0, false, {
                                            fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                                            lineNumber: 598,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Signo"], {
                                            label: "Peso / Talla",
                                            valor: triajeActual.peso || triajeActual.talla ? `${triajeActual.peso}/${triajeActual.talla}` : '',
                                            unidad: "kg/cm"
                                        }, void 0, false, {
                                            fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                                            lineNumber: 599,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                                    lineNumber: 593,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "border-t border-gray-100 pt-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Campo"], {
                                        label: "Motivo de consulta",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-medium text-gray-700",
                                            children: triajeActual.motivoConsulta || '---'
                                        }, void 0, false, {
                                            fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                                            lineNumber: 612,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                                        lineNumber: 611,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                                    lineNumber: 610,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                            lineNumber: 592,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                        lineNumber: 495,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tarjeta"], {
                                titulo: "Síntomas",
                                icono: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ClipboardIcon, {}, void 0, false, {
                                    fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                                    lineNumber: 626,
                                    columnNumber: 20
                                }, this),
                                derecha: acciones('sintomas', 'síntomas'),
                                children: editando === 'sintomas' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                    id: "form-sintomas",
                                    onSubmit: guardarDiagnostico,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "sintomas",
                                            className: "sr-only",
                                            children: "Síntomas"
                                        }, void 0, false, {
                                            fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                                            lineNumber: 631,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                            id: "sintomas",
                                            name: "sintomas",
                                            required: true,
                                            rows: 4,
                                            value: diagForm.sintomas,
                                            onChange: handleDiagChange,
                                            placeholder: "Inicio, duración e intensidad",
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["textareaClass"]
                                        }, void 0, false, {
                                            fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                                            lineNumber: 635,
                                            columnNumber: 17
                                        }, this),
                                        errorDiag && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-2 text-xs font-semibold text-red-600",
                                            children: errorDiag
                                        }, void 0, false, {
                                            fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                                            lineNumber: 647,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                                    lineNumber: 630,
                                    columnNumber: 15
                                }, this) : texto(diagActual.sintomas)
                            }, void 0, false, {
                                fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                                lineNumber: 624,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tarjeta"], {
                                titulo: "Diagnóstico médico",
                                icono: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DocIcon"], {}, void 0, false, {
                                    fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                                    lineNumber: 658,
                                    columnNumber: 20
                                }, this),
                                derecha: acciones('diagnostico', 'diagnóstico'),
                                children: editando === 'diagnostico' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                    id: "form-diagnostico",
                                    onSubmit: guardarDiagnostico,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "diagnostico",
                                            className: "sr-only",
                                            children: "Diagnóstico"
                                        }, void 0, false, {
                                            fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                                            lineNumber: 663,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                            id: "diagnostico",
                                            name: "diagnostico",
                                            required: true,
                                            rows: 3,
                                            value: diagForm.diagnostico,
                                            onChange: handleDiagChange,
                                            placeholder: "Describa el diagnóstico",
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["textareaClass"]
                                        }, void 0, false, {
                                            fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                                            lineNumber: 667,
                                            columnNumber: 17
                                        }, this),
                                        errorDiag && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-2 text-xs font-semibold text-red-600",
                                            children: errorDiag
                                        }, void 0, false, {
                                            fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                                            lineNumber: 679,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                                    lineNumber: 662,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "whitespace-pre-line text-base font-semibold leading-6 text-gray-900",
                                    children: diagActual.diagnostico || '---'
                                }, void 0, false, {
                                    fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                                    lineNumber: 683,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                                lineNumber: 656,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tarjeta"], {
                                titulo: "Indicaciones y tratamiento",
                                icono: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PillIcon, {}, void 0, false, {
                                    fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                                    lineNumber: 692,
                                    columnNumber: 20
                                }, this),
                                derecha: acciones('indicaciones', 'indicaciones'),
                                children: editando === 'indicaciones' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                    id: "form-indicaciones",
                                    onSubmit: guardarDiagnostico,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "indicaciones",
                                            className: "sr-only",
                                            children: "Indicaciones y tratamiento"
                                        }, void 0, false, {
                                            fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                                            lineNumber: 697,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                            id: "indicaciones",
                                            name: "indicaciones",
                                            rows: 4,
                                            value: diagForm.indicaciones,
                                            onChange: handleDiagChange,
                                            placeholder: "Medicamentos, dosis y recomendaciones",
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["textareaClass"]
                                        }, void 0, false, {
                                            fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                                            lineNumber: 701,
                                            columnNumber: 17
                                        }, this),
                                        errorDiag && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-2 text-xs font-semibold text-red-600",
                                            children: errorDiag
                                        }, void 0, false, {
                                            fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                                            lineNumber: 712,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                                    lineNumber: 696,
                                    columnNumber: 15
                                }, this) : texto(diagActual.indicaciones)
                            }, void 0, false, {
                                fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                                lineNumber: 690,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tarjeta"], {
                                titulo: "Orden de laboratorio",
                                icono: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FlaskIcon, {}, void 0, false, {
                                    fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                                    lineNumber: 723,
                                    columnNumber: 20
                                }, this),
                                derecha: acciones('laboratorio', 'orden de laboratorio'),
                                children: editando === 'laboratorio' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                    id: "form-laboratorio",
                                    onSubmit: guardarDiagnostico,
                                    className: "space-y-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: `flex cursor-pointer items-center justify-between gap-3 rounded-xl border px-4 py-3 transition ${diagForm.requiereLaboratorio ? 'border-[#0d7a71]/30 bg-[#0d7a71]/5' : 'border-gray-200 bg-white hover:bg-gray-50'}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm font-semibold text-gray-800",
                                                    children: "Requiere exámenes de laboratorio"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                                                    lineNumber: 739,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "checkbox",
                                                    checked: diagForm.requiereLaboratorio,
                                                    onChange: (e)=>setDiagForm((prev)=>({
                                                                ...prev,
                                                                requiereLaboratorio: e.target.checked
                                                            })),
                                                    className: "h-5 w-5 shrink-0 rounded border-gray-300 accent-[#0d7a71]"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                                                    lineNumber: 743,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                                            lineNumber: 732,
                                            columnNumber: 17
                                        }, this),
                                        diagForm.requiereLaboratorio && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    value: busquedaExamen,
                                                    onChange: (e)=>setBusquedaExamen(e.target.value),
                                                    placeholder: "Buscar examen...",
                                                    className: "h-10 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/15"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                                                    lineNumber: 758,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "max-h-56 space-y-3 overflow-y-auto rounded-xl border border-gray-200 p-3",
                                                    children: Object.keys(examenesPorCategoria).length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-center text-xs text-gray-400",
                                                        children: examenesCatalogo.length === 0 ? 'Cargando catálogo...' : 'Sin resultados.'
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                                                        lineNumber: 768,
                                                        columnNumber: 25
                                                    }, this) : Object.entries(examenesPorCategoria).map(([categoria, examenesCat])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "mb-1 text-[11px] font-semibold uppercase tracking-wide text-gray-400",
                                                                    children: categoria
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                                                                    lineNumber: 774,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "space-y-1",
                                                                    children: examenesCat.map((ex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                            className: "flex cursor-pointer items-center gap-2 rounded-lg px-1.5 py-1 text-sm text-gray-700 hover:bg-gray-50",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                    type: "checkbox",
                                                                                    checked: examenesSeleccionados.includes(ex.id),
                                                                                    onChange: ()=>toggleExamen(ex.id),
                                                                                    className: "h-3.5 w-3.5 rounded border-gray-300 accent-[#0d7a71]"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                                                                                    lineNumber: 783,
                                                                                    columnNumber: 35
                                                                                }, this),
                                                                                ex.nombre
                                                                            ]
                                                                        }, ex.id, true, {
                                                                            fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                                                                            lineNumber: 779,
                                                                            columnNumber: 33
                                                                        }, this))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                                                                    lineNumber: 777,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, categoria, true, {
                                                            fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                                                            lineNumber: 773,
                                                            columnNumber: 27
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                                                    lineNumber: 766,
                                                    columnNumber: 21
                                                }, this),
                                                examenesSeleccionados.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs font-medium text-gray-500",
                                                    children: [
                                                        examenesSeleccionados.length,
                                                        " examen(es) seleccionado(s)"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                                                    lineNumber: 799,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                                            lineNumber: 757,
                                            columnNumber: 19
                                        }, this),
                                        errorDiag && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs font-semibold text-red-600",
                                            children: errorDiag
                                        }, void 0, false, {
                                            fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                                            lineNumber: 807,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                                    lineNumber: 727,
                                    columnNumber: 15
                                }, this) : diagActual.requiereLaboratorio && examenes.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap gap-2",
                                    children: examenes.map((examen)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "rounded-lg bg-[#0d7a71]/10 px-2.5 py-1 text-xs font-semibold text-[#0d7a71]",
                                            children: examen
                                        }, examen, false, {
                                            fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                                            lineNumber: 813,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                                    lineNumber: 811,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-gray-400",
                                    children: "No se solicitaron exámenes de laboratorio."
                                }, void 0, false, {
                                    fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                                    lineNumber: 822,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                                lineNumber: 721,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                        lineNumber: 622,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
                lineNumber: 493,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/citas/estados/ModalCitaAtendida.tsx",
        lineNumber: 434,
        columnNumber: 5
    }, this);
}
_s(ModalCitaAtendida, "KE7AHlV52yv+4ngfQUyoWGHIH10=");
_c8 = ModalCitaAtendida;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8;
__turbopack_context__.k.register(_c, "EditIcon");
__turbopack_context__.k.register(_c1, "CheckIcon");
__turbopack_context__.k.register(_c2, "CheckCircleIcon");
__turbopack_context__.k.register(_c3, "XIcon");
__turbopack_context__.k.register(_c4, "ClipboardIcon");
__turbopack_context__.k.register(_c5, "PillIcon");
__turbopack_context__.k.register(_c6, "FlaskIcon");
__turbopack_context__.k.register(_c7, "Acciones");
__turbopack_context__.k.register(_c8, "ModalCitaAtendida");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/citas/estados/ModalCitaCancelada.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ModalCitaCancelada
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/citas/estados/ModalBase.tsx [app-client] (ecmascript)");
'use client';
;
;
function ModalCitaCancelada({ cita = __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CITA_EJEMPLO"], onClose }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalShell"], {
        titulo: "Cancelada",
        subtitulo: "La cita ha sido cancelada y no continuará con el proceso de atención",
        tono: "gray",
        icono: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertIcon"], {
            size: 22
        }, void 0, false, {
            fileName: "[project]/app/citas/estados/ModalCitaCancelada.tsx",
            lineNumber: 35,
            columnNumber: 14
        }, this),
        onClose: onClose,
        footer: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            onClick: onClose,
            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["btnPrimary"],
            children: "Cerrar"
        }, void 0, false, {
            fileName: "[project]/app/citas/estados/ModalCitaCancelada.tsx",
            lineNumber: 38,
            columnNumber: 9
        }, this),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start gap-3 rounded-2xl border border-gray-200 bg-gray-100/70 p-4 text-gray-600",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-0.5 shrink-0 text-gray-500",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertIcon"], {
                            size: 20
                        }, void 0, false, {
                            fileName: "[project]/app/citas/estados/ModalCitaCancelada.tsx",
                            lineNumber: 53,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/citas/estados/ModalCitaCancelada.tsx",
                        lineNumber: 52,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs font-medium leading-relaxed",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-bold",
                                children: "Cita cancelada:"
                            }, void 0, false, {
                                fileName: "[project]/app/citas/estados/ModalCitaCancelada.tsx",
                                lineNumber: 57,
                                columnNumber: 11
                            }, this),
                            ' ',
                            "Esta cita ha sido cancelada y no continuará con el proceso de atención. La información mostrada es únicamente de consulta."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/citas/estados/ModalCitaCancelada.tsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/citas/estados/ModalCitaCancelada.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 gap-5 md:grid-cols-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tarjeta"], {
                        titulo: "Información de la cita",
                        icono: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CalendarIcon"], {}, void 0, false, {
                            fileName: "[project]/app/citas/estados/ModalCitaCancelada.tsx",
                            lineNumber: 77,
                            columnNumber: 18
                        }, this),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Campo"], {
                                    label: "N° de cita",
                                    children: cita.id
                                }, void 0, false, {
                                    fileName: "[project]/app/citas/estados/ModalCitaCancelada.tsx",
                                    lineNumber: 80,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Campo"], {
                                    label: "Servicio / especialidad",
                                    children: cita.especialidad
                                }, void 0, false, {
                                    fileName: "[project]/app/citas/estados/ModalCitaCancelada.tsx",
                                    lineNumber: 84,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Campo"], {
                                    label: "Médico asignado",
                                    children: cita.medico
                                }, void 0, false, {
                                    fileName: "[project]/app/citas/estados/ModalCitaCancelada.tsx",
                                    lineNumber: 88,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Campo"], {
                                            label: "Fecha",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatFecha"])(cita.fecha)
                                        }, void 0, false, {
                                            fileName: "[project]/app/citas/estados/ModalCitaCancelada.tsx",
                                            lineNumber: 93,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Campo"], {
                                            label: "Hora programada",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatHora"])(cita.hora)
                                        }, void 0, false, {
                                            fileName: "[project]/app/citas/estados/ModalCitaCancelada.tsx",
                                            lineNumber: 97,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/citas/estados/ModalCitaCancelada.tsx",
                                    lineNumber: 92,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/citas/estados/ModalCitaCancelada.tsx",
                            lineNumber: 79,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/citas/estados/ModalCitaCancelada.tsx",
                        lineNumber: 75,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TarjetaPaciente"], {
                        cita: cita
                    }, void 0, false, {
                        fileName: "[project]/app/citas/estados/ModalCitaCancelada.tsx",
                        lineNumber: 108,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/citas/estados/ModalCitaCancelada.tsx",
                lineNumber: 70,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/citas/estados/ModalCitaCancelada.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
_c = ModalCitaCancelada;
var _c;
__turbopack_context__.k.register(_c, "ModalCitaCancelada");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/citas/estados/ModalCitaDiagnostico.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ModalCitaDiagnostico
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/citas/estados/ModalBase.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const FORM_VACIO = {
    sintomas: '',
    diagnostico: '',
    indicaciones: '',
    requiereLaboratorio: false
};
/* =========================================================
   ÍCONOS PROPIOS DE ESTE MODAL
========================================================= */ const iconProps = (size)=>({
        width: size,
        height: size,
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
    });
const PillIcon = ({ size = 16 })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        ...iconProps(size),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M10.5 20.5a4.95 4.95 0 0 1-7-7l10-10a4.95 4.95 0 0 1 7 7z"
            }, void 0, false, {
                fileName: "[project]/app/citas/estados/ModalCitaDiagnostico.tsx",
                lineNumber: 73,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "m8.5 8.5 7 7"
            }, void 0, false, {
                fileName: "[project]/app/citas/estados/ModalCitaDiagnostico.tsx",
                lineNumber: 74,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/app/citas/estados/ModalCitaDiagnostico.tsx",
        lineNumber: 72,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c = PillIcon;
const FlaskIcon = ({ size = 16 })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        ...iconProps(size),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M9 3h6M10 3v6L4.5 19a1.5 1.5 0 0 0 1.3 2.2h12.4a1.5 1.5 0 0 0 1.3-2.2L14 9V3"
            }, void 0, false, {
                fileName: "[project]/app/citas/estados/ModalCitaDiagnostico.tsx",
                lineNumber: 80,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M7.5 15h9"
            }, void 0, false, {
                fileName: "[project]/app/citas/estados/ModalCitaDiagnostico.tsx",
                lineNumber: 81,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/app/citas/estados/ModalCitaDiagnostico.tsx",
        lineNumber: 79,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c1 = FlaskIcon;
/* =========================================================
   PIEZAS LOCALES
========================================================= */ /** Etiqueta + ayuda corta sobre cada campo grande */ function Encabezado({ htmlFor, label, ayuda, requerido = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mb-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                htmlFor: htmlFor,
                className: "block text-xs font-semibold text-gray-700",
                children: [
                    label,
                    requerido && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-red-500",
                        children: " *"
                    }, void 0, false, {
                        fileName: "[project]/app/citas/estados/ModalCitaDiagnostico.tsx",
                        lineNumber: 108,
                        columnNumber: 23
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/citas/estados/ModalCitaDiagnostico.tsx",
                lineNumber: 103,
                columnNumber: 7
            }, this),
            ayuda && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-0.5 text-[11px] text-gray-400",
                children: ayuda
            }, void 0, false, {
                fileName: "[project]/app/citas/estados/ModalCitaDiagnostico.tsx",
                lineNumber: 112,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/citas/estados/ModalCitaDiagnostico.tsx",
        lineNumber: 102,
        columnNumber: 5
    }, this);
}
_c2 = Encabezado;
function ModalCitaDiagnostico({ examenesCatalogo = [], onClose, onVolver, onFinalizar }) {
    _s();
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(FORM_VACIO);
    const [examenesSeleccionados, setExamenesSeleccionados] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [busquedaExamen, setBusquedaExamen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [guardando, setGuardando] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [errorGuardar, setErrorGuardar] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const handleChange = (e)=>{
        const { name, value } = e.target;
        setForm((prev)=>({
                ...prev,
                [name]: value
            }));
    };
    const toggleExamen = (id)=>{
        setExamenesSeleccionados((prev)=>prev.includes(id) ? prev.filter((x)=>x !== id) : [
                ...prev,
                id
            ]);
    };
    const examenesFiltrados = busquedaExamen.trim() ? examenesCatalogo.filter((ex)=>ex.nombre.toLowerCase().includes(busquedaExamen.trim().toLowerCase())) : examenesCatalogo;
    const examenesPorCategoria = examenesFiltrados.reduce((grupos, ex)=>{
        (grupos[ex.categoria] ??= []).push(ex);
        return grupos;
    }, {});
    const lab = form.requiereLaboratorio;
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (!onFinalizar) return;
        setErrorGuardar('');
        setGuardando(true);
        try {
            await onFinalizar({
                sintomas: form.sintomas,
                diagnostico: form.diagnostico,
                indicaciones: form.indicaciones,
                examenIds: lab ? examenesSeleccionados : []
            });
        } catch (err) {
            setErrorGuardar(err instanceof Error ? err.message : 'No se pudo guardar el diagnóstico.');
        } finally{
            setGuardando(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalShell"], {
        titulo: "Registrar diagnóstico",
        subtitulo: "Registre el diagnóstico y la atención del paciente",
        tono: "violet",
        icono: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DocIcon"], {
            size: 22
        }, void 0, false, {
            fileName: "[project]/app/citas/estados/ModalCitaDiagnostico.tsx",
            lineNumber: 185,
            columnNumber: 14
        }, this),
        onClose: onClose,
        footer: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                errorGuardar && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mr-auto text-xs font-semibold text-red-600",
                    children: errorGuardar
                }, void 0, false, {
                    fileName: "[project]/app/citas/estados/ModalCitaDiagnostico.tsx",
                    lineNumber: 189,
                    columnNumber: 28
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    onClick: onVolver,
                    disabled: guardando,
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["btnSecondary"],
                    children: "Volver"
                }, void 0, false, {
                    fileName: "[project]/app/citas/estados/ModalCitaDiagnostico.tsx",
                    lineNumber: 190,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "submit",
                    form: "form-diagnostico",
                    disabled: guardando,
                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["btnPrimary"]} disabled:cursor-not-allowed disabled:opacity-60`,
                    children: guardando ? 'Guardando...' : 'Finalizar atención'
                }, void 0, false, {
                    fileName: "[project]/app/citas/estados/ModalCitaDiagnostico.tsx",
                    lineNumber: 193,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/citas/estados/ModalCitaDiagnostico.tsx",
            lineNumber: 188,
            columnNumber: 9
        }, this),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
            id: "form-diagnostico",
            onSubmit: handleSubmit,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 gap-5 md:grid-cols-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tarjeta"], {
                                titulo: "Síntomas",
                                icono: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PulseIcon"], {}, void 0, false, {
                                    fileName: "[project]/app/citas/estados/ModalCitaDiagnostico.tsx",
                                    lineNumber: 212,
                                    columnNumber: 47
                                }, this),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Encabezado, {
                                        htmlFor: "sintomas",
                                        label: "Síntomas que refiere el paciente",
                                        ayuda: "Inicio, duración e intensidad",
                                        requerido: true
                                    }, void 0, false, {
                                        fileName: "[project]/app/citas/estados/ModalCitaDiagnostico.tsx",
                                        lineNumber: 213,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        id: "sintomas",
                                        name: "sintomas",
                                        required: true,
                                        rows: 6,
                                        value: form.sintomas,
                                        onChange: handleChange,
                                        placeholder: "Ej: Dolor de cabeza desde hace dos días, de intensidad moderada",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["textareaClass"]
                                    }, void 0, false, {
                                        fileName: "[project]/app/citas/estados/ModalCitaDiagnostico.tsx",
                                        lineNumber: 220,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/citas/estados/ModalCitaDiagnostico.tsx",
                                lineNumber: 212,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tarjeta"], {
                                titulo: "Diagnóstico médico",
                                icono: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DocIcon"], {}, void 0, false, {
                                    fileName: "[project]/app/citas/estados/ModalCitaDiagnostico.tsx",
                                    lineNumber: 233,
                                    columnNumber: 57
                                }, this),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Encabezado, {
                                        htmlFor: "diagnostico",
                                        label: "Diagnóstico",
                                        ayuda: "Conclusión de la evaluación médica",
                                        requerido: true
                                    }, void 0, false, {
                                        fileName: "[project]/app/citas/estados/ModalCitaDiagnostico.tsx",
                                        lineNumber: 234,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        id: "diagnostico",
                                        name: "diagnostico",
                                        required: true,
                                        rows: 6,
                                        value: form.diagnostico,
                                        onChange: handleChange,
                                        placeholder: "Describa el diagnóstico",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["textareaClass"]
                                    }, void 0, false, {
                                        fileName: "[project]/app/citas/estados/ModalCitaDiagnostico.tsx",
                                        lineNumber: 241,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/citas/estados/ModalCitaDiagnostico.tsx",
                                lineNumber: 233,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/citas/estados/ModalCitaDiagnostico.tsx",
                        lineNumber: 210,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tarjeta"], {
                                titulo: "Indicaciones y tratamiento",
                                icono: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PillIcon, {}, void 0, false, {
                                    fileName: "[project]/app/citas/estados/ModalCitaDiagnostico.tsx",
                                    lineNumber: 260,
                                    columnNumber: 65
                                }, this),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Encabezado, {
                                        htmlFor: "indicaciones",
                                        label: "Tratamiento indicado",
                                        ayuda: "Medicamentos, dosis y recomendaciones"
                                    }, void 0, false, {
                                        fileName: "[project]/app/citas/estados/ModalCitaDiagnostico.tsx",
                                        lineNumber: 261,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        id: "indicaciones",
                                        name: "indicaciones",
                                        rows: 6,
                                        value: form.indicaciones,
                                        onChange: handleChange,
                                        placeholder: "Ej: Paracetamol 500 mg cada 8 horas por 3 días, reposo e hidratación",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["textareaClass"]
                                    }, void 0, false, {
                                        fileName: "[project]/app/citas/estados/ModalCitaDiagnostico.tsx",
                                        lineNumber: 267,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/citas/estados/ModalCitaDiagnostico.tsx",
                                lineNumber: 260,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tarjeta"], {
                                titulo: "Orden de laboratorio",
                                icono: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FlaskIcon, {}, void 0, false, {
                                    fileName: "[project]/app/citas/estados/ModalCitaDiagnostico.tsx",
                                    lineNumber: 279,
                                    columnNumber: 59
                                }, this),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: `flex cursor-pointer items-center justify-between gap-3 rounded-xl border px-4 py-3 transition ${lab ? 'border-[#0d7a71]/30 bg-[#0d7a71]/5' : 'border-gray-200 bg-white hover:bg-gray-50'}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "min-w-0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "block text-sm font-semibold text-gray-800",
                                                        children: "Requiere exámenes de laboratorio"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/citas/estados/ModalCitaDiagnostico.tsx",
                                                        lineNumber: 288,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "mt-0.5 block text-[11px] text-gray-400",
                                                        children: "La orden quedará disponible para la sede de Laboratorio"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/citas/estados/ModalCitaDiagnostico.tsx",
                                                        lineNumber: 291,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/citas/estados/ModalCitaDiagnostico.tsx",
                                                lineNumber: 287,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "checkbox",
                                                checked: lab,
                                                onChange: (e)=>setForm((prev)=>({
                                                            ...prev,
                                                            requiereLaboratorio: e.target.checked
                                                        })),
                                                className: "h-5 w-5 shrink-0 rounded border-gray-300 accent-[#0d7a71]"
                                            }, void 0, false, {
                                                fileName: "[project]/app/citas/estados/ModalCitaDiagnostico.tsx",
                                                lineNumber: 296,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/citas/estados/ModalCitaDiagnostico.tsx",
                                        lineNumber: 280,
                                        columnNumber: 15
                                    }, this),
                                    lab && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-4 space-y-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                value: busquedaExamen,
                                                onChange: (e)=>setBusquedaExamen(e.target.value),
                                                placeholder: "Buscar examen...",
                                                className: "h-10 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/15"
                                            }, void 0, false, {
                                                fileName: "[project]/app/citas/estados/ModalCitaDiagnostico.tsx",
                                                lineNumber: 311,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "max-h-56 space-y-3 overflow-y-auto rounded-xl border border-gray-200 p-3",
                                                children: Object.keys(examenesPorCategoria).length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-center text-xs text-gray-400",
                                                    children: examenesCatalogo.length === 0 ? 'Cargando catálogo...' : 'Sin resultados.'
                                                }, void 0, false, {
                                                    fileName: "[project]/app/citas/estados/ModalCitaDiagnostico.tsx",
                                                    lineNumber: 321,
                                                    columnNumber: 23
                                                }, this) : Object.entries(examenesPorCategoria).map(([categoria, examenes])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "mb-1 text-[11px] font-semibold uppercase tracking-wide text-gray-400",
                                                                children: categoria
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/citas/estados/ModalCitaDiagnostico.tsx",
                                                                lineNumber: 327,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "space-y-1",
                                                                children: examenes.map((ex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        className: "flex cursor-pointer items-center gap-2 rounded-lg px-1.5 py-1 text-sm text-gray-700 hover:bg-gray-50",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                type: "checkbox",
                                                                                checked: examenesSeleccionados.includes(ex.id),
                                                                                onChange: ()=>toggleExamen(ex.id),
                                                                                className: "h-3.5 w-3.5 rounded border-gray-300 accent-[#0d7a71]"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/citas/estados/ModalCitaDiagnostico.tsx",
                                                                                lineNumber: 336,
                                                                                columnNumber: 33
                                                                            }, this),
                                                                            ex.nombre
                                                                        ]
                                                                    }, ex.id, true, {
                                                                        fileName: "[project]/app/citas/estados/ModalCitaDiagnostico.tsx",
                                                                        lineNumber: 332,
                                                                        columnNumber: 31
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/citas/estados/ModalCitaDiagnostico.tsx",
                                                                lineNumber: 330,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, categoria, true, {
                                                        fileName: "[project]/app/citas/estados/ModalCitaDiagnostico.tsx",
                                                        lineNumber: 326,
                                                        columnNumber: 25
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/app/citas/estados/ModalCitaDiagnostico.tsx",
                                                lineNumber: 319,
                                                columnNumber: 19
                                            }, this),
                                            examenesSeleccionados.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs font-medium text-gray-500",
                                                children: [
                                                    examenesSeleccionados.length,
                                                    " examen(es) seleccionado(s)"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/citas/estados/ModalCitaDiagnostico.tsx",
                                                lineNumber: 352,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/citas/estados/ModalCitaDiagnostico.tsx",
                                        lineNumber: 310,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/citas/estados/ModalCitaDiagnostico.tsx",
                                lineNumber: 279,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/citas/estados/ModalCitaDiagnostico.tsx",
                        lineNumber: 258,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/citas/estados/ModalCitaDiagnostico.tsx",
                lineNumber: 205,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/citas/estados/ModalCitaDiagnostico.tsx",
            lineNumber: 204,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/citas/estados/ModalCitaDiagnostico.tsx",
        lineNumber: 181,
        columnNumber: 5
    }, this);
}
_s(ModalCitaDiagnostico, "qlD4bUtOvV5GCuWysASPdvu521M=");
_c3 = ModalCitaDiagnostico;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "PillIcon");
__turbopack_context__.k.register(_c1, "FlaskIcon");
__turbopack_context__.k.register(_c2, "Encabezado");
__turbopack_context__.k.register(_c3, "ModalCitaDiagnostico");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/citas/estados/ModalCitaPendienteTriaje.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ModalCitaPendienteTriaje
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/citas/estados/ModalBase.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function ModalCitaPendienteTriaje({ onClose, onVolver, onGuardarTriaje }) {
    _s();
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TRIAJE_VACIO"]);
    const [guardando, setGuardando] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [errorGuardar, setErrorGuardar] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const handleChange = (e)=>{
        const { name, value } = e.target;
        setForm((prev)=>({
                ...prev,
                [name]: value
            }));
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (!onGuardarTriaje) return;
        setErrorGuardar('');
        setGuardando(true);
        try {
            await onGuardarTriaje(form);
        } catch (err) {
            setErrorGuardar(err instanceof Error ? err.message : 'No se pudo guardar el triaje.');
        } finally{
            setGuardando(false);
        }
    };
    /* IMC calculado */ const peso = parseFloat(form.peso);
    const tallaM = parseFloat(form.talla) / 100;
    const imc = peso > 0 && tallaM > 0 ? (peso / (tallaM * tallaM)).toFixed(1) : null;
    /* Campo con unidad dentro del input */ const campo = (name, label, placeholder, unidad, extra = {})=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                    htmlFor: name,
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["labelClass"],
                    children: [
                        label,
                        extra.required && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-red-500",
                            children: " *"
                        }, void 0, false, {
                            fileName: "[project]/app/citas/estados/ModalCitaPendienteTriaje.tsx",
                            lineNumber: 83,
                            columnNumber: 28
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/citas/estados/ModalCitaPendienteTriaje.tsx",
                    lineNumber: 81,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            id: name,
                            name: name,
                            value: form[name],
                            onChange: handleChange,
                            placeholder: placeholder,
                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputClass"]} pr-14`,
                            ...extra
                        }, void 0, false, {
                            fileName: "[project]/app/citas/estados/ModalCitaPendienteTriaje.tsx",
                            lineNumber: 87,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "pointer-events-none absolute inset-y-0 right-3 flex items-center text-[11px] font-semibold text-gray-400",
                            children: unidad
                        }, void 0, false, {
                            fileName: "[project]/app/citas/estados/ModalCitaPendienteTriaje.tsx",
                            lineNumber: 97,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/citas/estados/ModalCitaPendienteTriaje.tsx",
                    lineNumber: 86,
                    columnNumber: 7
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/citas/estados/ModalCitaPendienteTriaje.tsx",
            lineNumber: 80,
            columnNumber: 5
        }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalShell"], {
        titulo: "Registrar triaje",
        subtitulo: "Ingrese los signos vitales del paciente",
        tono: "amber",
        icono: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PulseIcon"], {
            size: 22
        }, void 0, false, {
            fileName: "[project]/app/citas/estados/ModalCitaPendienteTriaje.tsx",
            lineNumber: 109,
            columnNumber: 14
        }, this),
        onClose: onClose,
        footer: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                errorGuardar && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mr-auto text-xs font-semibold text-red-600",
                    children: errorGuardar
                }, void 0, false, {
                    fileName: "[project]/app/citas/estados/ModalCitaPendienteTriaje.tsx",
                    lineNumber: 113,
                    columnNumber: 28
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    onClick: onVolver,
                    disabled: guardando,
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["btnSecondary"],
                    children: "Volver"
                }, void 0, false, {
                    fileName: "[project]/app/citas/estados/ModalCitaPendienteTriaje.tsx",
                    lineNumber: 114,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "submit",
                    form: "form-triaje",
                    disabled: guardando,
                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["btnPrimary"]} disabled:cursor-not-allowed disabled:opacity-60`,
                    children: guardando ? 'Guardando...' : 'Guardar triaje'
                }, void 0, false, {
                    fileName: "[project]/app/citas/estados/ModalCitaPendienteTriaje.tsx",
                    lineNumber: 117,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/citas/estados/ModalCitaPendienteTriaje.tsx",
            lineNumber: 112,
            columnNumber: 9
        }, this),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
            id: "form-triaje",
            className: "space-y-5",
            onSubmit: handleSubmit,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tarjeta"], {
                    titulo: "Signos vitales",
                    icono: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PulseIcon"], {}, void 0, false, {
                        fileName: "[project]/app/citas/estados/ModalCitaPendienteTriaje.tsx",
                        lineNumber: 137,
                        columnNumber: 49
                    }, this),
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 gap-x-4 gap-y-4 md:grid-cols-4",
                        children: [
                            campo('presionArterial', 'Presión arterial', '120/80', 'mmHg', {
                                required: true
                            }),
                            campo('frecuenciaCardiaca', 'Frec. cardiaca', '80', 'lpm', {
                                type: 'number',
                                inputMode: 'numeric',
                                required: true
                            }),
                            campo('frecuenciaRespiratoria', 'Frec. respiratoria', '18', 'rpm', {
                                type: 'number',
                                inputMode: 'numeric'
                            }),
                            campo('temperatura', 'Temperatura', '36.5', '°C', {
                                type: 'number',
                                step: '0.1',
                                inputMode: 'decimal',
                                required: true
                            }),
                            campo('saturacion', 'Saturación O₂', '98', '%', {
                                type: 'number',
                                inputMode: 'numeric'
                            }),
                            campo('peso', 'Peso', '70', 'kg', {
                                type: 'number',
                                step: '0.1',
                                inputMode: 'decimal'
                            }),
                            campo('talla', 'Talla', '170', 'cm', {
                                type: 'number',
                                inputMode: 'numeric'
                            }),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["labelClass"],
                                        children: "IMC calculado"
                                    }, void 0, false, {
                                        fileName: "[project]/app/citas/estados/ModalCitaPendienteTriaje.tsx",
                                        lineNumber: 178,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex h-10 items-center justify-between rounded-xl border border-[#0d7a71]/15 bg-[#0d7a71]/5 px-3 text-sm font-bold text-[#0d7a71]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: imc ?? '---'
                                            }, void 0, false, {
                                                fileName: "[project]/app/citas/estados/ModalCitaPendienteTriaje.tsx",
                                                lineNumber: 181,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[11px] font-semibold text-[#0d7a71]/60",
                                                children: "kg/m²"
                                            }, void 0, false, {
                                                fileName: "[project]/app/citas/estados/ModalCitaPendienteTriaje.tsx",
                                                lineNumber: 182,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/citas/estados/ModalCitaPendienteTriaje.tsx",
                                        lineNumber: 180,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/citas/estados/ModalCitaPendienteTriaje.tsx",
                                lineNumber: 177,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/citas/estados/ModalCitaPendienteTriaje.tsx",
                        lineNumber: 138,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/citas/estados/ModalCitaPendienteTriaje.tsx",
                    lineNumber: 137,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tarjeta"], {
                    titulo: "Motivo de consulta",
                    icono: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DocIcon"], {}, void 0, false, {
                        fileName: "[project]/app/citas/estados/ModalCitaPendienteTriaje.tsx",
                        lineNumber: 194,
                        columnNumber: 53
                    }, this),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            htmlFor: "motivoConsulta",
                            className: "sr-only",
                            children: "Motivo de consulta"
                        }, void 0, false, {
                            fileName: "[project]/app/citas/estados/ModalCitaPendienteTriaje.tsx",
                            lineNumber: 195,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                            id: "motivoConsulta",
                            name: "motivoConsulta",
                            rows: 4,
                            value: form.motivoConsulta,
                            onChange: handleChange,
                            placeholder: "Describa por qué acude el paciente",
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["textareaClass"]
                        }, void 0, false, {
                            fileName: "[project]/app/citas/estados/ModalCitaPendienteTriaje.tsx",
                            lineNumber: 199,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/citas/estados/ModalCitaPendienteTriaje.tsx",
                    lineNumber: 194,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/citas/estados/ModalCitaPendienteTriaje.tsx",
            lineNumber: 128,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/citas/estados/ModalCitaPendienteTriaje.tsx",
        lineNumber: 105,
        columnNumber: 5
    }, this);
}
_s(ModalCitaPendienteTriaje, "DQ/NAaHROlnl29qGWHvhKJUzOyg=");
_c = ModalCitaPendienteTriaje;
var _c;
__turbopack_context__.k.register(_c, "ModalCitaPendienteTriaje");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/citas/estados/ModalCitaReprogramar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ModalCitaReprogramar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/citas/estados/ModalBase.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function ModalCitaReprogramar({ cita = __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CITA_EJEMPLO"], onClose, onBuscarHorarios, onConfirmar }) {
    _s();
    const [nuevaFecha, setNuevaFecha] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [programacionId, setProgramacionId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [horarios, setHorarios] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [cargandoHorarios, setCargandoHorarios] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [errorHorarios, setErrorHorarios] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [guardando, setGuardando] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [errorGuardar, setErrorGuardar] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    // Cada vez que cambia la fecha, se vuelve a buscar qué médicos de esta
    // especialidad están programados ese día.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ModalCitaReprogramar.useEffect": ()=>{
            // eslint-disable-next-line react-hooks/set-state-in-effect -- limpia la selección anterior al cambiar de fecha, no deriva de render
            setProgramacionId('');
            if (!nuevaFecha || !onBuscarHorarios) {
                setHorarios([]);
                return;
            }
            let cancelado = false;
            setErrorHorarios('');
            setCargandoHorarios(true);
            onBuscarHorarios(nuevaFecha).then({
                "ModalCitaReprogramar.useEffect": (lista)=>{
                    if (!cancelado) setHorarios(lista);
                }
            }["ModalCitaReprogramar.useEffect"]).catch({
                "ModalCitaReprogramar.useEffect": (err)=>{
                    if (!cancelado) {
                        setHorarios([]);
                        setErrorHorarios(err instanceof Error ? err.message : 'No se pudo buscar la programación médica.');
                    }
                }
            }["ModalCitaReprogramar.useEffect"]).finally({
                "ModalCitaReprogramar.useEffect": ()=>{
                    if (!cancelado) setCargandoHorarios(false);
                }
            }["ModalCitaReprogramar.useEffect"]);
            return ({
                "ModalCitaReprogramar.useEffect": ()=>{
                    cancelado = true;
                }
            })["ModalCitaReprogramar.useEffect"];
        // eslint-disable-next-line react-hooks/exhaustive-deps -- onBuscarHorarios es estable (viene de props del padre)
        }
    }["ModalCitaReprogramar.useEffect"], [
        nuevaFecha
    ]);
    const sinMedicosProgramados = nuevaFecha !== '' && !cargandoHorarios && !errorHorarios && horarios.length === 0;
    const puedeConfirmar = nuevaFecha.trim() !== '' && programacionId !== '' && !guardando;
    const confirmarReprogramacion = async ()=>{
        if (!puedeConfirmar || !onConfirmar) {
            return;
        }
        const horario = horarios.find((h)=>String(h.id) === programacionId);
        if (!horario) return;
        setErrorGuardar('');
        setGuardando(true);
        try {
            await onConfirmar({
                fecha: nuevaFecha,
                hora: horario.horaInicio,
                programacionId: horario.id
            });
        } catch (err) {
            setErrorGuardar(err instanceof Error ? err.message : 'No se pudo reprogramar la cita.');
            setGuardando(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalShell"], {
        titulo: "Reprogramar cita",
        subtitulo: "Seleccione la nueva fecha y hora para la atención",
        tono: "blue",
        icono: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CalendarIcon"], {}, void 0, false, {
            fileName: "[project]/app/citas/estados/ModalCitaReprogramar.tsx",
            lineNumber: 121,
            columnNumber: 14
        }, this),
        onClose: onClose,
        footer: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                errorGuardar && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mr-auto text-xs font-semibold text-red-600",
                    children: errorGuardar
                }, void 0, false, {
                    fileName: "[project]/app/citas/estados/ModalCitaReprogramar.tsx",
                    lineNumber: 125,
                    columnNumber: 28
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    onClick: onClose,
                    disabled: guardando,
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["btnSecondary"],
                    children: "Cancelar"
                }, void 0, false, {
                    fileName: "[project]/app/citas/estados/ModalCitaReprogramar.tsx",
                    lineNumber: 126,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    onClick: confirmarReprogramacion,
                    disabled: !puedeConfirmar,
                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["btnPrimary"]} disabled:cursor-not-allowed disabled:opacity-50`,
                    children: guardando ? 'Guardando...' : 'Confirmar reprogramación'
                }, void 0, false, {
                    fileName: "[project]/app/citas/estados/ModalCitaReprogramar.tsx",
                    lineNumber: 135,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/citas/estados/ModalCitaReprogramar.tsx",
            lineNumber: 124,
            columnNumber: 9
        }, this),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-3 flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CalendarIcon"], {
                                    size: 17
                                }, void 0, false, {
                                    fileName: "[project]/app/citas/estados/ModalCitaReprogramar.tsx",
                                    lineNumber: 154,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "text-sm font-bold text-gray-900",
                                    children: "Cita actual"
                                }, void 0, false, {
                                    fileName: "[project]/app/citas/estados/ModalCitaReprogramar.tsx",
                                    lineNumber: 156,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/citas/estados/ModalCitaReprogramar.tsx",
                            lineNumber: 153,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 gap-3 md:grid-cols-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-xl border border-gray-200 bg-white px-4 py-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[11px] font-semibold text-gray-400",
                                            children: "Fecha"
                                        }, void 0, false, {
                                            fileName: "[project]/app/citas/estados/ModalCitaReprogramar.tsx",
                                            lineNumber: 163,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1 text-sm font-semibold text-gray-700",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatFecha"])(cita.fecha)
                                        }, void 0, false, {
                                            fileName: "[project]/app/citas/estados/ModalCitaReprogramar.tsx",
                                            lineNumber: 167,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/citas/estados/ModalCitaReprogramar.tsx",
                                    lineNumber: 162,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-xl border border-gray-200 bg-white px-4 py-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[11px] font-semibold text-gray-400",
                                            children: "Hora"
                                        }, void 0, false, {
                                            fileName: "[project]/app/citas/estados/ModalCitaReprogramar.tsx",
                                            lineNumber: 173,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1 text-sm font-semibold text-gray-700",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatHora"])(cita.hora)
                                        }, void 0, false, {
                                            fileName: "[project]/app/citas/estados/ModalCitaReprogramar.tsx",
                                            lineNumber: 177,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/citas/estados/ModalCitaReprogramar.tsx",
                                    lineNumber: 172,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/citas/estados/ModalCitaReprogramar.tsx",
                            lineNumber: 161,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/citas/estados/ModalCitaReprogramar.tsx",
                    lineNumber: 152,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-px w-full bg-gray-200"
                }, void 0, false, {
                    fileName: "[project]/app/citas/estados/ModalCitaReprogramar.tsx",
                    lineNumber: 188,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "text-sm font-bold text-gray-900",
                                    children: "Nueva programación"
                                }, void 0, false, {
                                    fileName: "[project]/app/citas/estados/ModalCitaReprogramar.tsx",
                                    lineNumber: 196,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-1 text-xs text-gray-400",
                                    children: "Seleccione la fecha y hora para la nueva atención."
                                }, void 0, false, {
                                    fileName: "[project]/app/citas/estados/ModalCitaReprogramar.tsx",
                                    lineNumber: 200,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/citas/estados/ModalCitaReprogramar.tsx",
                            lineNumber: 195,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 gap-4 md:grid-cols-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "nueva-fecha",
                                            className: "mb-1.5 block text-xs font-semibold text-gray-700",
                                            children: "Nueva fecha"
                                        }, void 0, false, {
                                            fileName: "[project]/app/citas/estados/ModalCitaReprogramar.tsx",
                                            lineNumber: 210,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            id: "nueva-fecha",
                                            type: "date",
                                            value: nuevaFecha,
                                            onChange: (e)=>setNuevaFecha(e.target.value),
                                            className: "h-10 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none transition focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/10"
                                        }, void 0, false, {
                                            fileName: "[project]/app/citas/estados/ModalCitaReprogramar.tsx",
                                            lineNumber: 217,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1.5 text-[10px] text-gray-400",
                                            children: "Seleccione el día de la atención."
                                        }, void 0, false, {
                                            fileName: "[project]/app/citas/estados/ModalCitaReprogramar.tsx",
                                            lineNumber: 225,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/citas/estados/ModalCitaReprogramar.tsx",
                                    lineNumber: 209,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "nuevo-horario",
                                            className: "mb-1.5 block text-xs font-semibold text-gray-700",
                                            children: "Horario médico"
                                        }, void 0, false, {
                                            fileName: "[project]/app/citas/estados/ModalCitaReprogramar.tsx",
                                            lineNumber: 233,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            id: "nuevo-horario",
                                            value: programacionId,
                                            onChange: (e)=>setProgramacionId(e.target.value),
                                            disabled: !nuevaFecha || cargandoHorarios || horarios.length === 0,
                                            className: "h-10 w-full appearance-none rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none transition focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/10 disabled:bg-gray-50 disabled:text-gray-400",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    children: !nuevaFecha ? 'Elija primero la fecha' : cargandoHorarios ? 'Buscando médicos programados...' : horarios.length === 0 ? 'Sin médicos programados' : 'Seleccione un horario'
                                                }, void 0, false, {
                                                    fileName: "[project]/app/citas/estados/ModalCitaReprogramar.tsx",
                                                    lineNumber: 247,
                                                    columnNumber: 17
                                                }, this),
                                                horarios.map((h)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: h.id,
                                                        children: h.etiqueta
                                                    }, h.id, false, {
                                                        fileName: "[project]/app/citas/estados/ModalCitaReprogramar.tsx",
                                                        lineNumber: 257,
                                                        columnNumber: 19
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/citas/estados/ModalCitaReprogramar.tsx",
                                            lineNumber: 240,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1.5 text-[10px] text-gray-400",
                                            children: [
                                                "Solo se muestran los médicos ya programados (",
                                                cita.especialidad,
                                                ") ese día."
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/citas/estados/ModalCitaReprogramar.tsx",
                                            lineNumber: 263,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/citas/estados/ModalCitaReprogramar.tsx",
                                    lineNumber: 232,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/citas/estados/ModalCitaReprogramar.tsx",
                            lineNumber: 205,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/citas/estados/ModalCitaReprogramar.tsx",
                    lineNumber: 194,
                    columnNumber: 9
                }, this),
                errorHorarios && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-xs font-semibold text-red-600",
                    children: errorHorarios
                }, void 0, false, {
                    fileName: "[project]/app/citas/estados/ModalCitaReprogramar.tsx",
                    lineNumber: 276,
                    columnNumber: 11
                }, this),
                sinMedicosProgramados && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "rounded-xl border border-red-100 bg-red-50 px-4 py-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs font-bold text-red-700",
                            children: "No hay médicos programados"
                        }, void 0, false, {
                            fileName: "[project]/app/citas/estados/ModalCitaReprogramar.tsx",
                            lineNumber: 283,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-1 text-xs text-red-600",
                            children: [
                                "Nadie de ",
                                cita.especialidad,
                                " está programado el ",
                                nuevaFecha,
                                ". Elija otra fecha o programe primero un médico ese día en Programación Médica."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/citas/estados/ModalCitaReprogramar.tsx",
                            lineNumber: 286,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/citas/estados/ModalCitaReprogramar.tsx",
                    lineNumber: 282,
                    columnNumber: 11
                }, this),
                puedeConfirmar && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "rounded-xl border border-emerald-100 bg-emerald-50/60 px-4 py-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs font-semibold text-emerald-700",
                            children: "Nueva programación"
                        }, void 0, false, {
                            fileName: "[project]/app/citas/estados/ModalCitaReprogramar.tsx",
                            lineNumber: 299,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-2 flex flex-wrap gap-x-8 gap-y-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[10px] text-emerald-600",
                                            children: "Fecha"
                                        }, void 0, false, {
                                            fileName: "[project]/app/citas/estados/ModalCitaReprogramar.tsx",
                                            lineNumber: 305,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm font-bold text-emerald-800",
                                            children: nuevaFecha
                                        }, void 0, false, {
                                            fileName: "[project]/app/citas/estados/ModalCitaReprogramar.tsx",
                                            lineNumber: 309,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/citas/estados/ModalCitaReprogramar.tsx",
                                    lineNumber: 304,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[10px] text-emerald-600",
                                            children: "Horario"
                                        }, void 0, false, {
                                            fileName: "[project]/app/citas/estados/ModalCitaReprogramar.tsx",
                                            lineNumber: 315,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm font-bold text-emerald-800",
                                            children: horarios.find((h)=>String(h.id) === programacionId)?.etiqueta
                                        }, void 0, false, {
                                            fileName: "[project]/app/citas/estados/ModalCitaReprogramar.tsx",
                                            lineNumber: 319,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/citas/estados/ModalCitaReprogramar.tsx",
                                    lineNumber: 314,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/citas/estados/ModalCitaReprogramar.tsx",
                            lineNumber: 303,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/citas/estados/ModalCitaReprogramar.tsx",
                    lineNumber: 298,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/citas/estados/ModalCitaReprogramar.tsx",
            lineNumber: 146,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/citas/estados/ModalCitaReprogramar.tsx",
        lineNumber: 117,
        columnNumber: 5
    }, this);
}
_s(ModalCitaReprogramar, "9cs7Gm0BGCMqxCYsX6zCAOAGO7M=");
_c = ModalCitaReprogramar;
var _c;
__turbopack_context__.k.register(_c, "ModalCitaReprogramar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/citas/estados/ModalInfoAusente.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ModalInfoAusente
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/citas/estados/ModalBase.tsx [app-client] (ecmascript)");
'use client';
;
;
function ModalInfoAusente({ cita = __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CITA_EJEMPLO"], onClose, onReprogramar }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalShell"], {
        titulo: "Ausente",
        subtitulo: "El paciente no asistió a su cita programada",
        tono: "red",
        icono: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertIcon"], {
            size: 22
        }, void 0, false, {
            fileName: "[project]/app/citas/estados/ModalInfoAusente.tsx",
            lineNumber: 45,
            columnNumber: 14
        }, this),
        onClose: onClose,
        footer: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    onClick: onClose,
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["btnSecondary"],
                    children: "Cerrar"
                }, void 0, false, {
                    fileName: "[project]/app/citas/estados/ModalInfoAusente.tsx",
                    lineNumber: 49,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    onClick: onReprogramar,
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["btnPrimary"],
                    children: "Reprogramar cita"
                }, void 0, false, {
                    fileName: "[project]/app/citas/estados/ModalInfoAusente.tsx",
                    lineNumber: 57,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/citas/estados/ModalInfoAusente.tsx",
            lineNumber: 48,
            columnNumber: 9
        }, this),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50/70 p-4 text-red-700",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-0.5 shrink-0 text-red-600",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertIcon"], {
                            size: 20
                        }, void 0, false, {
                            fileName: "[project]/app/citas/estados/ModalInfoAusente.tsx",
                            lineNumber: 70,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/citas/estados/ModalInfoAusente.tsx",
                        lineNumber: 69,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs font-medium leading-relaxed",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-bold",
                                children: "Paciente ausente:"
                            }, void 0, false, {
                                fileName: "[project]/app/citas/estados/ModalInfoAusente.tsx",
                                lineNumber: 74,
                                columnNumber: 11
                            }, this),
                            ' ',
                            "El paciente no se presentó durante el día de su cita (",
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatFecha"])(cita.fecha),
                            ", ",
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatHora"])(cita.hora),
                            ") y la cita quedó como ausente al pasar al día siguiente. Puede reprogramarla para otra fecha y hora."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/citas/estados/ModalInfoAusente.tsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/citas/estados/ModalInfoAusente.tsx",
                lineNumber: 68,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 gap-5 md:grid-cols-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tarjeta"], {
                        titulo: "Información de la cita",
                        icono: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CalendarIcon"], {}, void 0, false, {
                            fileName: "[project]/app/citas/estados/ModalInfoAusente.tsx",
                            lineNumber: 88,
                            columnNumber: 18
                        }, this),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Campo"], {
                                    label: "N° de cita",
                                    children: cita.id
                                }, void 0, false, {
                                    fileName: "[project]/app/citas/estados/ModalInfoAusente.tsx",
                                    lineNumber: 91,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Campo"], {
                                    label: "Servicio / especialidad",
                                    children: cita.especialidad
                                }, void 0, false, {
                                    fileName: "[project]/app/citas/estados/ModalInfoAusente.tsx",
                                    lineNumber: 95,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Campo"], {
                                    label: "Médico asignado",
                                    children: cita.medico
                                }, void 0, false, {
                                    fileName: "[project]/app/citas/estados/ModalInfoAusente.tsx",
                                    lineNumber: 99,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Campo"], {
                                            label: "Fecha",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatFecha"])(cita.fecha)
                                        }, void 0, false, {
                                            fileName: "[project]/app/citas/estados/ModalInfoAusente.tsx",
                                            lineNumber: 104,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Campo"], {
                                            label: "Hora programada",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatHora"])(cita.hora)
                                        }, void 0, false, {
                                            fileName: "[project]/app/citas/estados/ModalInfoAusente.tsx",
                                            lineNumber: 108,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/citas/estados/ModalInfoAusente.tsx",
                                    lineNumber: 103,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/citas/estados/ModalInfoAusente.tsx",
                            lineNumber: 90,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/citas/estados/ModalInfoAusente.tsx",
                        lineNumber: 86,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TarjetaPaciente"], {
                        cita: cita
                    }, void 0, false, {
                        fileName: "[project]/app/citas/estados/ModalInfoAusente.tsx",
                        lineNumber: 115,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/citas/estados/ModalInfoAusente.tsx",
                lineNumber: 85,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/citas/estados/ModalInfoAusente.tsx",
        lineNumber: 41,
        columnNumber: 5
    }, this);
}
_c = ModalInfoAusente;
var _c;
__turbopack_context__.k.register(_c, "ModalInfoAusente");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/citas/estados/ModalInfoPendienteDiagnostico.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ModalInfoPendienteDiagnostico
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/citas/estados/ModalBase.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
/* =========================================================
   TRIAJE DE EJEMPLO
   Simula lo que se guardó en el estado anterior
   ("Pendiente de triaje"). Cuando conectes el backend,
   el padre pasará el triaje real y esto ya no se usa.
========================================================= */ const TRIAJE_EJEMPLO = {
    presionArterial: '120/80',
    frecuenciaCardiaca: '78',
    frecuenciaRespiratoria: '18',
    temperatura: '36.8',
    saturacion: '98',
    peso: '72',
    talla: '170',
    motivoConsulta: 'Dolor de cabeza intenso desde hace dos días, acompañado de malestar general.'
};
/* =========================================================
   ÍCONOS
========================================================= */ const iconProps = (size)=>({
        width: size,
        height: size,
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
    });
const EditIcon = ({ size = 16 })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        ...iconProps(size),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M12 20h9"
            }, void 0, false, {
                fileName: "[project]/app/citas/estados/ModalInfoPendienteDiagnostico.tsx",
                lineNumber: 74,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"
            }, void 0, false, {
                fileName: "[project]/app/citas/estados/ModalInfoPendienteDiagnostico.tsx",
                lineNumber: 75,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/app/citas/estados/ModalInfoPendienteDiagnostico.tsx",
        lineNumber: 73,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c = EditIcon;
const CheckIcon = ({ size = 16 })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        ...iconProps(size),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "m5 12 5 5L20 7"
        }, void 0, false, {
            fileName: "[project]/app/citas/estados/ModalInfoPendienteDiagnostico.tsx",
            lineNumber: 81,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/app/citas/estados/ModalInfoPendienteDiagnostico.tsx",
        lineNumber: 80,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c1 = CheckIcon;
const XIcon = ({ size = 16 })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        ...iconProps(size),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M6 18 18 6M6 6l12 12"
        }, void 0, false, {
            fileName: "[project]/app/citas/estados/ModalInfoPendienteDiagnostico.tsx",
            lineNumber: 87,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/app/citas/estados/ModalInfoPendienteDiagnostico.tsx",
        lineNumber: 86,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c2 = XIcon;
/* =========================================================
   CLASES
========================================================= */ const inputInline = 'w-full min-w-0 bg-transparent text-sm font-semibold text-gray-800 outline-none placeholder:font-normal placeholder:text-gray-300';
const casillaEdit = 'block rounded-xl border border-[#0d7a71]/25 bg-white px-3 py-2.5 transition focus-within:border-[#0d7a71] focus-within:ring-2 focus-within:ring-[#0d7a71]/15';
const labelCasilla = 'text-[11px] font-semibold text-gray-400';
const FORM_ID = 'form-editar-triaje';
function ModalInfoPendienteDiagnostico({ cita = __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CITA_EJEMPLO"], triaje = TRIAJE_EJEMPLO, onClose, onRegistrarDiagnostico, onGuardarTriaje }) {
    _s();
    const [editando, setEditando] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(triaje);
    const [guardando, setGuardando] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [errorGuardar, setErrorGuardar] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const empezarEdicion = ()=>{
        setForm(triaje); // siempre parte de lo último guardado
        setErrorGuardar('');
        setEditando(true);
    };
    const cancelarEdicion = ()=>{
        setErrorGuardar('');
        setEditando(false);
    };
    const handleChange = (e)=>{
        const { name, value } = e.target;
        setForm((prev)=>({
                ...prev,
                [name]: value
            }));
    };
    const guardar = async (e)=>{
        e.preventDefault();
        if (!onGuardarTriaje) return;
        setErrorGuardar('');
        setGuardando(true);
        try {
            await onGuardarTriaje(form);
            setEditando(false);
        } catch (err) {
            setErrorGuardar(err instanceof Error ? err.message : 'No se pudo guardar el triaje.');
        } finally{
            setGuardando(false);
        }
    };
    /* Casilla editable: mismo aspecto que "Signo", con input adentro */ const casilla = (name, label, placeholder, unidad, extra = {})=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            htmlFor: `edit-${name}`,
            className: casillaEdit,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: labelCasilla,
                    children: [
                        label,
                        extra.required && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-red-500",
                            children: " *"
                        }, void 0, false, {
                            fileName: "[project]/app/citas/estados/ModalInfoPendienteDiagnostico.tsx",
                            lineNumber: 170,
                            columnNumber: 28
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/citas/estados/ModalInfoPendienteDiagnostico.tsx",
                    lineNumber: 168,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-0.5 flex items-center gap-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            id: `edit-${name}`,
                            name: name,
                            value: form[name],
                            onChange: handleChange,
                            placeholder: placeholder,
                            className: inputInline,
                            ...extra
                        }, void 0, false, {
                            fileName: "[project]/app/citas/estados/ModalInfoPendienteDiagnostico.tsx",
                            lineNumber: 174,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "shrink-0 text-xs font-medium text-gray-400",
                            children: unidad
                        }, void 0, false, {
                            fileName: "[project]/app/citas/estados/ModalInfoPendienteDiagnostico.tsx",
                            lineNumber: 184,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/citas/estados/ModalInfoPendienteDiagnostico.tsx",
                    lineNumber: 173,
                    columnNumber: 7
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/citas/estados/ModalInfoPendienteDiagnostico.tsx",
            lineNumber: 167,
            columnNumber: 5
        }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalShell"], {
        titulo: "Pendiente diagnóstico",
        subtitulo: "Revise la información del paciente y el triaje registrado",
        tono: "violet",
        onClose: onClose,
        footer: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    onClick: onClose,
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["btnSecondary"],
                    children: "Cerrar"
                }, void 0, false, {
                    fileName: "[project]/app/citas/estados/ModalInfoPendienteDiagnostico.tsx",
                    lineNumber: 199,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    onClick: onRegistrarDiagnostico,
                    disabled: editando,
                    title: editando ? 'Guarde o cancele la edición del triaje' : undefined,
                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["btnPrimary"]} disabled:cursor-not-allowed disabled:opacity-50`,
                    children: "Registrar diagnóstico"
                }, void 0, false, {
                    fileName: "[project]/app/citas/estados/ModalInfoPendienteDiagnostico.tsx",
                    lineNumber: 202,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/citas/estados/ModalInfoPendienteDiagnostico.tsx",
            lineNumber: 198,
            columnNumber: 9
        }, this),
        children: [
            errorGuardar && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "-mt-2 mb-4 text-xs font-semibold text-red-600",
                children: errorGuardar
            }, void 0, false, {
                fileName: "[project]/app/citas/estados/ModalInfoPendienteDiagnostico.tsx",
                lineNumber: 215,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 gap-5 md:grid-cols-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TarjetaPaciente"], {
                        cita: cita,
                        completo: true
                    }, void 0, false, {
                        fileName: "[project]/app/citas/estados/ModalInfoPendienteDiagnostico.tsx",
                        lineNumber: 219,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tarjeta"], {
                        titulo: "Triaje registrado",
                        icono: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PulseIcon"], {}, void 0, false, {
                            fileName: "[project]/app/citas/estados/ModalInfoPendienteDiagnostico.tsx",
                            lineNumber: 223,
                            columnNumber: 18
                        }, this),
                        derecha: editando ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-1.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: cancelarEdicion,
                                    disabled: guardando,
                                    "aria-label": "Cancelar edición",
                                    title: "Cancelar",
                                    className: "flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0d7a71]/40 disabled:cursor-not-allowed disabled:opacity-50",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(XIcon, {}, void 0, false, {
                                        fileName: "[project]/app/citas/estados/ModalInfoPendienteDiagnostico.tsx",
                                        lineNumber: 235,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/citas/estados/ModalInfoPendienteDiagnostico.tsx",
                                    lineNumber: 227,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    form: FORM_ID,
                                    disabled: guardando,
                                    "aria-label": "Guardar cambios",
                                    title: "Guardar",
                                    className: "flex h-8 w-8 items-center justify-center rounded-lg bg-[#0d7a71] text-white shadow-sm shadow-[#0d7a71]/25 transition hover:bg-[#0a625b] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0d7a71]/40 disabled:cursor-not-allowed disabled:opacity-60",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CheckIcon, {}, void 0, false, {
                                        fileName: "[project]/app/citas/estados/ModalInfoPendienteDiagnostico.tsx",
                                        lineNumber: 246,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/citas/estados/ModalInfoPendienteDiagnostico.tsx",
                                    lineNumber: 238,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/citas/estados/ModalInfoPendienteDiagnostico.tsx",
                            lineNumber: 226,
                            columnNumber: 15
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: empezarEdicion,
                            "aria-label": "Editar triaje",
                            title: "Editar triaje",
                            className: "flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-[#0d7a71]/10 hover:text-[#0d7a71] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0d7a71]/40",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EditIcon, {}, void 0, false, {
                                fileName: "[project]/app/citas/estados/ModalInfoPendienteDiagnostico.tsx",
                                lineNumber: 257,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/citas/estados/ModalInfoPendienteDiagnostico.tsx",
                            lineNumber: 250,
                            columnNumber: 15
                        }, this),
                        children: editando ? /* =================================================
               MODO EDICIÓN: mismas casillas, ahora editables
            ================================================= */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            id: FORM_ID,
                            onSubmit: guardar,
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 gap-2.5",
                                    children: [
                                        casilla('presionArterial', 'P. arterial', '120/80', 'mmHg', {
                                            required: true
                                        }),
                                        casilla('frecuenciaCardiaca', 'F. cardiaca', '80', 'lpm', {
                                            type: 'number',
                                            inputMode: 'numeric',
                                            required: true
                                        }),
                                        casilla('frecuenciaRespiratoria', 'F. respiratoria', '18', 'rpm', {
                                            type: 'number',
                                            inputMode: 'numeric'
                                        }),
                                        casilla('temperatura', 'Temperatura', '36.5', '°C', {
                                            type: 'number',
                                            step: '0.1',
                                            inputMode: 'decimal',
                                            required: true
                                        }),
                                        casilla('saturacion', 'SpO₂', '98', '%', {
                                            type: 'number',
                                            inputMode: 'numeric'
                                        }),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: casillaEdit,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: labelCasilla,
                                                    children: "Peso / Talla"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/citas/estados/ModalInfoPendienteDiagnostico.tsx",
                                                    lineNumber: 297,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-0.5 flex items-center gap-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            name: "peso",
                                                            type: "number",
                                                            step: "0.1",
                                                            inputMode: "decimal",
                                                            "aria-label": "Peso en kg",
                                                            value: form.peso,
                                                            onChange: handleChange,
                                                            placeholder: "70",
                                                            className: inputInline
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/citas/estados/ModalInfoPendienteDiagnostico.tsx",
                                                            lineNumber: 300,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-gray-300",
                                                            children: "/"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/citas/estados/ModalInfoPendienteDiagnostico.tsx",
                                                            lineNumber: 312,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            name: "talla",
                                                            type: "number",
                                                            inputMode: "numeric",
                                                            "aria-label": "Talla en cm",
                                                            value: form.talla,
                                                            onChange: handleChange,
                                                            placeholder: "170",
                                                            className: inputInline
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/citas/estados/ModalInfoPendienteDiagnostico.tsx",
                                                            lineNumber: 314,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "shrink-0 text-xs font-medium text-gray-400",
                                                            children: "kg/cm"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/citas/estados/ModalInfoPendienteDiagnostico.tsx",
                                                            lineNumber: 325,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/citas/estados/ModalInfoPendienteDiagnostico.tsx",
                                                    lineNumber: 299,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/citas/estados/ModalInfoPendienteDiagnostico.tsx",
                                            lineNumber: 296,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/citas/estados/ModalInfoPendienteDiagnostico.tsx",
                                    lineNumber: 267,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "edit-motivoConsulta",
                                            className: labelCasilla,
                                            children: "Motivo de consulta"
                                        }, void 0, false, {
                                            fileName: "[project]/app/citas/estados/ModalInfoPendienteDiagnostico.tsx",
                                            lineNumber: 333,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                            id: "edit-motivoConsulta",
                                            name: "motivoConsulta",
                                            rows: 3,
                                            value: form.motivoConsulta,
                                            onChange: handleChange,
                                            placeholder: "Describa por qué acude el paciente",
                                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["textareaClass"]} mt-1`
                                        }, void 0, false, {
                                            fileName: "[project]/app/citas/estados/ModalInfoPendienteDiagnostico.tsx",
                                            lineNumber: 337,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/citas/estados/ModalInfoPendienteDiagnostico.tsx",
                                    lineNumber: 332,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/citas/estados/ModalInfoPendienteDiagnostico.tsx",
                            lineNumber: 266,
                            columnNumber: 13
                        }, this) : /* =================================================
               MODO LECTURA
            ================================================= */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 gap-2.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Signo"], {
                                            label: "P. arterial",
                                            valor: triaje.presionArterial,
                                            unidad: "mmHg"
                                        }, void 0, false, {
                                            fileName: "[project]/app/citas/estados/ModalInfoPendienteDiagnostico.tsx",
                                            lineNumber: 354,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Signo"], {
                                            label: "F. cardiaca",
                                            valor: triaje.frecuenciaCardiaca,
                                            unidad: "lpm"
                                        }, void 0, false, {
                                            fileName: "[project]/app/citas/estados/ModalInfoPendienteDiagnostico.tsx",
                                            lineNumber: 355,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Signo"], {
                                            label: "F. respiratoria",
                                            valor: triaje.frecuenciaRespiratoria,
                                            unidad: "rpm"
                                        }, void 0, false, {
                                            fileName: "[project]/app/citas/estados/ModalInfoPendienteDiagnostico.tsx",
                                            lineNumber: 356,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Signo"], {
                                            label: "Temperatura",
                                            valor: triaje.temperatura,
                                            unidad: "°C"
                                        }, void 0, false, {
                                            fileName: "[project]/app/citas/estados/ModalInfoPendienteDiagnostico.tsx",
                                            lineNumber: 357,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Signo"], {
                                            label: "SpO₂",
                                            valor: triaje.saturacion,
                                            unidad: "%"
                                        }, void 0, false, {
                                            fileName: "[project]/app/citas/estados/ModalInfoPendienteDiagnostico.tsx",
                                            lineNumber: 358,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Signo"], {
                                            label: "Peso / Talla",
                                            valor: triaje.peso || triaje.talla ? `${triaje.peso}/${triaje.talla}` : '',
                                            unidad: "kg/cm"
                                        }, void 0, false, {
                                            fileName: "[project]/app/citas/estados/ModalInfoPendienteDiagnostico.tsx",
                                            lineNumber: 359,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/citas/estados/ModalInfoPendienteDiagnostico.tsx",
                                    lineNumber: 353,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Campo"], {
                                    label: "Motivo de consulta",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-medium text-gray-700",
                                        children: triaje.motivoConsulta || '---'
                                    }, void 0, false, {
                                        fileName: "[project]/app/citas/estados/ModalInfoPendienteDiagnostico.tsx",
                                        lineNumber: 367,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/citas/estados/ModalInfoPendienteDiagnostico.tsx",
                                    lineNumber: 366,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/citas/estados/ModalInfoPendienteDiagnostico.tsx",
                            lineNumber: 352,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/citas/estados/ModalInfoPendienteDiagnostico.tsx",
                        lineNumber: 221,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/citas/estados/ModalInfoPendienteDiagnostico.tsx",
                lineNumber: 218,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/citas/estados/ModalInfoPendienteDiagnostico.tsx",
        lineNumber: 192,
        columnNumber: 5
    }, this);
}
_s(ModalInfoPendienteDiagnostico, "HIkrlNzdH01jQTl13azmuxjDQ88=");
_c3 = ModalInfoPendienteDiagnostico;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "EditIcon");
__turbopack_context__.k.register(_c1, "CheckIcon");
__turbopack_context__.k.register(_c2, "XIcon");
__turbopack_context__.k.register(_c3, "ModalInfoPendienteDiagnostico");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/citas/estados/ModalInfoPendienteTriaje.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ModalInfoPendienteTriaje
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/citas/estados/ModalBase.tsx [app-client] (ecmascript)");
'use client';
;
;
function ModalInfoPendienteTriaje({ cita = __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CITA_EJEMPLO"], onClose, onRegistrarTriaje, onReprogramar, onCancelarCita }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalShell"], {
        titulo: "Pendiente Triaje",
        subtitulo: "Revise la información del paciente y la cita",
        tono: "amber",
        onClose: onClose,
        footer: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    onClick: onCancelarCita,
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["btnDanger"],
                    children: "Cancelar cita"
                }, void 0, false, {
                    fileName: "[project]/app/citas/estados/ModalInfoPendienteTriaje.tsx",
                    lineNumber: 57,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    onClick: onReprogramar,
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["btnSecondary"],
                    children: "Reprogramar cita"
                }, void 0, false, {
                    fileName: "[project]/app/citas/estados/ModalInfoPendienteTriaje.tsx",
                    lineNumber: 65,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    onClick: onRegistrarTriaje,
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["btnPrimary"],
                    children: "Registrar triaje"
                }, void 0, false, {
                    fileName: "[project]/app/citas/estados/ModalInfoPendienteTriaje.tsx",
                    lineNumber: 73,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/citas/estados/ModalInfoPendienteTriaje.tsx",
            lineNumber: 56,
            columnNumber: 9
        }, this),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-1 gap-5 md:grid-cols-2",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tarjeta"], {
                    titulo: "Información de la cita",
                    icono: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CalendarIcon"], {}, void 0, false, {
                        fileName: "[project]/app/citas/estados/ModalInfoPendienteTriaje.tsx",
                        lineNumber: 95,
                        columnNumber: 18
                    }, this),
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Campo"], {
                                label: "N° de cita",
                                children: cita.id
                            }, void 0, false, {
                                fileName: "[project]/app/citas/estados/ModalInfoPendienteTriaje.tsx",
                                lineNumber: 99,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Campo"], {
                                label: "Servicio / especialidad",
                                children: cita.especialidad
                            }, void 0, false, {
                                fileName: "[project]/app/citas/estados/ModalInfoPendienteTriaje.tsx",
                                lineNumber: 103,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Campo"], {
                                label: "Médico asignado",
                                children: cita.medico
                            }, void 0, false, {
                                fileName: "[project]/app/citas/estados/ModalInfoPendienteTriaje.tsx",
                                lineNumber: 107,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Campo"], {
                                        label: "Fecha",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatFecha"])(cita.fecha)
                                    }, void 0, false, {
                                        fileName: "[project]/app/citas/estados/ModalInfoPendienteTriaje.tsx",
                                        lineNumber: 112,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Campo"], {
                                        label: "Hora",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatHora"])(cita.hora)
                                    }, void 0, false, {
                                        fileName: "[project]/app/citas/estados/ModalInfoPendienteTriaje.tsx",
                                        lineNumber: 116,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/citas/estados/ModalInfoPendienteTriaje.tsx",
                                lineNumber: 111,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/citas/estados/ModalInfoPendienteTriaje.tsx",
                        lineNumber: 97,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/citas/estados/ModalInfoPendienteTriaje.tsx",
                    lineNumber: 93,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalBase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TarjetaPaciente"], {
                    cita: cita
                }, void 0, false, {
                    fileName: "[project]/app/citas/estados/ModalInfoPendienteTriaje.tsx",
                    lineNumber: 128,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/citas/estados/ModalInfoPendienteTriaje.tsx",
            lineNumber: 87,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/citas/estados/ModalInfoPendienteTriaje.tsx",
        lineNumber: 50,
        columnNumber: 5
    }, this);
}
_c = ModalInfoPendienteTriaje;
var _c;
__turbopack_context__.k.register(_c, "ModalInfoPendienteTriaje");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/citas/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CitasPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Sidebar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CitasTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/CitasTable.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$useSesion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/useSesion.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
/* =========================================================
   SERVICIOS (deben existir con este nombre exacto en la tabla `servicios`)
========================================================= */ const ESPECIALIDADES = [
    'Medicina General',
    'Flebología',
    'Urología',
    'Endocrinología',
    'Obstetricia',
    'Neurología',
    'Fisioterapia',
    'Podología',
    'Psicología',
    'Laboratorio'
];
/* =========================================================
   BACKEND <-> FRONTEND
========================================================= */ function sexoATexto(sexo) {
    return sexo === 'F' ? 'Femenino' : 'Masculino';
}
function sexoACodigo(sexo) {
    return sexo === 'Femenino' ? 'F' : 'M';
}
// Traduce el código del backend (estados_cita.codigo) al literal que usa CitasTable.
const ESTADO_POR_CODIGO = {
    pendiente_triaje: 'Pendientes',
    pendiente_diagnostico: 'Confirmadas',
    atendida: 'Atendidas',
    ausente: 'Ausente',
    cancelada: 'Cancelada'
};
function mapearCita(c) {
    const paciente = c.cuenta.paciente;
    return {
        id: `CIT-${String(c.id).padStart(3, '0')}`,
        citaId: c.id,
        hc: paciente.historiaClinica,
        dni: paciente.dni,
        paciente: `${paciente.nombres} ${paciente.apellidos}`.trim(),
        celular: paciente.celular ?? '',
        sexo: sexoATexto(paciente.sexo),
        especialidad: c.servicio.nombre,
        medico: c.programacionMedica ? `${c.programacionMedica.medico.nombres} ${c.programacionMedica.medico.apellidos}`.trim() : 'Por asignar',
        fecha: c.fechaCita,
        hora: c.horaInicio.slice(0, 5),
        estado: ESTADO_POR_CODIGO[c.estado.codigo]
    };
}
// =========================================================
// TRIAJE/DIAGNÓSTICO DEL BACKEND -> FORMA QUE ESPERA CitasTable
// =========================================================
function numeroATexto(valor) {
    return valor === null || valor === undefined ? '' : String(valor);
}
function triajeParaTabla(t) {
    return {
        id: t.id,
        presionArterial: t.presionArterial ?? '',
        frecuenciaCardiaca: numeroATexto(t.frecuenciaCardiaca),
        frecuenciaRespiratoria: numeroATexto(t.frecuenciaRespiratoria),
        temperatura: numeroATexto(t.temperatura),
        saturacion: numeroATexto(t.saturacionO2),
        peso: numeroATexto(t.peso),
        talla: numeroATexto(t.talla),
        motivoConsulta: t.motivoConsulta ?? ''
    };
}
function diagnosticoParaTabla(d, ordenesBackend) {
    const ordenes = ordenesBackend.map((o)=>({
            citaExamenId: o.id,
            examenId: o.examen.id,
            nombre: o.examen.nombre
        }));
    return {
        id: d.id,
        sintomas: d.sintomas ?? '',
        diagnostico: d.diagnostico,
        indicaciones: d.indicaciones ?? '',
        requiereLaboratorio: ordenes.length > 0,
        examenesLaboratorio: ordenes.map((o)=>o.nombre).join(', '),
        ordenes
    };
}
const FORM_INICIAL = {
    dni: '',
    nombres: '',
    apellidos: '',
    sexo: 'Masculino',
    celular: '',
    especialidad: 'Medicina General',
    fecha: '',
    hora: '',
    programacionId: ''
};
function CitasPage() {
    _s();
    const { cargando } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$useSesion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRequireSesion"])();
    const { openSidebar } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSidebar"])();
    const [citas, setCitas] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [cargandoCitas, setCargandoCitas] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [errorCitas, setErrorCitas] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [showModal, setShowModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(FORM_INICIAL);
    const [mensaje, setMensaje] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [examenesCatalogo, setExamenesCatalogo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    // Horarios ya programados (Programación Médica) para la especialidad y
    // fecha elegidas en "Agendar Cita"; de ahí sale a qué médico se asigna.
    const [horariosDisponibles, setHorariosDisponibles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [cargandoHorarios, setCargandoHorarios] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Paciente encontrado al buscar el DNI. Puede venir de dos lugares:
    // - de nuestra base, ya con historia clínica -> datos de solo lectura.
    // - de RENIEC (vía backend), sin historia clínica todavía -> son un punto
    //   de partida para un paciente nuevo, así que se dejan editables.
    const [pacienteEncontrado, setPacienteEncontrado] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [buscandoPaciente, setBuscandoPaciente] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [errorGuardar, setErrorGuardar] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [guardando, setGuardando] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const pacienteYaRegistrado = !!pacienteEncontrado?.historiaClinica;
    const mostrarMensaje = (texto)=>{
        setMensaje(texto);
        setTimeout(()=>setMensaje(''), 3500);
    };
    // Catálogo de laboratorio: se carga una sola vez, lo usa el modal de diagnóstico.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CitasPage.useEffect": ()=>{
            if (cargando) return;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["listarExamenesCatalogo"])().then({
                "CitasPage.useEffect": (examenes)=>setExamenesCatalogo(examenes.map({
                        "CitasPage.useEffect": (ex)=>({
                                id: ex.id,
                                nombre: ex.nombre,
                                categoria: ex.categoria.nombre
                            })
                    }["CitasPage.useEffect"]))
            }["CitasPage.useEffect"]).catch({
                "CitasPage.useEffect": ()=>{
                // Si falla, el modal de diagnóstico simplemente no deja elegir exámenes.
                }
            }["CitasPage.useEffect"]);
        }
    }["CitasPage.useEffect"], [
        cargando
    ]);
    // =========================================
    // CARGAR CITAS DEL BACKEND
    // =========================================
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CitasPage.useEffect": ()=>{
            if (cargando) return;
            let cancelado = false;
            // eslint-disable-next-line react-hooks/set-state-in-effect -- arranca el estado de carga antes del fetch, no deriva de render
            setCargandoCitas(true);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["listarCitas"])().then({
                "CitasPage.useEffect": (citasBackend)=>{
                    if (!cancelado) setCitas(citasBackend.map(mapearCita));
                }
            }["CitasPage.useEffect"]).catch({
                "CitasPage.useEffect": (err)=>{
                    if (!cancelado) {
                        setErrorCitas(err instanceof Error ? err.message : 'No se pudieron cargar las citas.');
                    }
                }
            }["CitasPage.useEffect"]).finally({
                "CitasPage.useEffect": ()=>{
                    if (!cancelado) setCargandoCitas(false);
                }
            }["CitasPage.useEffect"]);
            return ({
                "CitasPage.useEffect": ()=>{
                    cancelado = true;
                }
            })["CitasPage.useEffect"];
        }
    }["CitasPage.useEffect"], [
        cargando
    ]);
    // Horarios programados para la especialidad/fecha elegidas en "Agendar
    // Cita" (de ahí sale el médico). Sin fecha todavía no se busca nada.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CitasPage.useEffect": ()=>{
            if (!showModal || !form.fecha) {
                // eslint-disable-next-line react-hooks/set-state-in-effect -- limpia la lista si se cierra el modal o se borra la fecha, no deriva de render
                setHorariosDisponibles([]);
                return;
            }
            let cancelado = false;
            setCargandoHorarios(true);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["listarProgramacionMedica"])(form.fecha).then({
                "CitasPage.useEffect": (horarios)=>{
                    if (!cancelado) setHorariosDisponibles(horarios);
                }
            }["CitasPage.useEffect"]).catch({
                "CitasPage.useEffect": ()=>{
                    // Si falla, simplemente no se puede elegir médico; la cita se
                    // puede seguir agendando igual, queda "Por asignar".
                    if (!cancelado) setHorariosDisponibles([]);
                }
            }["CitasPage.useEffect"]).finally({
                "CitasPage.useEffect": ()=>{
                    if (!cancelado) setCargandoHorarios(false);
                }
            }["CitasPage.useEffect"]);
            return ({
                "CitasPage.useEffect": ()=>{
                    cancelado = true;
                }
            })["CitasPage.useEffect"];
        }
    }["CitasPage.useEffect"], [
        showModal,
        form.fecha
    ]);
    const horariosFiltrados = horariosDisponibles.filter((h)=>h.medico.especialidad?.trim().toLowerCase() === form.especialidad.trim().toLowerCase());
    // =========================================
    // CERRAR MODAL CON ESC
    // =========================================
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CitasPage.useEffect": ()=>{
            const handleEscape = {
                "CitasPage.useEffect.handleEscape": (event)=>{
                    if (event.key === 'Escape') setShowModal(false);
                }
            }["CitasPage.useEffect.handleEscape"];
            document.addEventListener('keydown', handleEscape);
            return ({
                "CitasPage.useEffect": ()=>document.removeEventListener('keydown', handleEscape)
            })["CitasPage.useEffect"];
        }
    }["CitasPage.useEffect"], []);
    // =========================================
    // BLOQUEAR SCROLL DEL BODY CON MODAL ABIERTO
    // =========================================
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CitasPage.useEffect": ()=>{
            document.body.style.overflow = showModal ? 'hidden' : '';
            return ({
                "CitasPage.useEffect": ()=>{
                    document.body.style.overflow = '';
                }
            })["CitasPage.useEffect"];
        }
    }["CitasPage.useEffect"], [
        showModal
    ]);
    // =========================================
    // MÉTRICAS (calculadas de datos reales)
    // =========================================
    const totalProgramadas = citas.length;
    const totalPendienteTriaje = citas.filter((c)=>c.estado === 'Pendientes').length;
    const totalPendienteDiagnostico = citas.filter((c)=>c.estado === 'Confirmadas').length;
    const totalAtendidas = citas.filter((c)=>c.estado === 'Atendidas').length;
    // =========================================
    // DNI -> HISTORIA CLÍNICA (autocompletar)
    // =========================================
    const handleFormChange = (e)=>{
        const { name, value } = e.target;
        setForm((prev)=>({
                ...prev,
                [name]: value,
                // El horario elegido era para la especialidad/fecha anteriores: si
                // cambia cualquiera de las dos, hay que volver a elegirlo.
                ...name === 'especialidad' || name === 'fecha' ? {
                    programacionId: ''
                } : {}
            }));
        // Si cambia el DNI después de haber encontrado un paciente, se
        // destrababan los campos: ya no aplica el autocompletado anterior.
        if (name === 'dni' && pacienteEncontrado) {
            setPacienteEncontrado(null);
        }
        if (errorGuardar) setErrorGuardar('');
    };
    const handleBuscarDni = async ()=>{
        if (form.dni.length !== 8) return;
        setBuscandoPaciente(true);
        try {
            const paciente = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buscarPacientePorDni"])(form.dni);
            if (paciente) {
                setPacienteEncontrado(paciente);
                setForm((prev)=>({
                        ...prev,
                        nombres: paciente.nombres,
                        apellidos: paciente.apellidos,
                        sexo: sexoATexto(paciente.sexo),
                        celular: paciente.celular ?? ''
                    }));
            } else {
                setPacienteEncontrado(null);
            }
        } catch (err) {
            setErrorGuardar(err instanceof Error ? err.message : 'No se pudo buscar el DNI.');
        } finally{
            setBuscandoPaciente(false);
        }
    };
    const cerrarModal = ()=>{
        setShowModal(false);
        setForm(FORM_INICIAL);
        setPacienteEncontrado(null);
        setErrorGuardar('');
    };
    // =========================================
    // GUARDAR NUEVA CITA
    // =========================================
    const handleGuardarCita = async (e)=>{
        e.preventDefault();
        setErrorGuardar('');
        setGuardando(true);
        try {
            const citaCreada = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["crearCita"])({
                paciente: {
                    dni: form.dni,
                    nombres: form.nombres,
                    apellidos: form.apellidos,
                    sexo: sexoACodigo(form.sexo),
                    celular: form.celular || undefined
                },
                especialidad: form.especialidad,
                fecha: form.fecha,
                hora: form.hora,
                programacionId: form.programacionId ? Number(form.programacionId) : undefined
            });
            setCitas((prev)=>[
                    mapearCita(citaCreada),
                    ...prev
                ]);
            cerrarModal();
            mostrarMensaje(`Cita registrada correctamente (historia clínica ${citaCreada.cuenta.paciente.historiaClinica})`);
        } catch (err) {
            setErrorGuardar(err instanceof Error ? err.message : 'No se pudo registrar la cita.');
        } finally{
            setGuardando(false);
        }
    };
    const actualizarEstadoLocal = (citaId, estado)=>{
        setCitas((prev)=>prev.map((c)=>c.citaId === citaId ? {
                    ...c,
                    estado
                } : c));
    };
    // =========================================
    // CANCELAR CITA -> pasa a "Cancelada" (solo si está Pendientes/Ausente)
    // =========================================
    const handleCancelarCita = async (id)=>{
        const cita = citas.find((c)=>c.id === id);
        if (!cita) return;
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cancelarCita"])(cita.citaId);
        actualizarEstadoLocal(cita.citaId, 'Cancelada');
        mostrarMensaje('Cita cancelada correctamente.');
    };
    // =========================================
    // REPROGRAMAR CITA -> cambia fecha/hora/médico y vuelve a "Pendientes"
    // =========================================
    const handleReprogramarCita = async (id, datos)=>{
        const cita = citas.find((c)=>c.id === id);
        if (!cita) return;
        const actualizada = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["reprogramarCita"])(cita.citaId, datos);
        setCitas((prev)=>prev.map((c)=>c.citaId === cita.citaId ? mapearCita(actualizada) : c));
        mostrarMensaje('Cita reprogramada correctamente.');
    };
    // Horarios programados (Programación Médica) para la especialidad de la
    // cita en la fecha elegida al reprogramar; si viene vacío, el modal
    // bloquea la reprogramación con una alerta.
    const handleBuscarHorariosReprogramacion = async (fecha, especialidad)=>{
        const horarios = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["listarProgramacionMedica"])(fecha);
        return horarios.filter((h)=>h.medico.especialidad?.trim().toLowerCase() === especialidad.trim().toLowerCase()).map((h)=>({
                id: h.id,
                horaInicio: h.horaInicio.slice(0, 5),
                etiqueta: `${h.medico.nombres} ${h.medico.apellidos} — ${h.turno === 'mañana' ? 'Mañana' : 'Tarde'} ${h.horaInicio.slice(0, 5)}-${h.horaFin.slice(0, 5)} · ${h.consultorio.nombre}`
            }));
    };
    // =========================================
    // ABRIR CITA -> trae triaje/diagnóstico antes de mostrar el modal
    // (lo llama CitasTable; "Pendientes"/"Ausente" no necesitan nada más)
    // =========================================
    const handleAbrirCita = async (cita)=>{
        if (cita.estado === 'Confirmadas') {
            const [triaje] = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["listarTriajes"])(cita.citaId);
            return {
                ...cita,
                triaje: triaje ? triajeParaTabla(triaje) : undefined
            };
        }
        if (cita.estado === 'Atendidas') {
            const [[triaje], [diagnostico], ordenes] = await Promise.all([
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["listarTriajes"])(cita.citaId),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["listarDiagnosticos"])(cita.citaId),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["listarCitaExamenes"])(cita.citaId)
            ]);
            return {
                ...cita,
                triaje: triaje ? triajeParaTabla(triaje) : undefined,
                diagnostico: diagnostico ? diagnosticoParaTabla(diagnostico, ordenes) : undefined
            };
        }
        return cita;
    };
    // =========================================
    // GUARDAR TRIAJE -> la cita pasa a "Confirmadas"
    // =========================================
    const handleGuardarTriaje = async (id, datos)=>{
        const cita = citas.find((c)=>c.id === id);
        if (!cita) return;
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["crearTriaje"])({
            citaId: cita.citaId,
            peso: datos.peso ? Number(datos.peso) : undefined,
            talla: datos.talla ? Number(datos.talla) : undefined,
            presionArterial: datos.presionArterial || undefined,
            temperatura: datos.temperatura ? Number(datos.temperatura) : undefined,
            frecuenciaCardiaca: datos.frecuenciaCardiaca ? Number(datos.frecuenciaCardiaca) : undefined,
            frecuenciaRespiratoria: datos.frecuenciaRespiratoria ? Number(datos.frecuenciaRespiratoria) : undefined,
            saturacionO2: datos.saturacion ? Number(datos.saturacion) : undefined,
            motivoConsulta: datos.motivoConsulta || undefined
        });
        actualizarEstadoLocal(cita.citaId, 'Confirmadas');
        mostrarMensaje('Triaje registrado correctamente.');
    };
    // =========================================
    // FINALIZAR DIAGNÓSTICO -> la cita pasa a "Atendidas"
    // =========================================
    const handleFinalizarAtencion = async (id, datos)=>{
        const cita = citas.find((c)=>c.id === id);
        if (!cita) return;
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["crearDiagnostico"])({
            citaId: cita.citaId,
            sintomas: datos.sintomas || undefined,
            diagnostico: datos.diagnostico,
            indicaciones: datos.indicaciones || undefined,
            examenIds: datos.examenIds
        });
        actualizarEstadoLocal(cita.citaId, 'Atendidas');
        mostrarMensaje('Diagnóstico registrado correctamente.');
    };
    // =========================================
    // EDICIÓN EN LÍNEA (Confirmadas/Atendidas): corrige un triaje o
    // diagnóstico ya guardado, sin cambiar el estado de la cita.
    // =========================================
    const handleActualizarTriaje = async (triajeId, datos)=>{
        const actualizado = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["actualizarTriaje"])(triajeId, {
            peso: datos.peso ? Number(datos.peso) : undefined,
            talla: datos.talla ? Number(datos.talla) : undefined,
            presionArterial: datos.presionArterial || undefined,
            temperatura: datos.temperatura ? Number(datos.temperatura) : undefined,
            frecuenciaCardiaca: datos.frecuenciaCardiaca ? Number(datos.frecuenciaCardiaca) : undefined,
            frecuenciaRespiratoria: datos.frecuenciaRespiratoria ? Number(datos.frecuenciaRespiratoria) : undefined,
            saturacionO2: datos.saturacion ? Number(datos.saturacion) : undefined,
            motivoConsulta: datos.motivoConsulta || undefined
        });
        mostrarMensaje('Triaje actualizado correctamente.');
        return triajeParaTabla(actualizado);
    };
    const handleActualizarDiagnostico = async (diagnosticoId, citaId, datos, ordenesActuales)=>{
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["actualizarDiagnostico"])(diagnosticoId, {
            sintomas: datos.sintomas || undefined,
            diagnostico: datos.diagnostico,
            indicaciones: datos.indicaciones || undefined
        });
        const idsActuales = ordenesActuales.map((o)=>o.examenId);
        const aAgregar = datos.examenIds.filter((id)=>!idsActuales.includes(id));
        const aQuitar = ordenesActuales.filter((o)=>!datos.examenIds.includes(o.examenId));
        await Promise.all([
            ...aAgregar.map((examenId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["crearCitaExamen"])(citaId, examenId)),
            ...aQuitar.map((o)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["eliminarCitaExamen"])(o.citaExamenId))
        ]);
        const [diagnosticoFresco] = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["listarDiagnosticos"])(citaId);
        const ordenesFrescas = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["listarCitaExamenes"])(citaId);
        mostrarMensaje('Diagnóstico actualizado correctamente.');
        return diagnosticoParaTabla(diagnosticoFresco, ordenesFrescas);
    };
    // Sin sesión confirmada no se muestra el panel; el hook ya está redirigiendo a /login.
    if (cargando) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-gray-50 flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs font-medium text-gray-400",
                children: "Cargando..."
            }, void 0, false, {
                fileName: "[project]/app/citas/page.tsx",
                lineNumber: 556,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/citas/page.tsx",
            lineNumber: 555,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-50 flex font-sans",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/app/citas/page.tsx",
                lineNumber: 565,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "flex-1 min-w-0 flex flex-col",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "h-16 min-h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3 min-w-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: openSidebar,
                                        className: "lg:hidden h-10 w-10 rounded-xl flex items-center justify-center text-gray-600 hover:bg-gray-100 active:bg-gray-200 transition-colors shrink-0",
                                        "aria-label": "Abrir menú",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "w-6 h-6",
                                            fill: "none",
                                            viewBox: "0 0 24 24",
                                            stroke: "currentColor",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: "2",
                                                d: "M4 6h16M4 12h16M4 18h16"
                                            }, void 0, false, {
                                                fileName: "[project]/app/citas/page.tsx",
                                                lineNumber: 580,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/citas/page.tsx",
                                            lineNumber: 579,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/citas/page.tsx",
                                        lineNumber: 574,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                className: "text-sm sm:text-base font-bold text-gray-900 truncate",
                                                children: "Agenda Médica del Día"
                                            }, void 0, false, {
                                                fileName: "[project]/app/citas/page.tsx",
                                                lineNumber: 585,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "hidden sm:inline text-[11px] text-gray-400 font-medium",
                                                children: new Date().toLocaleDateString('es-PE', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric'
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/app/citas/page.tsx",
                                                lineNumber: 588,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/citas/page.tsx",
                                        lineNumber: 584,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/citas/page.tsx",
                                lineNumber: 573,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setShowModal(true),
                                className: "flex items-center justify-center gap-2 bg-[#0d7a71] hover:bg-[#0a625b] text-white px-3 sm:px-4 py-2.5 rounded-xl text-xs font-bold shadow-md shadow-[#0d7a71]/20 transition-all active:scale-[0.98] shrink-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "w-4 h-4",
                                        fill: "none",
                                        viewBox: "0 0 24 24",
                                        stroke: "currentColor",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: "2",
                                            d: "M12 4v16m8-8H4"
                                        }, void 0, false, {
                                            fileName: "[project]/app/citas/page.tsx",
                                            lineNumber: 599,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/citas/page.tsx",
                                        lineNumber: 598,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "hidden sm:inline",
                                        children: "Agendar Cita"
                                    }, void 0, false, {
                                        fileName: "[project]/app/citas/page.tsx",
                                        lineNumber: 601,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "sm:hidden",
                                        children: "Agendar"
                                    }, void 0, false, {
                                        fileName: "[project]/app/citas/page.tsx",
                                        lineNumber: 602,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/citas/page.tsx",
                                lineNumber: 594,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/citas/page.tsx",
                        lineNumber: 571,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 p-4 sm:p-5 lg:p-6 space-y-5 sm:space-y-6 overflow-x-hidden",
                        children: [
                            mensaje && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-xl border border-[#0d7a71]/20 bg-[#0d7a71]/5 px-4 py-2.5 text-xs font-semibold text-[#0d7a71]",
                                children: mensaje
                            }, void 0, false, {
                                fileName: "[project]/app/citas/page.tsx",
                                lineNumber: 611,
                                columnNumber: 13
                            }, this),
                            errorCitas && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-xl border border-red-100 bg-red-50 px-4 py-2.5 text-xs font-semibold text-red-600",
                                children: errorCitas
                            }, void 0, false, {
                                fileName: "[project]/app/citas/page.tsx",
                                lineNumber: 618,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "min-w-0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-[10px] sm:text-xs text-gray-400 font-medium truncate",
                                                        children: "Total Programadas"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/citas/page.tsx",
                                                        lineNumber: 628,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xl sm:text-2xl font-extrabold text-gray-900 mt-1",
                                                        children: totalProgramadas
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/citas/page.tsx",
                                                        lineNumber: 629,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/citas/page.tsx",
                                                lineNumber: 627,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-9 w-9 sm:h-10 sm:w-10 rounded-xl sm:rounded-2xl bg-gray-50 flex items-center justify-center text-gray-500 shrink-0",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    className: "w-4 h-4 sm:w-5 sm:h-5",
                                                    fill: "none",
                                                    viewBox: "0 0 24 24",
                                                    stroke: "currentColor",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round",
                                                        strokeWidth: "2",
                                                        d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/citas/page.tsx",
                                                        lineNumber: 633,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/citas/page.tsx",
                                                    lineNumber: 632,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/citas/page.tsx",
                                                lineNumber: 631,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/citas/page.tsx",
                                        lineNumber: 626,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "min-w-0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-[10px] sm:text-xs text-amber-600 font-medium truncate",
                                                        children: "Pendiente de Triaje"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/citas/page.tsx",
                                                        lineNumber: 640,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xl sm:text-2xl font-extrabold text-amber-700 mt-1",
                                                        children: totalPendienteTriaje
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/citas/page.tsx",
                                                        lineNumber: 641,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/citas/page.tsx",
                                                lineNumber: 639,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-9 w-9 sm:h-10 sm:w-10 rounded-xl sm:rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    className: "w-4 h-4 sm:w-5 sm:h-5",
                                                    fill: "none",
                                                    viewBox: "0 0 24 24",
                                                    stroke: "currentColor",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round",
                                                        strokeWidth: "2",
                                                        d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/citas/page.tsx",
                                                        lineNumber: 645,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/citas/page.tsx",
                                                    lineNumber: 644,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/citas/page.tsx",
                                                lineNumber: 643,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/citas/page.tsx",
                                        lineNumber: 638,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "min-w-0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-[10px] sm:text-xs text-violet-600 font-medium truncate",
                                                        children: "Pendiente de Diagnóstico"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/citas/page.tsx",
                                                        lineNumber: 652,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xl sm:text-2xl font-extrabold text-violet-700 mt-1",
                                                        children: totalPendienteDiagnostico
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/citas/page.tsx",
                                                        lineNumber: 653,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/citas/page.tsx",
                                                lineNumber: 651,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-9 w-9 sm:h-10 sm:w-10 rounded-xl sm:rounded-2xl bg-violet-50 flex items-center justify-center text-violet-600 shrink-0",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    className: "w-4 h-4 sm:w-5 sm:h-5",
                                                    fill: "none",
                                                    viewBox: "0 0 24 24",
                                                    stroke: "currentColor",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round",
                                                        strokeWidth: "2",
                                                        d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/citas/page.tsx",
                                                        lineNumber: 657,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/citas/page.tsx",
                                                    lineNumber: 656,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/citas/page.tsx",
                                                lineNumber: 655,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/citas/page.tsx",
                                        lineNumber: 650,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "min-w-0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-[10px] sm:text-xs text-blue-600 font-medium truncate",
                                                        children: "Atendidas"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/citas/page.tsx",
                                                        lineNumber: 664,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xl sm:text-2xl font-extrabold text-blue-700 mt-1",
                                                        children: totalAtendidas
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/citas/page.tsx",
                                                        lineNumber: 665,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/citas/page.tsx",
                                                lineNumber: 663,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-9 w-9 sm:h-10 sm:w-10 rounded-xl sm:rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    className: "w-4 h-4 sm:w-5 sm:h-5",
                                                    fill: "none",
                                                    viewBox: "0 0 24 24",
                                                    stroke: "currentColor",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round",
                                                        strokeWidth: "2",
                                                        d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/citas/page.tsx",
                                                        lineNumber: 669,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/citas/page.tsx",
                                                    lineNumber: 668,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/citas/page.tsx",
                                                lineNumber: 667,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/citas/page.tsx",
                                        lineNumber: 662,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/citas/page.tsx",
                                lineNumber: 624,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "w-full min-w-0",
                                children: cargandoCitas ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-2xl border border-gray-100 bg-white p-8 text-center text-xs font-medium text-gray-400",
                                    children: "Cargando citas..."
                                }, void 0, false, {
                                    fileName: "[project]/app/citas/page.tsx",
                                    lineNumber: 678,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CitasTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    citas: citas,
                                    examenesCatalogo: examenesCatalogo,
                                    onAbrirCita: handleAbrirCita,
                                    onCancelarCita: handleCancelarCita,
                                    onReprogramarCita: handleReprogramarCita,
                                    onBuscarHorariosReprogramacion: handleBuscarHorariosReprogramacion,
                                    onGuardarTriaje: handleGuardarTriaje,
                                    onFinalizarAtencion: handleFinalizarAtencion,
                                    onActualizarTriaje: handleActualizarTriaje,
                                    onActualizarDiagnostico: handleActualizarDiagnostico
                                }, void 0, false, {
                                    fileName: "[project]/app/citas/page.tsx",
                                    lineNumber: 682,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/citas/page.tsx",
                                lineNumber: 676,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/citas/page.tsx",
                        lineNumber: 607,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/citas/page.tsx",
                lineNumber: 568,
                columnNumber: 7
            }, this),
            showModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/45 backdrop-blur-sm p-3 sm:p-4",
                onMouseDown: (e)=>{
                    if (e.target === e.currentTarget) cerrarModal();
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full max-w-lg max-h-[94vh] overflow-y-auto bg-white rounded-[26px] shadow-2xl border border-gray-100 p-5 sm:p-7",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-start justify-between gap-4 pb-5 border-b border-gray-100",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "min-w-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-lg sm:text-xl font-bold text-gray-900",
                                            children: "Registrar Nueva Cita"
                                        }, void 0, false, {
                                            fileName: "[project]/app/citas/page.tsx",
                                            lineNumber: 712,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs sm:text-sm text-gray-400 mt-1",
                                            children: "Complete los datos del paciente"
                                        }, void 0, false, {
                                            fileName: "[project]/app/citas/page.tsx",
                                            lineNumber: 713,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/citas/page.tsx",
                                    lineNumber: 711,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: cerrarModal,
                                    "aria-label": "Cerrar modal",
                                    className: "w-9 h-9 shrink-0 rounded-xl flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "w-5 h-5",
                                        fill: "none",
                                        viewBox: "0 0 24 24",
                                        stroke: "currentColor",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: "2",
                                            d: "M6 18L18 6M6 6l12 12"
                                        }, void 0, false, {
                                            fileName: "[project]/app/citas/page.tsx",
                                            lineNumber: 723,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/citas/page.tsx",
                                        lineNumber: 722,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/citas/page.tsx",
                                    lineNumber: 716,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/citas/page.tsx",
                            lineNumber: 710,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: handleGuardarCita,
                            className: "mt-5 space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "dni",
                                            className: "mb-2 block text-sm font-semibold text-gray-700",
                                            children: "DNI *"
                                        }, void 0, false, {
                                            fileName: "[project]/app/citas/page.tsx",
                                            lineNumber: 731,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            id: "dni",
                                            name: "dni",
                                            type: "text",
                                            required: true,
                                            maxLength: 8,
                                            inputMode: "numeric",
                                            value: form.dni,
                                            onChange: handleFormChange,
                                            onBlur: handleBuscarDni,
                                            placeholder: "Ingrese el DNI",
                                            className: "h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-900 outline-none transition focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/15"
                                        }, void 0, false, {
                                            fileName: "[project]/app/citas/page.tsx",
                                            lineNumber: 732,
                                            columnNumber: 17
                                        }, this),
                                        buscandoPaciente && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1.5 text-[11px] font-medium text-gray-400",
                                            children: "Buscando historia clínica..."
                                        }, void 0, false, {
                                            fileName: "[project]/app/citas/page.tsx",
                                            lineNumber: 746,
                                            columnNumber: 19
                                        }, this),
                                        !buscandoPaciente && pacienteYaRegistrado && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1.5 text-[11px] font-semibold text-[#0d7a71]",
                                            children: [
                                                "Paciente ya registrado — ",
                                                pacienteEncontrado?.historiaClinica
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/citas/page.tsx",
                                            lineNumber: 749,
                                            columnNumber: 19
                                        }, this),
                                        !buscandoPaciente && pacienteEncontrado && !pacienteYaRegistrado && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1.5 text-[11px] font-medium text-gray-400",
                                            children: "Encontrado en RENIEC: verifique los datos para crear su historia clínica."
                                        }, void 0, false, {
                                            fileName: "[project]/app/citas/page.tsx",
                                            lineNumber: 754,
                                            columnNumber: 19
                                        }, this),
                                        !buscandoPaciente && !pacienteEncontrado && form.dni.length === 8 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1.5 text-[11px] font-medium text-gray-400",
                                            children: "Paciente nuevo: complete sus datos para crear su historia clínica."
                                        }, void 0, false, {
                                            fileName: "[project]/app/citas/page.tsx",
                                            lineNumber: 759,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/citas/page.tsx",
                                    lineNumber: 730,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 gap-4 sm:grid-cols-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    htmlFor: "nombres",
                                                    className: "mb-2 block text-sm font-semibold text-gray-700",
                                                    children: "Nombres *"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/citas/page.tsx",
                                                    lineNumber: 767,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    id: "nombres",
                                                    name: "nombres",
                                                    type: "text",
                                                    required: true,
                                                    disabled: pacienteYaRegistrado,
                                                    value: form.nombres,
                                                    onChange: handleFormChange,
                                                    placeholder: "Nombres",
                                                    className: "h-11 w-full rounded-xl border border-gray-200 px-4 text-sm text-gray-900 outline-none focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/15 disabled:bg-gray-50 disabled:text-gray-500"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/citas/page.tsx",
                                                    lineNumber: 768,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/citas/page.tsx",
                                            lineNumber: 766,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    htmlFor: "apellidos",
                                                    className: "mb-2 block text-sm font-semibold text-gray-700",
                                                    children: "Apellidos *"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/citas/page.tsx",
                                                    lineNumber: 782,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    id: "apellidos",
                                                    name: "apellidos",
                                                    type: "text",
                                                    required: true,
                                                    disabled: pacienteYaRegistrado,
                                                    value: form.apellidos,
                                                    onChange: handleFormChange,
                                                    placeholder: "Apellidos",
                                                    className: "h-11 w-full rounded-xl border border-gray-200 px-4 text-sm text-gray-900 outline-none focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/15 disabled:bg-gray-50 disabled:text-gray-500"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/citas/page.tsx",
                                                    lineNumber: 783,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/citas/page.tsx",
                                            lineNumber: 781,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/citas/page.tsx",
                                    lineNumber: 765,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 gap-4 sm:grid-cols-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    htmlFor: "sexo",
                                                    className: "mb-2 block text-sm font-semibold text-gray-700",
                                                    children: "Sexo"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/citas/page.tsx",
                                                    lineNumber: 799,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    id: "sexo",
                                                    name: "sexo",
                                                    value: form.sexo,
                                                    onChange: handleFormChange,
                                                    disabled: pacienteYaRegistrado,
                                                    className: "h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-700 outline-none focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/15 disabled:bg-gray-50 disabled:text-gray-500",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "Masculino",
                                                            children: "Masculino"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/citas/page.tsx",
                                                            lineNumber: 808,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "Femenino",
                                                            children: "Femenino"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/citas/page.tsx",
                                                            lineNumber: 809,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/citas/page.tsx",
                                                    lineNumber: 800,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/citas/page.tsx",
                                            lineNumber: 798,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    htmlFor: "celular",
                                                    className: "mb-2 block text-sm font-semibold text-gray-700",
                                                    children: "Celular"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/citas/page.tsx",
                                                    lineNumber: 814,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    id: "celular",
                                                    name: "celular",
                                                    type: "tel",
                                                    inputMode: "numeric",
                                                    disabled: pacienteYaRegistrado,
                                                    value: form.celular,
                                                    onChange: handleFormChange,
                                                    placeholder: "999 999 999",
                                                    className: "h-11 w-full rounded-xl border border-gray-200 px-4 text-sm text-gray-900 outline-none focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/15 disabled:bg-gray-50 disabled:text-gray-500"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/citas/page.tsx",
                                                    lineNumber: 815,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/citas/page.tsx",
                                            lineNumber: 813,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/citas/page.tsx",
                                    lineNumber: 797,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "especialidad",
                                            className: "mb-2 block text-sm font-semibold text-gray-700",
                                            children: "Servicio *"
                                        }, void 0, false, {
                                            fileName: "[project]/app/citas/page.tsx",
                                            lineNumber: 830,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            id: "especialidad",
                                            name: "especialidad",
                                            required: true,
                                            value: form.especialidad,
                                            onChange: handleFormChange,
                                            className: "h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-700 outline-none focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/15",
                                            children: ESPECIALIDADES.map((nombre)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: nombre,
                                                    children: nombre
                                                }, nombre, false, {
                                                    fileName: "[project]/app/citas/page.tsx",
                                                    lineNumber: 840,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/citas/page.tsx",
                                            lineNumber: 831,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/citas/page.tsx",
                                    lineNumber: 829,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 gap-4 sm:grid-cols-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    htmlFor: "fecha",
                                                    className: "mb-2 block text-sm font-semibold text-gray-700",
                                                    children: "Fecha *"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/citas/page.tsx",
                                                    lineNumber: 847,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    id: "fecha",
                                                    name: "fecha",
                                                    type: "date",
                                                    required: true,
                                                    value: form.fecha,
                                                    onChange: handleFormChange,
                                                    className: "h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-700 outline-none focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/15"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/citas/page.tsx",
                                                    lineNumber: 848,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/citas/page.tsx",
                                            lineNumber: 846,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    htmlFor: "hora",
                                                    className: "mb-2 block text-sm font-semibold text-gray-700",
                                                    children: "Hora *"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/citas/page.tsx",
                                                    lineNumber: 860,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    id: "hora",
                                                    name: "hora",
                                                    type: "time",
                                                    required: true,
                                                    step: "1800",
                                                    value: form.hora,
                                                    onChange: handleFormChange,
                                                    className: "h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-700 outline-none focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/15"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/citas/page.tsx",
                                                    lineNumber: 861,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-1 text-[10px] text-gray-400",
                                                    children: "Las citas se manejan en bloques de 30 minutos."
                                                }, void 0, false, {
                                                    fileName: "[project]/app/citas/page.tsx",
                                                    lineNumber: 871,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/citas/page.tsx",
                                            lineNumber: 859,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/citas/page.tsx",
                                    lineNumber: 845,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "programacionId",
                                            className: "mb-2 block text-sm font-semibold text-gray-700",
                                            children: "Médico"
                                        }, void 0, false, {
                                            fileName: "[project]/app/citas/page.tsx",
                                            lineNumber: 876,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            id: "programacionId",
                                            name: "programacionId",
                                            value: form.programacionId,
                                            onChange: handleFormChange,
                                            disabled: !form.fecha || cargandoHorarios || horariosFiltrados.length === 0,
                                            className: "h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-700 outline-none focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/15 disabled:bg-gray-50 disabled:text-gray-400",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    children: "Por asignar"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/citas/page.tsx",
                                                    lineNumber: 887,
                                                    columnNumber: 19
                                                }, this),
                                                horariosFiltrados.map((h)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: h.id,
                                                        children: [
                                                            h.medico.nombres,
                                                            " ",
                                                            h.medico.apellidos,
                                                            " — ",
                                                            h.turno === 'mañana' ? 'Mañana' : 'Tarde',
                                                            ' ',
                                                            h.horaInicio.slice(0, 5),
                                                            "-",
                                                            h.horaFin.slice(0, 5),
                                                            " · ",
                                                            h.consultorio.nombre
                                                        ]
                                                    }, h.id, true, {
                                                        fileName: "[project]/app/citas/page.tsx",
                                                        lineNumber: 889,
                                                        columnNumber: 21
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/citas/page.tsx",
                                            lineNumber: 879,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1.5 text-[11px] text-gray-400",
                                            children: !form.fecha ? 'Elige una fecha para ver los médicos programados ese día.' : cargandoHorarios ? 'Buscando médicos programados...' : horariosFiltrados.length === 0 ? 'Nadie está programado ese día para este servicio (Programación Médica). Puedes agendar igual; el médico quedará "Por asignar".' : 'Solo aparecen los médicos ya programados ese día para este servicio.'
                                        }, void 0, false, {
                                            fileName: "[project]/app/citas/page.tsx",
                                            lineNumber: 895,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/citas/page.tsx",
                                    lineNumber: 875,
                                    columnNumber: 15
                                }, this),
                                errorGuardar && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-xl border border-red-100 bg-red-50 p-3 text-xs font-semibold text-red-600",
                                    children: errorGuardar
                                }, void 0, false, {
                                    fileName: "[project]/app/citas/page.tsx",
                                    lineNumber: 907,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: cerrarModal,
                                            disabled: guardando,
                                            className: "h-11 rounded-xl border border-gray-200 bg-white text-sm font-bold text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60",
                                            children: "Cancelar"
                                        }, void 0, false, {
                                            fileName: "[project]/app/citas/page.tsx",
                                            lineNumber: 913,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "submit",
                                            disabled: guardando,
                                            className: "h-11 rounded-xl bg-[#0d7a71] text-sm font-bold text-white shadow-md shadow-[#0d7a71]/20 transition hover:bg-[#0a625b] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70",
                                            children: guardando ? 'Guardando...' : 'Guardar Cita'
                                        }, void 0, false, {
                                            fileName: "[project]/app/citas/page.tsx",
                                            lineNumber: 922,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/citas/page.tsx",
                                    lineNumber: 912,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/citas/page.tsx",
                            lineNumber: 728,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/citas/page.tsx",
                    lineNumber: 708,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/citas/page.tsx",
                lineNumber: 702,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/citas/page.tsx",
        lineNumber: 562,
        columnNumber: 5
    }, this);
}
_s(CitasPage, "9l5bsoyPpLDsPr9XiGod4NVbhv4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$useSesion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRequireSesion"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSidebar"]
    ];
});
_c = CitasPage;
var _c;
__turbopack_context__.k.register(_c, "CitasPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/CitasTable.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CitasTable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
// Modales del flujo por estado (carpeta app/citas/estados/)
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalInfoPendienteTriaje$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/citas/estados/ModalInfoPendienteTriaje.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalCitaPendienteTriaje$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/citas/estados/ModalCitaPendienteTriaje.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalInfoPendienteDiagnostico$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/citas/estados/ModalInfoPendienteDiagnostico.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalCitaDiagnostico$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/citas/estados/ModalCitaDiagnostico.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalCitaAtendida$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/citas/estados/ModalCitaAtendida.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalInfoAusente$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/citas/estados/ModalInfoAusente.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalCitaCancelada$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/citas/estados/ModalCitaCancelada.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalCitaReprogramar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/citas/estados/ModalCitaReprogramar.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
// Valores vacíos para no mostrar los datos de ejemplo de los modales.
const TRIAJE_VACIO = {
    presionArterial: '',
    frecuenciaCardiaca: '',
    frecuenciaRespiratoria: '',
    temperatura: '',
    saturacion: '',
    peso: '',
    talla: '',
    motivoConsulta: ''
};
const DIAGNOSTICO_VACIO = {
    sintomas: '',
    diagnostico: '',
    indicaciones: '',
    requiereLaboratorio: false,
    examenesLaboratorio: '',
    ordenes: []
};
/* =========================================================
   OPCIONES
========================================================= */ // Deben coincidir con los nombres reales de la tabla `servicios` del backend.
const servicios = [
    'Todos los servicios',
    'Medicina General',
    'Flebología',
    'Urología',
    'Endocrinología',
    'Obstetricia',
    'Neurología',
    'Fisioterapia',
    'Podología',
    'Psicología',
    'Laboratorio'
];
const estadosFiltro = [
    'Todos los estados',
    'Confirmadas',
    'Pendientes',
    'Atendidas',
    'Ausente',
    'Cancelada'
];
/* =========================================================
   ICONOS
========================================================= */ function SearchIcon({ size = 16 }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "11",
                cy: "11",
                r: "7"
            }, void 0, false, {
                fileName: "[project]/components/CitasTable.tsx",
                lineNumber: 150,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "m20 20-3.5-3.5"
            }, void 0, false, {
                fileName: "[project]/components/CitasTable.tsx",
                lineNumber: 151,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/CitasTable.tsx",
        lineNumber: 149,
        columnNumber: 5
    }, this);
}
_c = SearchIcon;
function CalendarIcon({ size = 15 }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "3",
                y: "4",
                width: "18",
                height: "17",
                rx: "2"
            }, void 0, false, {
                fileName: "[project]/components/CitasTable.tsx",
                lineNumber: 159,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M16 2v4M8 2v4M3 10h18"
            }, void 0, false, {
                fileName: "[project]/components/CitasTable.tsx",
                lineNumber: 160,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/CitasTable.tsx",
        lineNumber: 158,
        columnNumber: 5
    }, this);
}
_c1 = CalendarIcon;
function RefreshIcon({ size = 17 }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M20 11a8.1 8.1 0 0 0-14.5-4.9L4 8"
            }, void 0, false, {
                fileName: "[project]/components/CitasTable.tsx",
                lineNumber: 168,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M4 4v4h4"
            }, void 0, false, {
                fileName: "[project]/components/CitasTable.tsx",
                lineNumber: 169,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M4 13a8.1 8.1 0 0 0 14.5 4.9L20 16"
            }, void 0, false, {
                fileName: "[project]/components/CitasTable.tsx",
                lineNumber: 170,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M20 20v-4h-4"
            }, void 0, false, {
                fileName: "[project]/components/CitasTable.tsx",
                lineNumber: 171,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/CitasTable.tsx",
        lineNumber: 167,
        columnNumber: 5
    }, this);
}
_c2 = RefreshIcon;
function ClockIcon({ size = 14 }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "12",
                cy: "12",
                r: "9"
            }, void 0, false, {
                fileName: "[project]/components/CitasTable.tsx",
                lineNumber: 179,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M12 7v5l3 2"
            }, void 0, false, {
                fileName: "[project]/components/CitasTable.tsx",
                lineNumber: 180,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/CitasTable.tsx",
        lineNumber: 178,
        columnNumber: 5
    }, this);
}
_c3 = ClockIcon;
function FilterIcon({ size = 15 }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M4 6h16M7 12h10M10 18h4"
        }, void 0, false, {
            fileName: "[project]/components/CitasTable.tsx",
            lineNumber: 188,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/CitasTable.tsx",
        lineNumber: 187,
        columnNumber: 5
    }, this);
}
_c4 = FilterIcon;
function SortIcon({ size = 15 }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M8 5v14"
            }, void 0, false, {
                fileName: "[project]/components/CitasTable.tsx",
                lineNumber: 196,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "m5 8 3-3 3 3"
            }, void 0, false, {
                fileName: "[project]/components/CitasTable.tsx",
                lineNumber: 197,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M16 19V5"
            }, void 0, false, {
                fileName: "[project]/components/CitasTable.tsx",
                lineNumber: 198,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "m13 16 3 3 3-3"
            }, void 0, false, {
                fileName: "[project]/components/CitasTable.tsx",
                lineNumber: 199,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/CitasTable.tsx",
        lineNumber: 195,
        columnNumber: 5
    }, this);
}
_c5 = SortIcon;
function ChevronDown({ size = 15 }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "m6 9 6 6 6-6"
        }, void 0, false, {
            fileName: "[project]/components/CitasTable.tsx",
            lineNumber: 207,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/CitasTable.tsx",
        lineNumber: 206,
        columnNumber: 5
    }, this);
}
_c6 = ChevronDown;
function TrashIcon({ size = 16 }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                points: "3 6 5 6 21 6"
            }, void 0, false, {
                fileName: "[project]/components/CitasTable.tsx",
                lineNumber: 215,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M19 6l-1 14H6L5 6"
            }, void 0, false, {
                fileName: "[project]/components/CitasTable.tsx",
                lineNumber: 216,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M10 11v6"
            }, void 0, false, {
                fileName: "[project]/components/CitasTable.tsx",
                lineNumber: 217,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M14 11v6"
            }, void 0, false, {
                fileName: "[project]/components/CitasTable.tsx",
                lineNumber: 218,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M9 6V4h6v2"
            }, void 0, false, {
                fileName: "[project]/components/CitasTable.tsx",
                lineNumber: 219,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/CitasTable.tsx",
        lineNumber: 214,
        columnNumber: 5
    }, this);
}
_c7 = TrashIcon;
/* =========================================================
   FUNCIONES
========================================================= */ function formatFecha(fecha) {
    const [year, month, day] = fecha.split('-');
    return `${day}/${month}/${year}`;
}
function formatHora(hora) {
    const [hoursString, minutes] = hora.split(':');
    let hours = Number(hoursString);
    const suffix = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    if (hours === 0) hours = 12;
    return `${hours}:${minutes} ${suffix}`;
}
/* =========================================================
   ESTILOS DE ESTADO
========================================================= */ const estadoStyles = {
    Confirmadas: {
        badge: 'bg-emerald-50 text-emerald-700',
        dot: 'bg-emerald-500'
    },
    Pendientes: {
        badge: 'bg-amber-50 text-amber-700',
        dot: 'bg-amber-500'
    },
    Atendidas: {
        badge: 'bg-blue-50 text-blue-700',
        dot: 'bg-blue-500'
    },
    Ausente: {
        badge: 'bg-gray-50 text-gray-700',
        dot: 'bg-gray-500'
    },
    Cancelada: {
        badge: 'bg-red-50 text-red-700',
        dot: 'bg-red-500'
    }
};
function CitasTable({ citas, examenesCatalogo, onAbrirCita, onCancelarCita, onReprogramarCita, onBuscarHorariosReprogramacion, onGuardarTriaje, onFinalizarAtencion, onActualizarTriaje, onActualizarDiagnostico }) {
    _s();
    /* FILTROS */ const [searchInput, setSearchInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [servicio, setServicio] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('Todos los servicios');
    const [estado, setEstado] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('Todos los estados');
    const [fechaDesde, setFechaDesde] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [fechaHasta, setFechaHasta] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [orden, setOrden] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('proximas');
    /* MODALES POR ESTADO (al hacer click en una fila)
     vista 'info'        -> ventana con los datos y las acciones
     vista 'formulario'  -> formulario de triaje o de diagnóstico
     vista 'reprogramar' -> pantalla de reprogramación (solo visual, sin backend) */ const [citaSeleccionada, setCitaSeleccionada] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [vista, setVista] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('info');
    const [cargandoDetalle, setCargandoDetalle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const abrirCita = async (cita)=>{
        setVista('info');
        if (cita.estado === 'Confirmadas' || cita.estado === 'Atendidas') {
            setCargandoDetalle(true);
            try {
                setCitaSeleccionada(await onAbrirCita(cita));
            } catch (err) {
                window.alert(err instanceof Error ? err.message : 'No se pudo cargar la información de la cita.');
            } finally{
                setCargandoDetalle(false);
            }
            return;
        }
        setCitaSeleccionada(cita);
    };
    const cerrarModal = ()=>{
        setCitaSeleccionada(null);
        setVista('info');
    };
    const citasProcesadas = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CitasTable.useMemo[citasProcesadas]": ()=>{
            let resultado = [
                ...citas
            ];
            if (searchTerm.trim()) {
                const texto = searchTerm.toLowerCase().trim();
                resultado = resultado.filter({
                    "CitasTable.useMemo[citasProcesadas]": (cita)=>[
                            cita.id,
                            cita.hc,
                            cita.dni,
                            cita.paciente,
                            cita.especialidad,
                            cita.medico
                        ].some({
                            "CitasTable.useMemo[citasProcesadas]": (valor)=>valor.toLowerCase().includes(texto)
                        }["CitasTable.useMemo[citasProcesadas]"])
                }["CitasTable.useMemo[citasProcesadas]"]);
            }
            if (servicio !== 'Todos los servicios') {
                resultado = resultado.filter({
                    "CitasTable.useMemo[citasProcesadas]": (cita)=>cita.especialidad === servicio
                }["CitasTable.useMemo[citasProcesadas]"]);
            }
            if (estado !== 'Todos los estados') {
                resultado = resultado.filter({
                    "CitasTable.useMemo[citasProcesadas]": (cita)=>cita.estado === estado
                }["CitasTable.useMemo[citasProcesadas]"]);
            }
            if (fechaDesde) {
                resultado = resultado.filter({
                    "CitasTable.useMemo[citasProcesadas]": (cita)=>cita.fecha >= fechaDesde
                }["CitasTable.useMemo[citasProcesadas]"]);
            }
            if (fechaHasta) {
                resultado = resultado.filter({
                    "CitasTable.useMemo[citasProcesadas]": (cita)=>cita.fecha <= fechaHasta
                }["CitasTable.useMemo[citasProcesadas]"]);
            }
            resultado.sort({
                "CitasTable.useMemo[citasProcesadas]": (a, b)=>{
                    const fechaA = `${a.fecha} ${a.hora}`;
                    const fechaB = `${b.fecha} ${b.hora}`;
                    return orden === 'proximas' ? fechaA.localeCompare(fechaB) : fechaB.localeCompare(fechaA);
                }
            }["CitasTable.useMemo[citasProcesadas]"]);
            return resultado;
        }
    }["CitasTable.useMemo[citasProcesadas]"], [
        citas,
        searchTerm,
        servicio,
        estado,
        fechaDesde,
        fechaHasta,
        orden
    ]);
    const handleBuscar = ()=>setSearchTerm(searchInput);
    const handleSearchKeyDown = (e)=>{
        if (e.key === 'Enter') handleBuscar();
    };
    const handleHoy = ()=>{
        const hoy = new Date();
        const year = hoy.getFullYear();
        const month = String(hoy.getMonth() + 1).padStart(2, '0');
        const day = String(hoy.getDate()).padStart(2, '0');
        const fechaHoy = `${year}-${month}-${day}`;
        setFechaDesde(fechaHoy);
        setFechaHasta(fechaHoy);
    };
    const handleLimpiarFiltros = ()=>{
        setSearchInput('');
        setSearchTerm('');
        setServicio('Todos los servicios');
        setEstado('Todos los estados');
        setFechaDesde('');
        setFechaHasta('');
        setOrden('proximas');
    };
    const hayFiltrosActivos = searchTerm || servicio !== 'Todos los servicios' || estado !== 'Todos los estados' || fechaDesde || fechaHasta;
    // Cancelar no tiene su propio formulario (solo confirmación), así que
    // aquí mismo se llama al backend y se avisa con un alert si falla; las
    // demás acciones (triaje/diagnóstico/reprogramar) muestran el error
    // dentro de su propio modal, que es el que sabe si se está guardando.
    const handleCancelar = async (id)=>{
        if (!window.confirm('¿Deseas cancelar esta cita?')) return;
        try {
            await onCancelarCita(id);
            cerrarModal();
        } catch (err) {
            window.alert(err instanceof Error ? err.message : 'No se pudo cancelar la cita.');
        }
    };
    const handleGuardarTriaje = async (triaje)=>{
        if (!citaSeleccionada) return;
        await onGuardarTriaje(citaSeleccionada.id, triaje);
        cerrarModal();
    };
    const handleFinalizarAtencion = async (datos)=>{
        if (!citaSeleccionada) return;
        await onFinalizarAtencion(citaSeleccionada.id, datos);
        cerrarModal();
    };
    const handleReprogramar = async (datos)=>{
        if (!citaSeleccionada) return;
        await onReprogramarCita(citaSeleccionada.id, datos);
        cerrarModal();
    };
    // Edición en línea: el modal se queda abierto, solo se refresca lo editado.
    const handleActualizarTriaje = async (datos)=>{
        const triajeId = citaSeleccionada?.triaje?.id;
        if (!triajeId) return;
        const actualizado = await onActualizarTriaje(triajeId, datos);
        setCitaSeleccionada((prev)=>prev ? {
                ...prev,
                triaje: actualizado
            } : prev);
    };
    const handleActualizarDiagnostico = async (datos)=>{
        const diagnosticoId = citaSeleccionada?.diagnostico?.id;
        if (!diagnosticoId || !citaSeleccionada) return;
        const actualizado = await onActualizarDiagnostico(diagnosticoId, citaSeleccionada.citaId, datos, citaSeleccionada.diagnostico?.ordenes ?? []);
        setCitaSeleccionada((prev)=>prev ? {
                ...prev,
                diagnostico: actualizado
            } : prev);
    };
    /* =================================================
     MODAL SEGÚN EL ESTADO DE LA CITA
     Pendientes  -> Info pendiente de triaje   -> Formulario de triaje
     Ausente     -> Info (ausente)             -> Formulario de triaje (ausente)
     Confirmadas -> Info pendiente diagnóstico -> Formulario de diagnóstico
     Atendidas   -> Detalle de solo lectura
     Cancelada   -> Detalle de solo lectura
  ================================================= */ const renderModal = ()=>{
        const c = citaSeleccionada;
        if (!c) return null;
        if (vista === 'reprogramar') {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalCitaReprogramar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                cita: c,
                onClose: cerrarModal,
                onBuscarHorarios: (fecha)=>onBuscarHorariosReprogramacion(fecha, c.especialidad),
                onConfirmar: handleReprogramar
            }, void 0, false, {
                fileName: "[project]/components/CitasTable.tsx",
                lineNumber: 441,
                columnNumber: 9
            }, this);
        }
        switch(c.estado){
            case 'Pendientes':
                return vista === 'info' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalInfoPendienteTriaje$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    cita: c,
                    onClose: cerrarModal,
                    onRegistrarTriaje: ()=>setVista('formulario'),
                    onReprogramar: ()=>setVista('reprogramar'),
                    onCancelarCita: ()=>handleCancelar(c.id)
                }, void 0, false, {
                    fileName: "[project]/components/CitasTable.tsx",
                    lineNumber: 453,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalCitaPendienteTriaje$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    cita: c,
                    onClose: cerrarModal,
                    onVolver: ()=>setVista('info'),
                    onGuardarTriaje: handleGuardarTriaje
                }, void 0, false, {
                    fileName: "[project]/components/CitasTable.tsx",
                    lineNumber: 461,
                    columnNumber: 11
                }, this);
            case 'Ausente':
                // Una vez ausente, ya no se puede registrar triaje directo: solo
                // reprogramar (nueva fecha/hora, vuelve a "Pendientes") o cerrar.
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalInfoAusente$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    cita: c,
                    onClose: cerrarModal,
                    onReprogramar: ()=>setVista('reprogramar')
                }, void 0, false, {
                    fileName: "[project]/components/CitasTable.tsx",
                    lineNumber: 473,
                    columnNumber: 11
                }, this);
            case 'Confirmadas':
                return vista === 'info' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalInfoPendienteDiagnostico$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    cita: c,
                    triaje: c.triaje ?? TRIAJE_VACIO,
                    onClose: cerrarModal,
                    onRegistrarDiagnostico: ()=>setVista('formulario'),
                    onGuardarTriaje: handleActualizarTriaje
                }, void 0, false, {
                    fileName: "[project]/components/CitasTable.tsx",
                    lineNumber: 482,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalCitaDiagnostico$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    cita: c,
                    examenesCatalogo: examenesCatalogo,
                    onClose: cerrarModal,
                    onVolver: ()=>setVista('info'),
                    onFinalizar: handleFinalizarAtencion
                }, void 0, false, {
                    fileName: "[project]/components/CitasTable.tsx",
                    lineNumber: 490,
                    columnNumber: 11
                }, this);
            case 'Atendidas':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalCitaAtendida$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    cita: c,
                    triaje: c.triaje ?? TRIAJE_VACIO,
                    diagnostico: c.diagnostico ?? DIAGNOSTICO_VACIO,
                    examenesCatalogo: examenesCatalogo,
                    examenIdsActuales: c.diagnostico?.ordenes.map((o)=>o.examenId) ?? [],
                    onClose: cerrarModal,
                    onGuardarTriaje: handleActualizarTriaje,
                    onGuardarDiagnostico: handleActualizarDiagnostico
                }, void 0, false, {
                    fileName: "[project]/components/CitasTable.tsx",
                    lineNumber: 501,
                    columnNumber: 11
                }, this);
            case 'Cancelada':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$citas$2f$estados$2f$ModalCitaCancelada$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    cita: c,
                    onClose: cerrarModal
                }, void 0, false, {
                    fileName: "[project]/components/CitasTable.tsx",
                    lineNumber: 514,
                    columnNumber: 16
                }, this);
            default:
                return null;
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm p-3 sm:p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 gap-2.5 lg:grid-cols-[158px_minmax(200px,1fr)_150px_140px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: servicio,
                                        onChange: (e)=>setServicio(e.target.value),
                                        className: "h-10 w-full appearance-none rounded-xl border border-gray-200 bg-white px-3 pr-9 text-xs font-semibold text-gray-700 outline-none focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/15",
                                        children: servicios.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: item,
                                                children: item
                                            }, item, false, {
                                                fileName: "[project]/components/CitasTable.tsx",
                                                lineNumber: 539,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/CitasTable.tsx",
                                        lineNumber: 533,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChevronDown, {}, void 0, false, {
                                            fileName: "[project]/components/CitasTable.tsx",
                                            lineNumber: 543,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/CitasTable.tsx",
                                        lineNumber: 542,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/CitasTable.tsx",
                                lineNumber: 532,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SearchIcon, {}, void 0, false, {
                                            fileName: "[project]/components/CitasTable.tsx",
                                            lineNumber: 549,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/CitasTable.tsx",
                                        lineNumber: 548,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: searchInput,
                                        onChange: (e)=>setSearchInput(e.target.value),
                                        onKeyDown: handleSearchKeyDown,
                                        placeholder: "Buscar paciente, DNI, HC...",
                                        className: "h-10 w-full rounded-xl border border-gray-200 bg-white pl-9 pr-3 text-xs outline-none placeholder:text-gray-400 focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/15"
                                    }, void 0, false, {
                                        fileName: "[project]/components/CitasTable.tsx",
                                        lineNumber: 551,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/CitasTable.tsx",
                                lineNumber: 547,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: estado,
                                        onChange: (e)=>setEstado(e.target.value),
                                        className: "h-10 w-full appearance-none rounded-xl border border-gray-200 bg-white px-3 pr-9 text-xs font-semibold text-gray-700 outline-none focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/15",
                                        children: estadosFiltro.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: item,
                                                children: item
                                            }, item, false, {
                                                fileName: "[project]/components/CitasTable.tsx",
                                                lineNumber: 568,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/CitasTable.tsx",
                                        lineNumber: 562,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChevronDown, {}, void 0, false, {
                                            fileName: "[project]/components/CitasTable.tsx",
                                            lineNumber: 572,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/CitasTable.tsx",
                                        lineNumber: 571,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/CitasTable.tsx",
                                lineNumber: 561,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setOrden((prev)=>prev === 'proximas' ? 'lejanas' : 'proximas'),
                                className: "flex h-10 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-3 text-xs font-semibold text-gray-600 transition hover:bg-gray-50",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SortIcon, {}, void 0, false, {
                                        fileName: "[project]/components/CitasTable.tsx",
                                        lineNumber: 581,
                                        columnNumber: 13
                                    }, this),
                                    orden === 'proximas' ? 'Más próximas' : 'Más lejanas'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/CitasTable.tsx",
                                lineNumber: 576,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/CitasTable.tsx",
                        lineNumber: 530,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2.5 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_100px_80px_44px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "mb-1.5 block text-[9px] font-bold uppercase tracking-wider text-gray-400",
                                        children: "Desde"
                                    }, void 0, false, {
                                        fileName: "[project]/components/CitasTable.tsx",
                                        lineNumber: 590,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "date",
                                                value: fechaDesde,
                                                onChange: (e)=>setFechaDesde(e.target.value),
                                                className: "h-10 w-full rounded-xl border border-gray-200 bg-white px-3 pr-9 text-xs font-medium text-gray-700 outline-none focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/15"
                                            }, void 0, false, {
                                                fileName: "[project]/components/CitasTable.tsx",
                                                lineNumber: 594,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CalendarIcon, {}, void 0, false, {
                                                    fileName: "[project]/components/CitasTable.tsx",
                                                    lineNumber: 601,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/CitasTable.tsx",
                                                lineNumber: 600,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/CitasTable.tsx",
                                        lineNumber: 593,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/CitasTable.tsx",
                                lineNumber: 589,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "mb-1.5 block text-[9px] font-bold uppercase tracking-wider text-gray-400",
                                        children: "Hasta"
                                    }, void 0, false, {
                                        fileName: "[project]/components/CitasTable.tsx",
                                        lineNumber: 607,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "date",
                                                value: fechaHasta,
                                                onChange: (e)=>setFechaHasta(e.target.value),
                                                className: "h-10 w-full rounded-xl border border-gray-200 bg-white px-3 pr-9 text-xs font-medium text-gray-700 outline-none focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/15"
                                            }, void 0, false, {
                                                fileName: "[project]/components/CitasTable.tsx",
                                                lineNumber: 611,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CalendarIcon, {}, void 0, false, {
                                                    fileName: "[project]/components/CitasTable.tsx",
                                                    lineNumber: 618,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/CitasTable.tsx",
                                                lineNumber: 617,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/CitasTable.tsx",
                                        lineNumber: 610,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/CitasTable.tsx",
                                lineNumber: 606,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: handleBuscar,
                                className: "flex h-10 items-center justify-center gap-2 self-end rounded-xl bg-[#0d7a71] px-3 text-xs font-bold text-white transition hover:bg-[#0a625b]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SearchIcon, {
                                        size: 14
                                    }, void 0, false, {
                                        fileName: "[project]/components/CitasTable.tsx",
                                        lineNumber: 628,
                                        columnNumber: 13
                                    }, this),
                                    "Buscar"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/CitasTable.tsx",
                                lineNumber: 623,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: handleHoy,
                                className: "flex h-10 items-center justify-center gap-1.5 self-end rounded-xl border border-[#0d7a71]/20 bg-[#0d7a71]/5 text-xs font-bold text-[#0d7a71] transition hover:bg-[#0d7a71]/10",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CalendarIcon, {}, void 0, false, {
                                        fileName: "[project]/components/CitasTable.tsx",
                                        lineNumber: 637,
                                        columnNumber: 13
                                    }, this),
                                    "Hoy"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/CitasTable.tsx",
                                lineNumber: 632,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setSearchTerm((prev)=>prev),
                                title: "Actualizar",
                                className: "flex h-10 items-center justify-center self-end rounded-xl border border-gray-200 bg-white text-gray-400 transition hover:bg-gray-50",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RefreshIcon, {}, void 0, false, {
                                    fileName: "[project]/components/CitasTable.tsx",
                                    lineNumber: 647,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/CitasTable.tsx",
                                lineNumber: 641,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/CitasTable.tsx",
                        lineNumber: 587,
                        columnNumber: 9
                    }, this),
                    hayFiltrosActivos && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3 flex justify-end",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: handleLimpiarFiltros,
                            className: "text-[11px] font-semibold text-[#0d7a71] hover:underline",
                            children: "Limpiar filtros"
                        }, void 0, false, {
                            fileName: "[project]/components/CitasTable.tsx",
                            lineNumber: 653,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/CitasTable.tsx",
                        lineNumber: 652,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/CitasTable.tsx",
                lineNumber: 527,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-3 flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 text-gray-500",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FilterIcon, {}, void 0, false, {
                                        fileName: "[project]/components/CitasTable.tsx",
                                        lineNumber: 671,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs font-semibold",
                                        children: [
                                            citasProcesadas.length,
                                            " registros"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/CitasTable.tsx",
                                        lineNumber: 672,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/CitasTable.tsx",
                                lineNumber: 670,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "hidden sm:block text-[11px] text-gray-400",
                                children: searchTerm ? `Resultados para "${searchTerm}"` : 'Todas las citas'
                            }, void 0, false, {
                                fileName: "[project]/components/CitasTable.tsx",
                                lineNumber: 675,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/CitasTable.tsx",
                        lineNumber: 669,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hidden md:block overflow-hidden rounded-2xl sm:rounded-3xl border border-gray-100 bg-white shadow-sm",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "overflow-x-auto",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                className: "w-full min-w-[900px] border-collapse",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            className: "border-b border-gray-100 bg-gray-50/70",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-4 py-3.5 text-left text-[10px] font-bold uppercase tracking-wider text-gray-400",
                                                    children: "N° CITA"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/CitasTable.tsx",
                                                    lineNumber: 686,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-4 py-3.5 text-left text-[10px] font-bold uppercase tracking-wider text-gray-400",
                                                    children: "HC / DNI"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/CitasTable.tsx",
                                                    lineNumber: 687,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-4 py-3.5 text-left text-[10px] font-bold uppercase tracking-wider text-gray-400",
                                                    children: "PACIENTE"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/CitasTable.tsx",
                                                    lineNumber: 688,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-4 py-3.5 text-left text-[10px] font-bold uppercase tracking-wider text-gray-400",
                                                    children: "SERVICIO"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/CitasTable.tsx",
                                                    lineNumber: 689,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-4 py-3.5 text-left text-[10px] font-bold uppercase tracking-wider text-gray-400",
                                                    children: "ESTADO"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/CitasTable.tsx",
                                                    lineNumber: 690,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-4 py-3.5 text-left text-[10px] font-bold uppercase tracking-wider text-gray-400",
                                                    children: "FECHA"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/CitasTable.tsx",
                                                    lineNumber: 691,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-4 py-3.5 text-left text-[10px] font-bold uppercase tracking-wider text-gray-400",
                                                    children: "HORA"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/CitasTable.tsx",
                                                    lineNumber: 692,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/CitasTable.tsx",
                                            lineNumber: 685,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/CitasTable.tsx",
                                        lineNumber: 684,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                        className: "divide-y divide-gray-100",
                                        children: citasProcesadas.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                colSpan: 7,
                                                className: "px-6 py-12 text-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-col items-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#0d7a71]/10 text-[#0d7a71]",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SearchIcon, {
                                                                size: 19
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/CitasTable.tsx",
                                                                lineNumber: 702,
                                                                columnNumber: 27
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/CitasTable.tsx",
                                                            lineNumber: 701,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm font-semibold text-gray-700",
                                                            children: "No se encontraron citas"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/CitasTable.tsx",
                                                            lineNumber: 704,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "mt-1 text-xs text-gray-400",
                                                            children: "Intenta cambiar los filtros de búsqueda."
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/CitasTable.tsx",
                                                            lineNumber: 705,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/CitasTable.tsx",
                                                    lineNumber: 700,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/CitasTable.tsx",
                                                lineNumber: 699,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/CitasTable.tsx",
                                            lineNumber: 698,
                                            columnNumber: 19
                                        }, this) : citasProcesadas.map((cita)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                onClick: ()=>abrirCita(cita),
                                                className: "cursor-pointer hover:bg-gray-50/60 transition-colors",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-4 py-4 text-xs font-bold text-[#0d7a71]",
                                                        children: cita.id
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/CitasTable.tsx",
                                                        lineNumber: 716,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-4 py-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "whitespace-nowrap text-xs font-bold text-gray-900",
                                                                children: cita.hc
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/CitasTable.tsx",
                                                                lineNumber: 718,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "mt-0.5 whitespace-nowrap text-[11px] text-gray-400",
                                                                children: cita.dni
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/CitasTable.tsx",
                                                                lineNumber: 719,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/CitasTable.tsx",
                                                        lineNumber: 717,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-4 py-4",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "whitespace-nowrap text-xs font-bold text-gray-900",
                                                            children: cita.paciente
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/CitasTable.tsx",
                                                            lineNumber: 722,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/CitasTable.tsx",
                                                        lineNumber: 721,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-4 py-4 text-xs text-gray-600",
                                                        children: cita.especialidad
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/CitasTable.tsx",
                                                        lineNumber: 724,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-4 py-4",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: `inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${estadoStyles[cita.estado].badge}`,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: `h-1.5 w-1.5 rounded-full ${estadoStyles[cita.estado].dot}`
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/CitasTable.tsx",
                                                                    lineNumber: 727,
                                                                    columnNumber: 27
                                                                }, this),
                                                                cita.estado
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/CitasTable.tsx",
                                                            lineNumber: 726,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/CitasTable.tsx",
                                                        lineNumber: 725,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-4 py-4 whitespace-nowrap text-xs text-gray-600",
                                                        children: formatFecha(cita.fecha)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/CitasTable.tsx",
                                                        lineNumber: 731,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-4 py-4",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-1.5 whitespace-nowrap text-xs text-gray-600",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ClockIcon, {}, void 0, false, {
                                                                    fileName: "[project]/components/CitasTable.tsx",
                                                                    lineNumber: 734,
                                                                    columnNumber: 27
                                                                }, this),
                                                                formatHora(cita.hora)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/CitasTable.tsx",
                                                            lineNumber: 733,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/CitasTable.tsx",
                                                        lineNumber: 732,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, cita.id, true, {
                                                fileName: "[project]/components/CitasTable.tsx",
                                                lineNumber: 711,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/CitasTable.tsx",
                                        lineNumber: 696,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/CitasTable.tsx",
                                lineNumber: 683,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/CitasTable.tsx",
                            lineNumber: 682,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/CitasTable.tsx",
                        lineNumber: 681,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3 md:hidden",
                        children: citasProcesadas.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-2xl border border-gray-100 bg-white px-5 py-10 text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#0d7a71]/10 text-[#0d7a71]",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SearchIcon, {
                                        size: 19
                                    }, void 0, false, {
                                        fileName: "[project]/components/CitasTable.tsx",
                                        lineNumber: 751,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/CitasTable.tsx",
                                    lineNumber: 750,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm font-semibold text-gray-700",
                                    children: "No se encontraron citas"
                                }, void 0, false, {
                                    fileName: "[project]/components/CitasTable.tsx",
                                    lineNumber: 753,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-1 text-xs text-gray-400",
                                    children: "Intenta cambiar los filtros."
                                }, void 0, false, {
                                    fileName: "[project]/components/CitasTable.tsx",
                                    lineNumber: 754,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/CitasTable.tsx",
                            lineNumber: 749,
                            columnNumber: 13
                        }, this) : citasProcesadas.map((cita)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                onClick: ()=>abrirCita(cita),
                                className: "cursor-pointer rounded-2xl border border-gray-100 bg-white p-4 shadow-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-start justify-between gap-3 border-b border-gray-100 pb-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs font-bold text-[#0d7a71]",
                                                        children: cita.id
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/CitasTable.tsx",
                                                        lineNumber: 766,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mt-1 text-[10px] text-gray-400",
                                                        children: cita.hc
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/CitasTable.tsx",
                                                        lineNumber: 767,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/CitasTable.tsx",
                                                lineNumber: 765,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${estadoStyles[cita.estado].badge}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `h-1.5 w-1.5 rounded-full ${estadoStyles[cita.estado].dot}`
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/CitasTable.tsx",
                                                        lineNumber: 771,
                                                        columnNumber: 21
                                                    }, this),
                                                    cita.estado
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/CitasTable.tsx",
                                                lineNumber: 770,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/CitasTable.tsx",
                                        lineNumber: 764,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "pt-3 text-sm font-bold text-gray-900",
                                        children: cita.paciente
                                    }, void 0, false, {
                                        fileName: "[project]/components/CitasTable.tsx",
                                        lineNumber: 776,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[9px] font-bold uppercase tracking-wider text-gray-400",
                                                children: "Médico"
                                            }, void 0, false, {
                                                fileName: "[project]/components/CitasTable.tsx",
                                                lineNumber: 779,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1 text-xs text-gray-600",
                                                children: cita.medico
                                            }, void 0, false, {
                                                fileName: "[project]/components/CitasTable.tsx",
                                                lineNumber: 780,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/CitasTable.tsx",
                                        lineNumber: 778,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-4 grid grid-cols-2 gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-[9px] font-bold uppercase tracking-wider text-gray-400",
                                                        children: "DNI"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/CitasTable.tsx",
                                                        lineNumber: 785,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mt-1 text-xs text-gray-600",
                                                        children: cita.dni
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/CitasTable.tsx",
                                                        lineNumber: 786,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/CitasTable.tsx",
                                                lineNumber: 784,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-[9px] font-bold uppercase tracking-wider text-gray-400",
                                                        children: "Sexo"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/CitasTable.tsx",
                                                        lineNumber: 789,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mt-1 text-xs text-gray-600",
                                                        children: cita.sexo
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/CitasTable.tsx",
                                                        lineNumber: 790,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/CitasTable.tsx",
                                                lineNumber: 788,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-[9px] font-bold uppercase tracking-wider text-gray-400",
                                                        children: "Servicio"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/CitasTable.tsx",
                                                        lineNumber: 793,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mt-1 text-xs text-gray-600",
                                                        children: cita.especialidad
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/CitasTable.tsx",
                                                        lineNumber: 794,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/CitasTable.tsx",
                                                lineNumber: 792,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-[9px] font-bold uppercase tracking-wider text-gray-400",
                                                        children: "Fecha"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/CitasTable.tsx",
                                                        lineNumber: 797,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mt-1 text-xs text-gray-600",
                                                        children: formatFecha(cita.fecha)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/CitasTable.tsx",
                                                        lineNumber: 798,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/CitasTable.tsx",
                                                lineNumber: 796,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "col-span-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-[9px] font-bold uppercase tracking-wider text-gray-400",
                                                        children: "Hora"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/CitasTable.tsx",
                                                        lineNumber: 801,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-1 flex items-center gap-1.5 text-xs text-gray-600",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ClockIcon, {
                                                                size: 13
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/CitasTable.tsx",
                                                                lineNumber: 803,
                                                                columnNumber: 23
                                                            }, this),
                                                            formatHora(cita.hora)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/CitasTable.tsx",
                                                        lineNumber: 802,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/CitasTable.tsx",
                                                lineNumber: 800,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/CitasTable.tsx",
                                        lineNumber: 783,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-4 border-t border-gray-100 pt-3",
                                        onClick: (e)=>e.stopPropagation(),
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>handleCancelar(cita.id),
                                            className: "flex h-9 w-full items-center justify-center gap-1.5 rounded-xl bg-red-50 text-xs font-bold text-red-600 transition hover:bg-red-100",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TrashIcon, {
                                                    size: 14
                                                }, void 0, false, {
                                                    fileName: "[project]/components/CitasTable.tsx",
                                                    lineNumber: 815,
                                                    columnNumber: 21
                                                }, this),
                                                "Cancelar"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/CitasTable.tsx",
                                            lineNumber: 810,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/CitasTable.tsx",
                                        lineNumber: 809,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, cita.id, true, {
                                fileName: "[project]/components/CitasTable.tsx",
                                lineNumber: 758,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/CitasTable.tsx",
                        lineNumber: 747,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/CitasTable.tsx",
                lineNumber: 667,
                columnNumber: 7
            }, this),
            cargandoDetalle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/45 backdrop-blur-sm p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "rounded-2xl bg-white px-6 py-4 text-xs font-medium text-gray-500 shadow-2xl",
                    children: "Cargando..."
                }, void 0, false, {
                    fileName: "[project]/components/CitasTable.tsx",
                    lineNumber: 828,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/CitasTable.tsx",
                lineNumber: 827,
                columnNumber: 9
            }, this),
            !cargandoDetalle && renderModal()
        ]
    }, void 0, true, {
        fileName: "[project]/components/CitasTable.tsx",
        lineNumber: 522,
        columnNumber: 5
    }, this);
}
_s(CitasTable, "oujCNNw1k6DVGdDNWB7NQtmPGZU=");
_c8 = CitasTable;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8;
__turbopack_context__.k.register(_c, "SearchIcon");
__turbopack_context__.k.register(_c1, "CalendarIcon");
__turbopack_context__.k.register(_c2, "RefreshIcon");
__turbopack_context__.k.register(_c3, "ClockIcon");
__turbopack_context__.k.register(_c4, "FilterIcon");
__turbopack_context__.k.register(_c5, "SortIcon");
__turbopack_context__.k.register(_c6, "ChevronDown");
__turbopack_context__.k.register(_c7, "TrashIcon");
__turbopack_context__.k.register(_c8, "CitasTable");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/useSesion.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useRequireSesion",
    ()=>useRequireSesion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function useRequireSesion() {
    _s();
    const [usuario, setUsuario] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [cargando, setCargando] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useRequireSesion.useEffect": ()=>{
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["obtenerToken"])()) {
                router.replace('/login');
                return;
            }
            // eslint-disable-next-line react-hooks/set-state-in-effect -- lectura única de localStorage al montar, no deriva de render
            setUsuario((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["obtenerUsuario"])());
            setCargando(false);
        }
    }["useRequireSesion.useEffect"], [
        router
    ]);
    const cerrar = ()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cerrarSesion"])();
        router.push('/login');
    };
    return {
        usuario,
        cargando,
        cerrar
    };
}
_s(useRequireSesion, "9HU+6q7v0hxnRkYpXkZSStkOgEE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_0zxtbll._.js.map