import {
  ZoomIn,
  Contrast,
  Origami,
  Shapes,
  Activity,
  PenTool,
  BookOpen,
  Compass,
  Layers,
  Network,
  GitBranch,
  GraduationCap,
  MessageSquare,
  Sliders,
  ListOrdered,
  CreditCard,
  Camera,
  Sparkles,
  LayoutTemplate,
  Scissors,
  Columns,
  Hexagon,
  Brain,
  Palette,
  Clapperboard,
  Gamepad2,
  Film,
  Wand2,
  Briefcase,
  Eraser,
  LucideIcon
} from 'lucide-react';

export interface ModeDefinition {
  id: string;
  label: string;
  icon: LucideIcon;
  themeColor: string;
  description: string;
}

export const eslModes: ModeDefinition[] = [
  { id: 'esl', label: 'ESL Illustration', icon: PenTool, themeColor: 'fuchsia', description: 'Popping, creative visual teaching illustration.' },
  { id: 'doc', label: 'Digtionary Page', icon: BookOpen, themeColor: 'amber', description: 'Hand-drawn dictionary page definitions.' },
  { id: 'preposition', label: 'Preposition Map', icon: Compass, themeColor: 'sky', description: 'Clear spatial relations mapped out.' },
  { id: 'morphology', label: 'Morphology Blocks', icon: Layers, themeColor: 'indigo', description: 'Word roots and affixes broken into blocks.' },
  { id: 'collocation', label: 'Collocation Web', icon: Network, themeColor: 'emerald', description: 'Mind map of frequently paired words.' },
  { id: 'etymology', label: 'Etymology Tree', icon: GitBranch, themeColor: 'amber', description: 'Historical word origins and branches.' },
  { id: 'chalkboard', label: 'Class Chalkboard', icon: GraduationCap, themeColor: 'teal', description: 'Classic teacher chalkboard aesthetic.' },
  { id: 'mouth_guide', label: 'Phonetic Guide', icon: MessageSquare, themeColor: 'sky', description: 'Mouth shape and articulation diagram.' },
  { id: 'synonym_scale', label: 'Synonym Scale', icon: Sliders, themeColor: 'emerald', description: 'Words ranked by intensity or formality.' },
  { id: 'cutaway', label: 'Tech Cutaway', icon: Compass, themeColor: 'cyan', description: 'Internal mechanics and labeled parts.' },
  { id: 'action_sequence', label: 'Action Story', icon: ListOrdered, themeColor: 'indigo', description: 'Step-by-step narrative sequence.' },
  { id: 'infographic', label: 'Grammar Diagram', icon: Network, themeColor: 'indigo', description: 'Clean vectors, flows & relations.' },
  { id: 'flashcard', label: 'Minimal Flashcard', icon: CreditCard, themeColor: 'yellow', description: 'Solid background & crisp 3D subjects.' }
];

export const creativeModes: ModeDefinition[] = [
  { id: 'no_background', label: 'No Background (PNG)', icon: Eraser, themeColor: 'emerald', description: 'Clean isolated subject created without background, exported as a transparent PNG.' },
  { id: 'visual_identity', label: 'Visual Identity', icon: Briefcase, themeColor: 'indigo', description: 'Brand visual identity, logo design & product mockup showcase for imagined brands.' },
  { id: 'dixit', label: 'Dixit Dreamscape', icon: Wand2, themeColor: 'purple', description: 'Surreal narrative, poetic metaphors & dreamlike Dixit card art.' },
  { id: 'macro', label: 'Macro Photography', icon: ZoomIn, themeColor: 'emerald', description: 'Ultra close-up real-life photography.' },
  { id: 'silhouette', label: 'Dramatic Silhouette', icon: Contrast, themeColor: 'orange', description: 'Striking dark silhouettes against vibrant backgrounds.' },
  { id: 'origami', label: 'Origami Art', icon: Origami, themeColor: 'rose', description: 'Folded paper art on minimalist background.' },
  { id: 'claymation', label: 'Claymation', icon: Shapes, themeColor: 'amber', description: 'Tactile clay models with visible fingerprints.' },
  { id: 'neon', label: 'Neon Wireframe', icon: Activity, themeColor: 'cyan', description: 'Glowing 3D neon wireframes in a dark void.' },

  { id: 'wes_anderson', label: 'Wes Anderson Art', icon: Film, themeColor: 'amber', description: 'Symmetrical, pastel aesthetic with drawings, collage & cinematic options.' },
  { id: 'photo', label: 'Photographic', icon: Camera, themeColor: 'cyan', description: 'High-quality realistic imagery.' },
  { id: 'embroidery', label: 'Embroidery Art', icon: Sparkles, themeColor: 'rose', description: 'Handcrafted macro stitch art.' },
  { id: 'stitched', label: 'Stitched Grammar', icon: Layers, themeColor: 'amber', description: 'Fabric patches sewn together with text.' },
  { id: 'comic', label: 'Comic Scenario', icon: LayoutTemplate, themeColor: 'red', description: 'Graphic novel situational panels.' },
  { id: 'collage', label: 'Collage Art', icon: Scissors, themeColor: 'orange', description: 'Real-life mixed media & paper cuts.' },
  { id: 'split', label: 'Literal vs Meaning', icon: Columns, themeColor: 'blue', description: 'Split screen comparison visual.' },
  { id: 'icon', label: 'Vibrant Icon', icon: Hexagon, themeColor: 'slate', description: 'Colorful, rich UI symbol on gray.' },
  { id: 'mnemonic', label: 'Surreal Mnemonic', icon: Brain, themeColor: 'purple', description: 'Bizarre memory hook imagery.' },
  { id: 'storybook', label: 'Storybook Scene', icon: Palette, themeColor: 'amber', description: 'Classic watercolor narrative.' },
  { id: 'cinematic', label: 'Cinematic Poster', icon: Clapperboard, themeColor: 'indigo', description: 'Epic movie poster with text.' },
  { id: 'papercraft', label: 'Tactile Paper', icon: Layers, themeColor: 'orange', description: 'Layered cut-paper diorama.' },
  { id: 'pixelart', label: '16-Bit Pixel RPG', icon: Gamepad2, themeColor: 'emerald', description: 'Nostalgic 90s adventure game art.' },
  { id: 'vangogh', label: 'Van Gogh Oil', icon: Palette, themeColor: 'yellow', description: 'Expressive impasto oil painting style.' },
  { id: 'rembrandt', label: 'Rembrandt Oil', icon: Palette, themeColor: 'orange', description: 'Dramatic chiaroscuro master painting.' }
];

export const backgroundSupportedModes = [
  'esl', 'doc', 'flashcard', 'icon', 'preposition', 'morphology', 'collocation',
  'mouth_guide', 'synonym_scale', 'etymology', 'infographic', 'cutaway', 'action_sequence',
  'origami', 'claymation', 'wes_anderson', 'dixit', 'visual_identity'];
