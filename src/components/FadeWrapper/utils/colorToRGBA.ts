export function colorToRGBA(color: string): string {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  if (!context) return 'rgba(0, 0, 0, 0)';

  context.fillStyle = color;
  const rgba = context.fillStyle as string;

  if (rgba.startsWith('rgba')) {
    return rgba.replace(/,\s*\d*\.?\d+\)$/, ', 0)');
  }
  if (rgba.startsWith('rgb')) {
    return rgba.replace('rgb', 'rgba').replace(')', ', 0)');
  }

  return 'rgba(0, 0, 0, 0)';
}
