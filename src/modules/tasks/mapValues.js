// export const TASK_STATUS = ['new', 'pending', 'in-progress', 'to review', 'completed', 'archived']
// export const TASK_PRIORITY = ['low', 'medium', 'high', 'urgent']
export const TASK_STATUS = ['nueva', 'pendiente', 'en progreso', 'a revisar', 'completada', 'archivada']
export const TASK_STATUS_INITIAL = ['nueva', 'pendiente', 'en progreso', 'a revisar']
export const TASK_PRIORITY = ['baja', 'media', 'alta', 'urgente']

export const TASK_STATUS_COLOR = {
  'nueva': "bg-[#E75AAA]", // Fucsia,   inicio
  'pendiente': "bg-[#FF9863]", // Rojizo,   util para testeos
  'en progreso': "bg-[#FFBE63]", // Naranja,  trabajando
  'a revisar': "bg-[#FFE463]", // Amarillo, a testear
  'completada': "bg-[#DBFA61]", // Verde,    listo
  'archivada': "bg-[#ADADAD]", // Gris,     se guarda porque molesta
}

export const TASK_PRIORITY_COLOR = {
  'baja': "text-green-500",
  'media': "text-yellow-500",
  'alta': "text-orange-500",
  'urgente': "text-red-500",
}

export const TASK_PRIORITY_ICO = {
  'baja': "mdi:wifi-strength-1-alert",
  'media': "mdi:wifi-strength-2-alert",
  'alta': "mdi:wifi-strength-3-alert",
  'urgente': "mdi:wifi-strength-4-alert",
}