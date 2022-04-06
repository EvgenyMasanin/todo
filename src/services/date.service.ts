class DateService {
  getDateString() {
    return new Date().toLocaleString('ru', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  }

  getTimeString() {
    return new Date().toLocaleString('ru', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }
}

export const { getDateString, getTimeString } = new DateService()
