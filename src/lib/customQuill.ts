// lib/CustomQuill.ts
import Quill from "quill";

const Embed = Quill.import("blots/block/embed");

class CustomEmbed extends Embed {
  static blotName = "embed";
  static tagName = "iframe";

  static create(value: string) {
    const node = super.create();
    node.setAttribute("src", value);
    node.setAttribute("frameborder", "0");
    node.setAttribute("allowfullscreen", "true");
    return node;
  }

  static value(node: HTMLElement) {
    return node.getAttribute("src");
  }
}

Quill.register(CustomEmbed, true);
