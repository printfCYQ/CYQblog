import Marked from "marked";
import hljs from "highlight.js";
import Tocify from "./tocify.tsx";
import "highlight.js/styles/monokai-sublime.css";

export const initMarked = ({ hasTocify=false }) => {
  const renderer = new Marked.Renderer();
  let tocify;
  if(hasTocify) {
    tocify = new Tocify();
    renderer.heading = function (text, level) {
      const anchor = tocify.add(text, level);
      return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
    };
  }
  Marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    sanitize: false,
    xhtml: false,
    highlight: (code) => hljs.highlightAuto(code).value
  });

  return { marked: Marked, tocify }
}
