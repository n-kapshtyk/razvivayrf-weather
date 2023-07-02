export const locales = {
  globalError: {
    text: "Что-то пошло не так. Пожалуйста, попробуйте перезагрузить страницу",
    button: "Перезагрузить",
  },
  addPosition: {
    title: "Поиск по координатам",
    lat: "Широта",
    lon: "Долгота",
    button: "Поиск",
  },
  loadingErrorModal: {
    title: "Ошибка загрузки данных",
    text: "Не удалось загрузить данные по выбранной геопозиции. Пожалуйста, попробуйте заново",
  },
  noPositionAccessModal: {
    title: "Нет доступа к Вашей геопозиции",
    text: "Нет доступа. Без определения Вашей текущей геопозиции, приложение не будет корректно функционировать. Вы можете изменить разрешение в настройках Вашего браузера.",
  },
  savePositionModal: {
    title: "Cохранить позицию",
    input: "Название",
    button: "Сохранить",
  },
  newPositionButton: "Новое местоположение",
  weather: {
    buttons: {
      save: "Сохранить",
      remove: "Удалить",
      update: "Изменить",
    },
    info: {
      place: "Место",
      coords: "Широта и долгота",
      time: "Местное время",
      temp: "Температура",
      tempFeels: "Температура (ощущается)",
      condition: "Состояние",
      windSpeed: "Скорость ветра",
      pressure: "Атмосферное давление",
      humidity: "Влажность",
    },
    dayInfo: {
      minTemp: "Минимальная температура",
      maxTemp: "Максимальная температура",
      avgTemp: "Cредняя температура",
      tempFeels: "Температура (ощущается)",
      condition: "Состояние",
      windSpeed: "Скорость ветра",
      pressure: "Атмосферное давление",
      humidity: "Влажность",
    },
  },
};

export const weatherConditionsLocales: Record<string, string> = {
  clear: "ясно",
  "partly-cloudy": "малооблачно",
  cloudy: "облачно с прояснениями",
  overcast: "пасмурно",
  "light-rain": "небольшой дождь",
  rain: "дождь",
  "heavy-rain": "сильный дождь",
  showers: "ливень",
  "wet-snow": "дождь со снегом",
  "light-snow": "небольшой снег",
  snow: "снег",
  "snow-showers": "снегопад",
  hail: "град",
  thunderstorm: "гроза",
  "thunderstorm-with-rain": "дождь с грозой",
  "thunderstorm-with-hail": "гроза с градом",
};
