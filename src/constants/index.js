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
    active: true,
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
export const formInputs = {
  page1: [
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
      input: "form_300",
      type: "text",
    },
    {
      id: 3,
      value: "",
      name: "form_full_desc",
      input: "form_1500",
      type: "text",
    },
    { id: 4, value: "", name: "form_youtube", input: "link", type: "link" },
    {
      id: 5,
      value: "",
      name: "form_country",
      input: "country",
      type: "country",
    },
    { id: 6, value: "", name: "form_website", input: "link", type: "link" },
  ],
  page2: [
    {
      id: 11,
      value: "",
      name: "white_paper",
      input: "link",
      type: "link",
    },
    {
      id: 12,
      value: "",
      name: "roadmap",
      input: "link",
      type: "link",
      obligatorily: true,
    },
    {
      id: 13,
      value: "",
      name: "business_plan",
      input: "link",
      type: "link",
    },
    {
      id: 14,
      value: "",
      name: "documents",
      input: "link",
      type: "link",
    },
    {
      id: 15,
      value: "",
      name: "header_img",
      input: "link",
      type: "link",
      dimension: "1440x500",
    },
    {
      id: 16,
      value: "",
      name: "preview_img",
      input: "link",
      type: "link",
      dimension: "350x500",
    },
  ],
  page3: [
    {
      id: 21,
      value: "",
      name: "soft_cap",
      input: "number",
      type: "number",
    },
    {
      id: 22,
      value: "",
      name: "hard_cap",
      input: "number",
      type: "number",
    },
    {
      id: 23,
      value: "",
      name: "investors_reward",
      input: "number",
      type: "number",
    },
  ],
  highlights: [
    {
      id: 31,
      value: "",
      input: "form_100",
      type: "text",
    },
    {
      id: 32,
      value: "",
      input: "form_100",
      type: "text",
    },
    {
      id: 33,
      value: "",
      input: "form_100",
      type: "text",
    },
  ],
};
export const formMembers = [
  {
    id: Math.random(),
    inputs: [
      { id: Math.random(), value: "", input: "name", type: "text" },
      {
        id: Math.random(),
        value: "",
        input: "avatar_link",
        type: "link",
      },
      { id: Math.random(), value: "", input: "nickname", type: "text" },
    ],
    network: false,
  },
];
export const formSocialMedia = [
  {
    id: 1,
    value: "",
    input: "link",
    group: "telegram",
  },
  {
    id: 2,
    value: "",
    input: "link",
    group: "twitter",
  },
  {
    id: 3,
    value: "",
    input: "link",
    group: "discord",
  },
  {
    id: 4,
    value: "",
    input: "link",
    group: "facebook",
  },
];
