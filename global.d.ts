declare module '@mapbox/expression-jamsession' {
  type ExpressionOperator =
    | 'let'
    | 'var'
    | 'literal'
    | 'array'
    | 'at'
    | 'in'
    | 'index-of'
    | 'slice'
    | 'case'
    | 'match'
    | 'coalesce'
    | 'step'
    | 'interpolate'
    | 'interpolate-hcl'
    | 'interpolate-lab'
    | 'typeof'
    | 'string'
    | 'number'
    | 'boolean'
    | 'object'
    | 'collator'
    | 'format'
    | 'image'
    | 'number-format'
    | 'to-string'
    | 'to-number'
    | 'to-boolean'
    | 'to-rgba'
    | 'to-color'
    | 'rgb'
    | 'rgba'
    | 'get'
    | 'has'
    | 'length'
    | 'properties'
    | 'feature-state'
    | 'geometry-type'
    | 'id'
    | 'zoom'
    | 'heatmap-density'
    | 'line-progress'
    | 'sky-radial-progress'
    | 'accumulated'
    | '+'
    | '*'
    | '-'
    | '/'
    | '%'
    | '^'
    | 'sqrt'
    | 'log10'
    | 'ln'
    | 'log2'
    | 'sin'
    | 'cos'
    | 'tan'
    | 'asin'
    | 'acos'
    | 'atan'
    | 'min'
    | 'max'
    | 'round'
    | 'abs'
    | 'ceil'
    | 'floor'
    | 'distance'
    | '=='
    | '!='
    | '>'
    | '<'
    | '>='
    | '<='
    | 'all'
    | 'any'
    | '!'
    | 'within'
    | 'upcase'
    | 'downcase'
    | 'concat'
    | 'resolved-locale';

  type ExpressionValue =
    | string
    | number
    | boolean
    | null
    | ExpressionValue[]
    | { [key: string]: ExpressionValue };

  interface BaseExpression extends Array<ExpressionValue | Expression> {
    0: ExpressionOperator;
  }

  interface GetExpression extends Array<string | Expression> {
    0: 'get';
    1: string;
    2?: ObjectExpression;
  }

  interface MatchExpression extends Array<ExpressionValue | Expression> {
    0: 'match';
    1: Expression;
    [index: number]: ExpressionValue | Expression;
  }

  interface InterpolateExpression extends Array<ExpressionValue | Expression> {
    0: 'interpolate';
    1: InterpolationType;
    2: Expression;
    [index: number]: number | ExpressionValue | Expression;
  }

  interface CollatorOptions {
    'case-sensitive'?: boolean;
    'diacritic-sensitive'?: boolean;
    locale?: string;
  }

  interface NumberFormatOptions {
    locale?: string;
    'min-fraction-digits'?: number;
    'max-fraction-digits'?: number;
  }

  interface FormatElement {
    text: string;
    font?: string[];
    'text-color'?: string;
    'font-scale'?: number;
  }

  type InterpolationType =
    | ['linear']
    | ['exponential', number]
    | ['cubic-bezier', number, number, number, number]
    | 'interpolate-hcl'
    | 'interpolate-lab';

  type Expression =
    | BaseExpression
    | GetExpression
    | MatchExpression
    | InterpolateExpression
    | ExpressionValue;

  interface ObjectExpression {
    type: 'ObjectExpression';
    properties: Array<{
      type: 'Property';
      key: { value: string } | Expression;
      value: Expression;
      computed: boolean;
      shorthand: boolean;
    }>;
  }

  interface ASTNode {
    type: string;
    value?: any;
    name?: string;
    operator?: string;
    argument?: ASTNode;
    left?: ASTNode;
    right?: ASTNode;
    elements?: ASTNode[];
    properties?: Array<{
      type: 'Property';
      key: ASTNode;
      value: ASTNode;
      computed: boolean;
      shorthand: boolean;
    }>;
    callee?: {
      name: string;
    };
    arguments?: ASTNode[];
  }

  interface SyntaxError extends Error {
    type: 'SyntaxError';
    index: number;
    description: string;
  }

  /**
   * Converts a Mapbox GL formula string to an expression array
   * @param input - The formula string to convert
   * @returns The expression array or undefined if input is empty
   * @throws {Error} If input is invalid or contains syntax errors
   */
  export function formulaToExpression(input: string): Expression | undefined;

  /**
   * Converts a Mapbox GL expression array to a formula string
   * @param expression - The expression array to convert
   * @returns The formula string
   * @throws {Error} If input is not an array or contains invalid expressions
   */
  export function expressionToFormula(expression: Expression): string;
}
