/**
 * Represents a unit of text that can be translated.
 * A unit may contain one or more text nodes that should be translated together.
 */
export interface TranslatableUnit {
  /** Unique identifier for this unit */
  id: string;
  
  /** Original text nodes that make up this unit */
  textNodes: Text[];
  
  /** Combined original text content */
  originalText: string;
  
  /** Translation result (set after translation) */
  translatedText?: string;
  
  /** Common parent element for context */
  parentElement: HTMLElement;
  
  /** Contextual information about the unit */
  context: TranslatableUnitContext;
  
  /** Whether this unit has been translated */
  isTranslated: boolean;
  
  /** Source language (detected or specified) */
  sourceLang?: string;
}

/**
 * Context information for a translatable unit.
 */
export interface TranslatableUnitContext {
  /** Tag name of the parent element */
  tagName: string;
  
  /** Whether the text is in a heading element */
  isHeading: boolean;
  
  /** Whether the text is in a link */
  isLink: boolean;
  
  /** Whether the text is in a button */
  isButton: boolean;
  
  /** Whether the text is in a form element */
  isFormElement: boolean;
  
  /** XPath to the parent element for debugging */
  xpath: string;
}

/**
 * Creates a unique ID for a translatable unit.
 */
export function generateUnitId(): string {
  return `tu-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Gets the XPath for an element.
 */
export function getElementXPath(element: Element): string {
  if (!element.parentElement) {
    return `/${element.tagName.toLowerCase()}`;
  }
  
  const siblings = Array.from(element.parentElement.children).filter(
    (child) => child.tagName === element.tagName
  );
  
  const index = siblings.indexOf(element) + 1;
  const tagName = element.tagName.toLowerCase();
  const indexStr = siblings.length > 1 ? `[${index}]` : '';
  
  return `${getElementXPath(element.parentElement)}/${tagName}${indexStr}`;
}

/**
 * Determines the context of a text node based on its ancestors.
 */
export function getTextNodeContext(textNode: Text): TranslatableUnitContext {
  const parent = textNode.parentElement;
  
  if (!parent) {
    return {
      tagName: '#text',
      isHeading: false,
      isLink: false,
      isButton: false,
      isFormElement: false,
      xpath: '',
    };
  }
  
  const headingTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
  const formTags = ['label', 'legend', 'option', 'optgroup'];
  
  let isHeading = false;
  let isLink = false;
  let isButton = false;
  let isFormElement = false;
  
  let current: HTMLElement | null = parent;
  while (current) {
    const tag = current.tagName.toLowerCase();
    
    if (headingTags.includes(tag)) isHeading = true;
    if (tag === 'a') isLink = true;
    if (tag === 'button' || (tag === 'input' && current.getAttribute('type') === 'submit')) {
      isButton = true;
    }
    if (formTags.includes(tag)) isFormElement = true;
    
    current = current.parentElement;
  }
  
  return {
    tagName: parent.tagName.toLowerCase(),
    isHeading,
    isLink,
    isButton,
    isFormElement,
    xpath: getElementXPath(parent),
  };
}

/**
 * Creates a TranslatableUnit from text nodes.
 */
export function createTranslatableUnit(
  textNodes: Text[],
  parentElement: HTMLElement
): TranslatableUnit {
  const originalText = textNodes
    .map((node) => node.textContent || '')
    .join('')
    .trim();
  
  const context = textNodes.length > 0 
    ? getTextNodeContext(textNodes[0])
    : {
        tagName: parentElement.tagName.toLowerCase(),
        isHeading: false,
        isLink: false,
        isButton: false,
        isFormElement: false,
        xpath: getElementXPath(parentElement),
      };
  
  return {
    id: generateUnitId(),
    textNodes,
    originalText,
    parentElement,
    context,
    isTranslated: false,
  };
}
