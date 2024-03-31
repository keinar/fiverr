

export function GetFlagImage(country) {
  switch (country) {
    case "China":
      return "https://res.cloudinary.com/de06koxrk/image/upload/v1711915719/Lancerr/china_hzkabm.png"
    case "Thailand":
      return "https://res.cloudinary.com/de06koxrk/image/upload/v1711915732/Lancerr/thailand_kjiznu.png"
    case "Germany":
      return "https://res.cloudinary.com/de06koxrk/image/upload/v1711915723/Lancerr/germany_cp0zek.png"
    case "United Kingdom":
      return "https://res.cloudinary.com/de06koxrk/image/upload/v1711915713/Lancerr/uk_mtc9vs.png"
    case "United States":
      return "https://res.cloudinary.com/de06koxrk/image/upload/v1711915716/Lancerr/usa_l9bkto.png"
    default:
      // Return a default image or handle other cases as needed
      return null
  }
}
