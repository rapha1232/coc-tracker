const body = JSON.stringify({
  buildingId: "cmc3e9yju0009uglogr2gmyn5",
  duration: "86400",
});
const data = fetch("http://localhost:3000/api/buildings/upgrades", {
  headers: {
    accept: "*/*",
    "accept-language": "en-US,en;q=0.9,fr;q=0.8",
    "sec-ch-ua":
      '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    cookie:
      "next-auth.csrf-token=b64385bfac118235dad99695d83becca6f71618b07981fc0808db8fcc09b4fc6%7Cbf0c157d0650eac433f733a6a0872d097b205ae88542d94f71c8870fba0dcbab; next-auth.callback-url=http%3A%2F%2Flocalhost%3A3000%2Flogin; __next_hmr_refresh_hash__=306; next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..2YMUL0mIw3WyGuzS.YsdryD3yPj7kkQzdM3job4WO1k62yij5cdnwNbjtFnh-DPsLbmyeLOVqtO3zTvBnor8pNXc49p9YcHXRfcF2a6n_RpJ3VUM9pl0hNyKFfSvft7BCdKGYhMWFeeXYHPCNfzs2UF7nksCDk1_vAAMeIbkzRt1gCc_fpeQ8iLmztvyASi5eBcR0bMcPwHKy10MgXRbcuv20yqdJSjve7u-hSTuPY_zn02P0jLZUAf-MLWD-rA1q3XwXIwRObEfStMLr7yfs02-l0UBh.b0rNHJU_Vzkwebc4cIVv7A",
    Referer: "http://localhost:3000/dashboard",
    "Referrer-Policy": "strict-origin-when-cross-origin",
  },
  body: null,
  method: "GET",
});

data
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });
