async function getInfoFromClient() {
  let response = await fetch("https://ipapi.co/json/");
  let data = await response.json();

  let result =
    data["country"] === "ES"
      ? {
          city: data["city"],
          region: data["region"],
          region_code: data["region_code"],
          postal: data["postal"],
          province_code: data["postal"].substr(0, 2)
        }
      : { city: null };

  return result;
}

export { getInfoFromClient };
