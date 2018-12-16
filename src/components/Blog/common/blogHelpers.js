import htmlToText from "html-to-text"

export const calcTimeToRead = content => {
  let words, imgs = 0;

  const wps = 0.218340611, ips = 12;

  let el = document.createElement("html");
  el.innerHTML = content;
  imgs = el.querySelectorAll("img").length;

  words = htmlToText.fromString(content).length;
  return Math.floor(Math.floor((words * wps + imgs * ips) / 60));
}