import { wbtc, weth, wmatic, usdt, usdc, dai } from "../assets/img";

export const presalesTabsData = [
  {
    label: "all_launchpads",
  },
  {
    label: "my_favorites",
  },
];
export const projectTabsData = [
  {
    label: "overview",
  },
  {
    label: "roadmap",
  },
  {
    label: "team",
  },
  {
    label: "investors",
  },
];
export const formTokens = [
  {
    id: 1,
    name: "WBTC",
    img: wbtc,
    address: "0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
    active: false,
  },
  {
    id: 2,
    name: "WETH",
    img: weth,
    address: "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    active: false,
  },
  {
    id: 3,
    name: "WMATIC",
    img: wmatic,
    address: "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
    active: false,
  },
  {
    id: 4,
    name: "USDT",
    img: usdt,
    address: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
    active: false,
  },
  {
    id: 5,
    name: "USDC",
    img: usdc,
    address: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
    active: false,
  },
  {
    id: 6,
    name: "DAI",
    img: dai,
    address: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
    active: false,
  },
];
export const formInputs1 = [
  {
    id: 1,
    value: "",
    name: "form_name",
    input: "form_enter_name",
    type: "text",
    obligatorily: true,
  },
  {
    id: 2,
    value: "",
    name: "form_short_desc",
    input: "form_100",
    type: "text",
  },
  {
    id: 3,
    value: "",
    name: "form_full_desc",
    input: "form_300",
    type: "text",
  },
  { id: 4, value: "", name: "form_youtube", input: "link", type: "link" },
  { id: 5, value: "", name: "form_country", input: "country", type: "country" },
  { id: 6, value: "", name: "form_website", input: "link", type: "link" },
];
export const formInputs2 = [];
export const formInputs3 = [];
