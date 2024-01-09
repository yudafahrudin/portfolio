import angularIcon from "@/assets/angular.svg";
import nextjsIcon from "@/assets/nextjs.svg";
import nodeJsIcon from "@/assets/nodejs.svg";
import reactJsIcon from "@/assets/reactjs.svg";
import graphQLIcon from "@/assets/graphql.svg";

export const EXPERIENCE = [
  {
    title: "Rey",
    date: "Indonesia - 2023",
    type: "work",
    description: "insurance technology, healthcare app",
    url: "https://rey.id",
    tech: [
      { label: "NEXT JS", color: "black", icon: nextjsIcon },
      { label: "GraphQL", color: "#fc6c85", icon: graphQLIcon },
    ],
  },

  {
    title: "Sirclo",
    type: "work",
    date: "Indonesia - 2023",
    description: "e-commerce solution, enabler commerce",
    url: "https://www.sirclo.com",
    tech: [
      { label: "React JS", color: "#009dd1", icon: reactJsIcon },
      { label: "GraphQL", color: "#fc6c85", icon: graphQLIcon },
      { label: "NodeJs", color: "green", icon: nodeJsIcon },
    ],
  },
  {
    title: "Vontis",
    type: "work",
    date: "Indonesia - 2021",
    description: "Cloud ERP, business digitalization solution",
    url: "https://vontis.id/vontis/id/about.html",
    tech: [{ label: "Angular", color: "red", icon: angularIcon }],
  },
  {
    title: "Halobro",
    type: "work",
    date: "Indonesia - 2019",
    description: "Turns chat data into a meaningful business insights. ",
    url: "https://www.linkedin.com/company/halobro/about",
    tech: [
      { label: "React JS", color: "#009dd1", icon: reactJsIcon },
      { label: "NodeJs", color: "green", icon: nodeJsIcon },
    ],
  },
  {
    title: "Hubble",
    type: "work",
    date: "Singapore - 2018",
    description:
      "Construction management software. Digitise and automate construction worksite workflows.",
    url: "https://hubble.build",
    tech: [
      { label: "React JS", color: "#009dd1", icon: reactJsIcon },
      { label: "React Native", color: "#009dd1", icon: reactJsIcon },
    ],
  },
  {
    title: "Pokeworld",
    type: "project",
    date: "Indonesia - 2023",
    description: "mini project to catch pokemon from tokopedia challenge",
    url: "https://pokeworld-me.vercel.app",
    tech: [
      { label: "React JS", color: "#009dd1", icon: reactJsIcon },
      { label: "GraphQL", color: "#fc6c85", icon: graphQLIcon },
    ],
  },
];
