import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CustomColorPicker } from './CustomColorPicker';
import {
  Camera,
  PenTool,
  BookOpen,
  Sparkles,
  LayoutTemplate,
  Scissors,
  Columns,
  Network,
  CreditCard,
  Hexagon,
  Brain,
  Palette,
  Clapperboard,
  Layers,
  Gamepad2,
  GraduationCap,
  MessageSquare,
  Sliders,
  Compass,
  ListOrdered,
  GitBranch,
  Settings2,
  Type,
  Sun,
  Film,
  Wand2,
  Moon,
  Sparkle,
  Paintbrush,
  Square,
  Shuffle,
  Briefcase,
  Package,
  Monitor,
  Eraser
} from 'lucide-react';

interface ActiveEngineOptionsPanelProps {
  generationMode: string;
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
  useCustomBackground: boolean;
  setUseCustomBackground: (val: boolean) => void;
  isBackgroundless?: boolean;
  setIsBackgroundless?: (val: boolean) => void;

  isEslExplainer: boolean;
  setIsEslExplainer: (val: boolean) => void;
  eslExplainerFocus: 'auto' | 'definition' | 'difference' | 'expression' | 'contrast' | 'depiction';
  setEslExplainerFocus: (val: 'auto' | 'definition' | 'difference' | 'expression' | 'contrast' | 'depiction') => void;

  visualIdentityStyle?: 'modern-tech' | 'luxury-editorial' | 'organic-artisan' | 'bold-streetwear' | 'cyberpunk-future';
  setVisualIdentityStyle?: (val: 'modern-tech' | 'luxury-editorial' | 'organic-artisan' | 'bold-streetwear' | 'cyberpunk-future') => void;
  visualIdentityMockup?: 'complete-flatlay' | 'packaging-merch' | 'clothing-brand' | 'prompted' | 'digital-suite' | 'stationery-print';
  setVisualIdentityMockup?: (val: 'complete-flatlay' | 'packaging-merch' | 'clothing-brand' | 'prompted' | 'digital-suite' | 'stationery-print') => void;
  visualIdentityLighting?: 'nordic-minimal' | 'dark-luxury' | 'sunlit-atelier' | 'vibrant-studio';
  setVisualIdentityLighting?: (val: 'nordic-minimal' | 'dark-luxury' | 'sunlit-atelier' | 'vibrant-studio') => void;
  visualIdentityTextAmount?: 'full-branding' | 'emblem-only' | 'minimal-clean';
  setVisualIdentityTextAmount?: (val: 'full-branding' | 'emblem-only' | 'minimal-clean') => void;

  transparentCutoutStyle?: 'clean' | 'sticker' | 'feather';
  setTransparentCutoutStyle?: (val: 'clean' | 'sticker' | 'feather') => void;
  transparentSubjectType?: 'object' | 'character' | 'icon' | 'illustration';
  setTransparentSubjectType?: (val: 'object' | 'character' | 'icon' | 'illustration') => void;
  transparentTolerance?: number;
  setTransparentTolerance?: (val: number) => void;

  dixitRandomMode?: boolean;
  setDixitRandomMode?: (val: boolean) => void;
  dixitArtistStyle?: 'classic-hybrid' | 'coudray-revelations' | 'lefevre-origins' | 'pelissier-memories' | 'telleschi-mirrors';
  setDixitArtistStyle?: (val: 'classic-hybrid' | 'coudray-revelations' | 'lefevre-origins' | 'pelissier-memories' | 'telleschi-mirrors') => void;
  dixitMetaphorMode?: 'autonomous-poetry' | 'scale-inversion' | 'metamorphosis' | 'poetic-paradox' | 'celestial-allegory';
  setDixitMetaphorMode?: (val: 'autonomous-poetry' | 'scale-inversion' | 'metamorphosis' | 'poetic-paradox' | 'celestial-allegory') => void;

  macroStyleVariant?: 'classic-dewdrop' | 'crystalline-fractal' | 'bioluminescent-organism';
  setMacroStyleVariant?: (val: 'classic-dewdrop' | 'crystalline-fractal' | 'bioluminescent-organism') => void;

  silhouetteStyleVariant?: 'sunset-backlit' | 'cyberpunk-neon' | 'minimalist-monochrome';
  setSilhouetteStyleVariant?: (val: 'sunset-backlit' | 'cyberpunk-neon' | 'minimalist-monochrome') => void;

  origamiStyleVariant?: 'crisp-paper-fold' | 'washi-patterned' | 'metallic-foil';
  setOrigamiStyleVariant?: (val: 'crisp-paper-fold' | 'washi-patterned' | 'metallic-foil') => void;

  claymationStyleVariant?: 'tactile-stopmotion' | 'glossy-plasticine' | 'vintage-ardman';
  setClaymationStyleVariant?: (val: 'tactile-stopmotion' | 'glossy-plasticine' | 'vintage-ardman') => void;

  neonStyleVariant?: 'cyber-grid-3d' | 'vaporwave-retro' | 'holographic-blueprint';
  setNeonStyleVariant?: (val: 'cyber-grid-3d' | 'vaporwave-retro' | 'holographic-blueprint') => void;

  photoStyleVariant: 'studio-portrait' | 'action-shot' | 'editorial-macro';
  setPhotoStyleVariant: (val: 'studio-portrait' | 'action-shot' | 'editorial-macro') => void;
  photoTextAmount: 'none' | 'integrated';
  setPhotoTextAmount: (val: 'none' | 'integrated') => void;

  eslIllustrationStyle: 'vibrant-flat' | 'retro-crayon' | 'modern-isometric';
  setEslIllustrationStyle: (val: 'vibrant-flat' | 'retro-crayon' | 'modern-isometric') => void;
  eslTextAmount: 'none' | 'little' | 'full';
  setEslTextAmount: (val: 'none' | 'little' | 'full') => void;

  docPageStyle: 'vintage-dictionary' | 'clean-handwritten' | 'illuminated-manuscript';
  setDocPageStyle: (val: 'vintage-dictionary' | 'clean-handwritten' | 'illuminated-manuscript') => void;
  docTextAmount: 'short' | 'full';
  setDocTextAmount: (val: 'short' | 'full') => void;

  embroideryStitch: 'thick-yarn' | 'dense-cross-stitch' | 'delicate-satin';
  setEmbroideryStitch: (val: 'thick-yarn' | 'dense-cross-stitch' | 'delicate-satin') => void;
  embroideryTextAmount: 'none' | 'stitched';
  setEmbroideryTextAmount: (val: 'none' | 'stitched') => void;

  comicStyleVariant: 'retro-halftone' | 'manga-ink' | 'modern-indigo' | 'modern-indie';
  setComicStyleVariant: (val: 'retro-halftone' | 'manga-ink' | 'modern-indigo' | 'modern-indie') => void;
  comicTextAmount: 'none' | 'short' | 'dialogue';
  setComicTextAmount: (val: 'none' | 'short' | 'dialogue') => void;

  collageStyleVariant: 'analog-torn' | 'retro-catalogue' | 'minimalist-kraft';
  setCollageStyleVariant: (val: 'analog-torn' | 'retro-catalogue' | 'minimalist-kraft') => void;
  collageTextAmount: 'none' | 'ransom';
  setCollageTextAmount: (val: 'none' | 'ransom') => void;

  splitLayoutType: 'horizontal-diptych' | 'diagonal-slice' | 'clean-side-by-side';
  setSplitLayoutType: (val: 'horizontal-diptych' | 'diagonal-slice' | 'clean-side-by-side') => void;
  splitTextAmount: 'none' | 'labels';
  setSplitTextAmount: (val: 'none' | 'labels') => void;

  infographicStyle: 'minimalist-swiss' | 'hand-drawn-schematic' | 'vibrant-isometric';
  setInfographicStyle: (val: 'minimalist-swiss' | 'hand-drawn-schematic' | 'vibrant-isometric') => void;
  infographicTextAmount: 'short' | 'elaborate';
  setInfographicTextAmount: (val: 'short' | 'elaborate') => void;

  flashcardStyle: 'bold-minimalist' | '3-claymorphic' | 'bold-minimal' | '3d-claymorphic' | 'vintage-flashcard';
  setFlashcardStyle: (val: any) => void;
  flashcardTextAmount: 'none' | 'short' | 'free';
  setFlashcardTextAmount: (val: 'none' | 'short' | 'free') => void;

  iconStyle: 'skeuomorphic-glass' | 'vibrant-isometric' | 'glowing-flat';
  setIconStyle: (val: 'skeuomorphic-glass' | 'vibrant-isometric' | 'glowing-flat') => void;
  iconTextAmount: 'off' | 'on';
  setIconTextAmount: (val: 'off' | 'on') => void;

  mnemonicStyle: 'dali-surrealist' | 'playful-cartoon' | 'neo-noir-dreamscape';
  setMnemonicStyle: (val: 'dali-surrealist' | 'playful-cartoon' | 'neo-noir-dreamscape') => void;
  mnemonicTextAmount: 'none' | 'integrated';
  setMnemonicTextAmount: (val: 'none' | 'integrated') => void;

  storybookStyle: 'vintage-watercolor' | 'classic-gilded-age' | 'nordic-folk-art';
  setStorybookStyle: (val: 'vintage-watercolor' | 'classic-gilded-age' | 'nordic-folk-art') => void;
  storybookTextAmount: 'none' | 'page-text';
  setStorybookTextAmount: (val: 'none' | 'page-text') => void;

  cinematicLightingStyle: 'neon-noir' | 'golden-hour' | 'moody-low-key';
  setCinematicLightingStyle: (val: 'neon-noir' | 'golden-hour' | 'moody-low-key') => void;
  cinematicTextAmount: 'none' | 'title' | 'poster';
  setCinematicTextAmount: (val: 'none' | 'title' | 'poster') => void;

  papercraftDepth: 'layered-origami' | 'deep-shadowbox' | 'flat-felt';
  setPapercraftDepth: (val: 'layered-origami' | 'deep-shadowbox' | 'flat-felt') => void;
  papercraftTextAmount: 'none' | 'labels';
  setPapercraftTextAmount: (val: 'none' | 'labels') => void;

  pixelartStyle: 'retro-8bit' | 'gorgeous-16bit' | 'cyberpunk-isometric';
  setPixelartStyle: (val: 'retro-8bit' | 'gorgeous-16bit' | 'cyberpunk-isometric') => void;
  pixelartTextAmount: 'none' | 'dialog-box' | 'floating';
  setPixelartTextAmount: (val: 'none' | 'dialog-box' | 'floating') => void;

  stitchedBannerStyle: 'felt-board' | 'quilted-tapestry' | 'homespun-canvas';
  setStitchedBannerStyle: (val: 'felt-board' | 'quilted-tapestry' | 'homespun-canvas') => void;
  stitchedTextAmount: 'none' | 'titles' | 'full';
  setStitchedTextAmount: (val: 'none' | 'titles' | 'full') => void;

  vanGoghStroke: 'impasto' | 'classic' | 'swirling';
  setVanGoghStroke: (val: 'impasto' | 'classic' | 'swirling') => void;
  vanGoghPalette: 'starry' | 'sunflowers' | 'turbulent' | 'provence';
  setVanGoghPalette: (val: 'starry' | 'sunflowers' | 'turbulent' | 'provence') => void;
  vangoghTextAmount: 'none' | 'signature' | 'caption';
  setVangoghTextAmount: (val: 'none' | 'signature' | 'caption') => void;

  rembrandtLighting: 'chiaroscuro' | 'soft-glow' | 'dramatic';
  setRembrandtLighting: (val: 'chiaroscuro' | 'soft-glow' | 'dramatic') => void;
  rembrandtTexture: 'rough-impasto' | 'glazed' | 'aged-canvas';
  setRembrandtTexture: (val: 'rough-impasto' | 'glazed' | 'aged-canvas') => void;
  rembrandtTextAmount: 'none' | 'gilded' | 'monogram';
  setRembrandtTextAmount: (val: 'none' | 'gilded' | 'monogram') => void;

  chalkboardPalette: 'multicolor' | 'white-only' | 'vintage-neon';
  setChalkboardPalette: (val: 'multicolor' | 'white-only' | 'vintage-neon') => void;
  chalkboardStyle: 'traditional-classroom' | 'mathematical-draft' | 'university-lecture';
  setChalkboardStyle: (val: 'traditional-classroom' | 'mathematical-draft' | 'university-lecture') => void;
  chalkboardTextAmount: 'none' | 'titles-only' | 'full-diagram';
  setChalkboardTextAmount: (val: 'none' | 'titles-only' | 'full-diagram') => void;

  mouthGuideStyle: 'full-cross-section' | 'front-3d' | 'simplified-schema';
  setMouthGuideStyle: (val: 'full-cross-section' | 'front-3d' | 'simplified-schema') => void;
  mouthGuideColorStyle: 'clinical-neon' | 'vintage-medical' | 'friendly-crayon';
  setMouthGuideColorStyle: (val: 'clinical-neon' | 'vintage-medical' | 'friendly-crayon') => void;
  mouthGuideTextAmount: 'none' | 'phonetic-label' | 'full-anatomical';
  setMouthGuideTextAmount: (val: 'none' | 'phonetic-label' | 'full-anatomical') => void;

  synonymScaleSteps: '3-steps' | '5-steps';
  setSynonymScaleSteps: (val: '3-steps' | '5-steps') => void;
  synonymScaleStyle: 'vibrant-gradient-cards' | 'playful-cartoon' | 'minimalist-ruler';
  setSynonymScaleStyle: (val: 'vibrant-gradient-cards' | 'playful-cartoon' | 'minimalist-ruler') => void;
  synonymScaleTextAmount: 'none' | 'scale-levels' | 'detailed-definitions';
  setSynonymScaleTextAmount: (val: 'none' | 'scale-levels' | 'detailed-definitions') => void;

  cutawayStyle: 'blueprint-blue' | 'sketchbook' | 'retro-patina';
  setCutawayStyle: (val: 'blueprint-blue' | 'sketchbook' | 'retro-patina') => void;
  cutawaySubjectType: 'mechanical-gears' | 'natural-geology' | 'architectural';
  setCutawaySubjectType: (val: 'mechanical-gears' | 'natural-geology' | 'architectural') => void;
  cutawayTextAmount: 'none' | 'technical-labels' | 'detailed-specifications';
  setCutawayTextAmount: (val: 'none' | 'technical-labels' | 'detailed-specifications') => void;

  actionSequenceLayout: 'three-panels' | 'four-panels';
  setActionSequenceLayout: (val: 'three-panels' | 'four-panels') => void;
  actionSequenceStyle: 'vintage-comic' | 'modern-line-vector' | 'soft-watercolor';
  setActionSequenceStyle: (val: 'vintage-comic' | 'modern-line-vector' | 'soft-watercolor') => void;
  actionSequenceTextAmount: 'none' | 'captions-only' | 'full-narration';
  setActionSequenceTextAmount: (val: 'none' | 'captions-only' | 'full-narration') => void;

  etymologyStyle: 'ancient-scroll' | 'vibrant-infographic' | 'botanical-sketch';
  setEtymologyStyle: (val: 'ancient-scroll' | 'vibrant-infographic' | 'botanical-sketch') => void;
  etymologyBranchLayout: 'majestic-oak' | 'stylized-vining' | 'symmetrical-radial';
  setEtymologyBranchLayout: (val: 'majestic-oak' | 'stylized-vining' | 'symmetrical-radial') => void;
  etymologyTextAmount: 'none' | 'root-and-words' | 'exhaustive-notes';
  setEtymologyTextAmount: (val: 'none' | 'root-and-words' | 'exhaustive-notes') => void;

  prepositionStyle: 'architectural-3d' | 'playful-isometric' | 'abstract-geometry';
  setPrepositionStyle: (val: 'architectural-3d' | 'playful-isometric' | 'abstract-geometry') => void;
  prepositionTextAmount: 'none' | 'arrows-only' | 'full-sentences';
  setPrepositionTextAmount: (val: 'none' | 'arrows-only' | 'full-sentences') => void;

  morphologyStyle: 'wooden-blocks' | 'glowing-modular' | 'letterpress-type';
  setMorphologyStyle: (val: 'wooden-blocks' | 'glowing-modular' | 'letterpress-type') => void;
  morphologyTextAmount: 'none' | 'morphemes-only' | 'etymology-notes';
  setMorphologyTextAmount: (val: 'none' | 'morphemes-only' | 'etymology-notes') => void;

  collocationStyle: 'mindmap-bubbles' | 'chalk-web' | 'vector-nodes';
  setCollocationStyle: (val: 'mindmap-bubbles' | 'chalk-web' | 'vector-nodes') => void;
  collocationTextAmount: 'none' | 'words-only' | 'example-sentences';
  setCollocationTextAmount: (val: 'none' | 'words-only' | 'example-sentences') => void;

  wesAndersonStyle: 'whimsical-drawing' | 'vintage-collage' | 'symmetrical-cinematic' | 'pastel-collage';
  setWesAndersonStyle: (val: 'whimsical-drawing' | 'vintage-collage' | 'symmetrical-cinematic' | 'pastel-collage') => void;
  wesAndersonTextAmount: 'none' | 'labels' | 'title';
  setWesAndersonTextAmount: (val: 'none' | 'labels' | 'title') => void;
}

export const ActiveEngineOptionsPanel: React.FC<ActiveEngineOptionsPanelProps> = ({
  generationMode,
  backgroundColor,
  setBackgroundColor,
  useCustomBackground,
  setUseCustomBackground,
  isBackgroundless = false,
  setIsBackgroundless,

  isEslExplainer,
  setIsEslExplainer,
  eslExplainerFocus,
  setEslExplainerFocus,

  macroStyleVariant = 'classic-dewdrop',
  setMacroStyleVariant,
  silhouetteStyleVariant = 'sunset-backlit',
  setSilhouetteStyleVariant,
  origamiStyleVariant = 'crisp-paper-fold',
  setOrigamiStyleVariant,
  claymationStyleVariant = 'tactile-stopmotion',
  setClaymationStyleVariant,
  neonStyleVariant = 'cyber-grid-3d',
  setNeonStyleVariant,

  visualIdentityStyle = 'modern-tech',
  setVisualIdentityStyle,
  visualIdentityMockup = 'complete-flatlay',
  setVisualIdentityMockup,
  visualIdentityLighting = 'nordic-minimal',
  setVisualIdentityLighting,
  visualIdentityTextAmount = 'full-branding',
  setVisualIdentityTextAmount,

  transparentCutoutStyle = 'clean',
  setTransparentCutoutStyle,
  transparentSubjectType = 'object',
  setTransparentSubjectType,
  transparentTolerance = 32,
  setTransparentTolerance,

  dixitRandomMode = false,
  setDixitRandomMode,
  dixitArtistStyle = 'classic-hybrid',
  setDixitArtistStyle,
  dixitMetaphorMode = 'autonomous-poetry',
  setDixitMetaphorMode,

  wesAndersonStyle,
  setWesAndersonStyle,
  wesAndersonTextAmount,
  setWesAndersonTextAmount,

  photoStyleVariant,
  setPhotoStyleVariant,
  photoTextAmount,
  setPhotoTextAmount,

  eslIllustrationStyle,
  setEslIllustrationStyle,
  eslTextAmount,
  setEslTextAmount,

  docPageStyle,
  setDocPageStyle,
  docTextAmount,
  setDocTextAmount,

  embroideryStitch,
  setEmbroideryStitch,
  embroideryTextAmount,
  setEmbroideryTextAmount,

  comicStyleVariant,
  setComicStyleVariant,
  comicTextAmount,
  setComicTextAmount,

  collageStyleVariant,
  setCollageStyleVariant,
  collageTextAmount,
  setCollageTextAmount,

  splitLayoutType,
  setSplitLayoutType,
  splitTextAmount,
  setSplitTextAmount,

  infographicStyle,
  setInfographicStyle,
  infographicTextAmount,
  setInfographicTextAmount,

  flashcardStyle,
  setFlashcardStyle,
  flashcardTextAmount,
  setFlashcardTextAmount,

  iconStyle,
  setIconStyle,
  iconTextAmount,
  setIconTextAmount,

  mnemonicStyle,
  setMnemonicStyle,
  mnemonicTextAmount,
  setMnemonicTextAmount,

  storybookStyle,
  setStorybookStyle,
  storybookTextAmount,
  setStorybookTextAmount,

  cinematicLightingStyle,
  setCinematicLightingStyle,
  cinematicTextAmount,
  setCinematicTextAmount,

  papercraftDepth,
  setPapercraftDepth,
  papercraftTextAmount,
  setPapercraftTextAmount,

  pixelartStyle,
  setPixelartStyle,
  pixelartTextAmount,
  setPixelartTextAmount,

  stitchedBannerStyle,
  setStitchedBannerStyle,
  stitchedTextAmount,
  setStitchedTextAmount,

  vanGoghStroke,
  setVanGoghStroke,
  vanGoghPalette,
  setVanGoghPalette,
  vangoghTextAmount,
  setVangoghTextAmount,

  rembrandtLighting,
  setRembrandtLighting,
  rembrandtTexture,
  setRembrandtTexture,
  rembrandtTextAmount,
  setRembrandtTextAmount,

  chalkboardPalette,
  setChalkboardPalette,
  chalkboardStyle,
  setChalkboardStyle,
  chalkboardTextAmount,
  setChalkboardTextAmount,

  mouthGuideStyle,
  setMouthGuideStyle,
  mouthGuideColorStyle,
  setMouthGuideColorStyle,
  mouthGuideTextAmount,
  setMouthGuideTextAmount,

  synonymScaleSteps,
  setSynonymScaleSteps,
  synonymScaleStyle,
  setSynonymScaleStyle,
  synonymScaleTextAmount,
  setSynonymScaleTextAmount,

  cutawayStyle,
  setCutawayStyle,
  cutawaySubjectType,
  setCutawaySubjectType,
  cutawayTextAmount,
  setCutawayTextAmount,

  actionSequenceLayout,
  setActionSequenceLayout,
  actionSequenceStyle,
  setActionSequenceStyle,
  actionSequenceTextAmount,
  setActionSequenceTextAmount,

  etymologyStyle,
  setEtymologyStyle,
  etymologyBranchLayout,
  setEtymologyBranchLayout,
  etymologyTextAmount,
  setEtymologyTextAmount,

  prepositionStyle,
  setPrepositionStyle,
  prepositionTextAmount,
  setPrepositionTextAmount,

  morphologyStyle,
  setMorphologyStyle,
  morphologyTextAmount,
  setMorphologyTextAmount,

  collocationStyle,
  setCollocationStyle,
  collocationTextAmount,
  setCollocationTextAmount
}) => {
  return (
    <div className="bg-[#111827] rounded-xl p-3 border border-[#1e293b] shadow-lg space-y-3">
      <div className="flex items-center justify-between border-b border-[#1e293b] pb-2">
        <div className="flex items-center gap-1.5">
          <Settings2 className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-[10px] font-bold text-slate-200 uppercase tracking-widest">
            Engine Options
          </span>
        </div>
        <span className="text-[9px] font-mono text-cyan-500 bg-cyan-950/40 border border-cyan-900/60 px-1.5 py-0.5 rounded uppercase font-bold">
          {generationMode.replace('_', ' ')}
        </span>
      </div>

      <div className="space-y-3">
        {/* Global Illustrative ESL Explainer Toggle */}
        <div className={`transition-all rounded-lg border ${
          isEslExplainer 
            ? 'p-2.5 bg-[#0c101c] border-fuchsia-500/40 shadow-md shadow-fuchsia-950/20' 
            : 'p-2 bg-[#090d16] border-[#1e293b] hover:border-slate-700'
        }`}>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className={`p-1.5 rounded-md transition-all shrink-0 ${
                isEslExplainer 
                  ? 'bg-fuchsia-600 text-white shadow-sm' 
                  : 'bg-slate-800/80 text-slate-400 border border-slate-700/50'
              }`}>
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] font-bold text-slate-100 truncate">Illustrative ESL Explainer</span>
                  <span className="text-[7px] font-bold px-1.5 py-0.2 bg-fuchsia-950/80 text-fuchsia-300 rounded border border-fuchsia-800/50 uppercase tracking-wider">
                    Smart Explainer
                  </span>
                </div>
                <p className="text-[8px] text-slate-400 leading-tight truncate mt-0.5">
                  Visual classroom explainer mode for target concept.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsEslExplainer(!isEslExplainer)}
              className={`px-2.5 py-1 text-[8.5px] font-extrabold rounded-md border uppercase tracking-wider transition-all flex items-center gap-1 shrink-0 ${
                isEslExplainer 
                  ? 'bg-fuchsia-600 hover:bg-fuchsia-500 text-white border-fuchsia-400 shadow-sm' 
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
              }`}
            >
              {isEslExplainer ? 'Active ✨' : 'Enable'}
            </button>
          </div>

          {isEslExplainer && (
            <div className="mt-2.5 pt-2 border-t border-fuchsia-900/30 space-y-1.5">
              <div className="flex items-center justify-between text-[8px] font-bold text-fuchsia-300 uppercase tracking-wider">
                <span>Explainer Target Focus</span>
                <span className="text-emerald-400 font-mono text-[7.5px] bg-emerald-950/50 px-1 py-0.2 rounded border border-emerald-800/40">
                  Auto-Detect Active
                </span>
              </div>
              <div className="grid grid-cols-2 gap-1">
                {[
                  { id: 'auto', label: '✨ Auto Smart', desc: 'Auto-detects optimal structure' },
                  { id: 'definition', label: '📖 Definition', desc: 'Core concept visual aid' },
                  { id: 'difference', label: '⚖️ Differences', desc: 'Visual comparisons' },
                  { id: 'expression', label: '💡 Idioms', desc: 'Figurative context' },
                  { id: 'contrast', label: '🌗 Contrast', desc: 'Side-by-side opposites' },
                  { id: 'depiction', label: '🎨 Pure Visual', desc: '100% Wordless depiction' }
                ].map(focus => (
                  <button
                    key={focus.id}
                    type="button"
                    onClick={() => setEslExplainerFocus(focus.id as any)}
                    className={`p-1.5 text-left rounded-md border transition-all ${
                      eslExplainerFocus === focus.id 
                        ? 'bg-fuchsia-900/70 text-white border-fuchsia-400 shadow-sm' 
                        : 'bg-[#080c14] text-slate-400 border-slate-800/80 hover:bg-slate-800 hover:text-slate-200'
                    }`}
                  >
                    <div className="text-[8.5px] font-bold flex items-center justify-between">
                      <span>{focus.label}</span>
                      {eslExplainerFocus === focus.id && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
                    </div>
                    <div className="text-[7px] opacity-75 mt-0.5 leading-tight font-normal truncate">
                      {focus.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* NO BACKGROUND / TRANSPARENT CUTOUT ENGINE */}
        {(generationMode === 'no_background' || isBackgroundless) && (
          <div className="space-y-3 bg-[#080c14] p-3.5 rounded-xl border border-emerald-900/40 shadow-inner">
            {/* Engine Overview Header */}
            <div className="flex items-center justify-between pb-2 border-b border-emerald-950/60">
              <div className="flex items-center gap-2">
                <div className="p-1 rounded-md bg-emerald-950/60 border border-emerald-500/30 text-emerald-400">
                  <Eraser className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider">Backgroundless Cutout Engine</div>
                  <div className="text-[8px] text-emerald-400/70">Exports as pure transparent alpha .png</div>
                </div>
              </div>
              <div className="px-2 py-0.5 rounded-full text-[8px] font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-800/50 flex items-center gap-1 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                TRANSPARENT PNG
              </div>
            </div>

            {/* 1. Subject Type */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="flex items-center gap-1.5 text-[9.5px] font-bold text-emerald-400 uppercase tracking-widest">
                  <Package className="w-3.5 h-3.5 text-emerald-400" /> Subject Type
                </label>
                <span className="text-[8px] text-emerald-300/70 font-medium">Isolation Target</span>
              </div>
              <div className="grid grid-cols-2 gap-1">
                {[
                  { id: 'object', label: 'Product & Object', desc: 'Merchandise, electronics, food or items' },
                  { id: 'character', label: 'Character & Person', desc: 'Human, creature or mascot with clean silhouette' },
                  { id: 'icon', label: '3D Icon & Asset', desc: 'Chunky UI icon or volumetric game asset' },
                  { id: 'illustration', label: 'Artistic Clipart', desc: 'Graphic vector or hand-drawn cutout' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setTransparentSubjectType && setTransparentSubjectType(item.id as any)}
                    className={`p-1.5 rounded-lg border text-left transition-all ${
                      transparentSubjectType === item.id
                        ? 'bg-emerald-950/60 border-emerald-500 shadow-[inset_0_0_12px_rgba(16,185,129,0.2)] text-emerald-200'
                        : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:border-emerald-800/50'
                    }`}
                  >
                    <div className="font-semibold text-[9.5px] text-slate-200 flex items-center justify-between">
                      {item.label}
                      {transparentSubjectType === item.id && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                    </div>
                    <div className="text-[7.5px] text-slate-400 opacity-80 mt-0.5 leading-tight font-normal truncate">
                      {item.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Cutout Alpha Style */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="flex items-center gap-1.5 text-[9.5px] font-bold text-emerald-400 uppercase tracking-widest">
                  <Eraser className="w-3.5 h-3.5 text-emerald-400" /> Cutout Finish & Edge
                </label>
                <span className="text-[8px] text-emerald-300/70 font-medium">Alpha Style</span>
              </div>
              <div className="grid grid-cols-3 gap-1">
                {[
                  { id: 'clean', label: 'Clean Alpha', desc: 'Crisp transparent edge' },
                  { id: 'sticker', label: 'Vinyl Sticker', desc: 'Die-cut white border' },
                  { id: 'feather', label: 'Soft Edge', desc: 'Smooth anti-aliasing' }
                ].map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setTransparentCutoutStyle && setTransparentCutoutStyle(style.id as any)}
                    className={`p-1.5 rounded-lg border text-left transition-all ${
                      transparentCutoutStyle === style.id
                        ? 'bg-emerald-950/60 border-emerald-500 shadow-[inset_0_0_12px_rgba(16,185,129,0.2)] text-emerald-200'
                        : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:border-emerald-800/50'
                    }`}
                  >
                    <div className="font-semibold text-[9.5px] text-slate-200 flex items-center justify-between">
                      {style.label}
                      {transparentCutoutStyle === style.id && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                    </div>
                    <div className="text-[7.5px] text-slate-400 opacity-80 mt-0.5 leading-tight font-normal">
                      {style.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Extraction Sensitivity */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="flex items-center gap-1.5 text-[9.5px] font-bold text-emerald-400 uppercase tracking-widest">
                  <Settings2 className="w-3.5 h-3.5 text-emerald-400" /> Cutout Sensitivity
                </label>
                <span className="text-[8px] text-emerald-300 font-mono font-medium">Tolerance: {transparentTolerance}</span>
              </div>
              <div className="grid grid-cols-3 gap-1">
                {[
                  { val: 22, label: 'Tight', desc: 'Preserves edge fringes' },
                  { val: 32, label: 'Balanced', desc: 'Optimal studio cutout' },
                  { val: 48, label: 'Aggressive', desc: 'Removes deep halos' }
                ].map((preset) => (
                  <button
                    key={preset.val}
                    onClick={() => setTransparentTolerance && setTransparentTolerance(preset.val)}
                    className={`p-1 rounded-md border text-center transition-all ${
                      transparentTolerance === preset.val
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-bold'
                        : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:border-emerald-900/50'
                    }`}
                  >
                    <div className="text-[9px] text-slate-200">{preset.label}</div>
                    <div className="text-[7px] text-slate-500">{preset.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Transparent Checkerboard Indicator Box */}
            <div className="p-2 rounded-lg bg-[#0b0f19] border border-emerald-900/30 flex items-center gap-2">
              <div className="w-6 h-6 rounded border border-emerald-700/50 shrink-0 bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:6px_6px] bg-slate-950 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              </div>
              <div className="text-[8px] text-slate-400 leading-snug">
                <span className="text-emerald-300 font-bold">Studio Auto-Isolation:</span> Image generates on a pure white void with zero ground shadow, then instantly converts into a genuine alpha transparent <span className="text-emerald-300 font-mono">.png</span>.
              </div>
            </div>
          </div>
        )}

        {/* VISUAL IDENTITY & BRANDING ENGINE */}
        {generationMode === 'visual_identity' && (
          <div className="space-y-3 bg-[#080c14] p-3.5 rounded-xl border border-indigo-900/40 shadow-inner">
            {/* 1. Brand Identity Style & Aesthetic */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="flex items-center gap-1.5 text-[9.5px] font-bold text-indigo-400 uppercase tracking-widest">
                  <Briefcase className="w-3.5 h-3.5 text-indigo-400" /> Brand Identity Archetype
                </label>
                <span className="text-[8px] text-indigo-300/70 font-medium">Design Style</span>
              </div>
              <div className="grid grid-cols-1 gap-1">
                {[
                  {
                    id: 'modern-tech',
                    icon: '⚡',
                    label: 'Modern Tech Minimalist',
                    desc: 'Clean geometric vector logo, Swiss typography, monochrome with electric neon accent'
                  },
                  {
                    id: 'luxury-editorial',
                    icon: '💎',
                    label: 'Luxury & High Fashion',
                    desc: 'Refined serif monogram, embossed metallic gold foil, muted earth tones & matte noir'
                  },
                  {
                    id: 'organic-artisan',
                    icon: '🌿',
                    label: 'Organic Artisan & Sustainable',
                    desc: 'Hand-drawn botanical emblem, warm terracotta/sage tones, tactile kraft paper textures'
                  },
                  {
                    id: 'bold-streetwear',
                    icon: '🔥',
                    label: 'Bold Streetwear & Neo-Pop',
                    desc: 'High-contrast heavy display type, punchy emblem, vibrant dynamic color clash'
                  },
                  {
                    id: 'cyberpunk-future',
                    icon: '🔮',
                    label: 'Futuristic Cyber Industrial',
                    desc: 'Glowing holographic glyph logo, isometric sci-fi typography, dark titanium surfaces'
                  }
                ].map((style) => (
                  <button
                    key={style.id}
                    type="button"
                    onClick={() => setVisualIdentityStyle?.(style.id as any)}
                    className={`py-1.5 px-2 text-left rounded-lg border transition-all ${
                      visualIdentityStyle === style.id
                        ? 'bg-indigo-950/80 border-indigo-500 text-indigo-100 shadow-[0_0_12px_rgba(99,102,241,0.25)]'
                        : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:border-indigo-900 hover:bg-[#121829]'
                    }`}
                  >
                    <div className="text-[9px] font-bold flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <span>{style.icon}</span>
                        <span>{style.label}</span>
                      </span>
                      {visualIdentityStyle === style.id && (
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                      )}
                    </div>
                    <div className="text-[7.5px] opacity-75 mt-0.5 leading-tight font-normal">
                      {style.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Product Showcase Mockup */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="flex items-center gap-1.5 text-[9.5px] font-bold text-indigo-400 uppercase tracking-widest">
                  <Package className="w-3.5 h-3.5 text-indigo-400" /> Product Mockup & Collateral
                </label>
                <span className="text-[8px] text-indigo-300/70 font-medium">Showcase Layout</span>
              </div>
              <div className="grid grid-cols-2 gap-1">
                {[
                  { id: 'complete-flatlay', label: 'Full Collateral Flatlay', desc: 'Tote, stationery, cup, box & phone' },
                  { id: 'clothing-brand', label: 'Clothing Brand', desc: 'High-quality apparel, woven tags, luxury fabrics' },
                  { id: 'packaging-merch', label: 'Packaging & Merch', desc: 'Bottles, rigid boxes, apparel tags' },
                  { id: 'prompted', label: 'Prompted (Custom)', desc: 'Products tailored directly to your prompt' },
                  { id: 'digital-suite', label: 'Digital Workspace', desc: 'Laptop, tablet, smartphone with UI' },
                  { id: 'stationery-print', label: 'Premium Stationery', desc: 'Cotton cards, foil letterhead, wax seal' }
                ].map((mockup) => (
                  <button
                    key={mockup.id}
                    type="button"
                    onClick={() => setVisualIdentityMockup?.(mockup.id as any)}
                    className={`py-1.5 px-2 text-left rounded-lg border transition-all ${
                      visualIdentityMockup === mockup.id
                        ? 'bg-indigo-950/80 border-indigo-500 text-indigo-100 shadow-[0_0_10px_rgba(99,102,241,0.2)]'
                        : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:border-indigo-900 hover:bg-[#121829]'
                    }`}
                  >
                    <div className="text-[8.5px] font-bold truncate">{mockup.label}</div>
                    <div className="text-[7px] opacity-75 mt-0.5 truncate leading-tight font-normal">{mockup.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Studio Lighting & Atmosphere */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="flex items-center gap-1.5 text-[9.5px] font-bold text-indigo-400 uppercase tracking-widest">
                  <Sun className="w-3.5 h-3.5 text-indigo-400" /> Studio Lighting Mood
                </label>
                <span className="text-[8px] text-indigo-300/70 font-medium">Environment</span>
              </div>
              <div className="grid grid-cols-2 gap-1">
                {[
                  { id: 'nordic-minimal', label: 'Nordic Daylight', desc: 'Clean diffused light, subtle shadows' },
                  { id: 'dark-luxury', label: 'Dark Luxury Studio', desc: 'Low-key spotlighting, charcoal matte' },
                  { id: 'sunlit-atelier', label: 'Sunlit Atelier', desc: 'Golden sunlight through window blinds' },
                  { id: 'vibrant-studio', label: 'Color Block Pop', desc: 'Bright studio, crisp drop shadows' }
                ].map((light) => (
                  <button
                    key={light.id}
                    type="button"
                    onClick={() => setVisualIdentityLighting?.(light.id as any)}
                    className={`py-1.5 px-2 text-left rounded-lg border transition-all ${
                      visualIdentityLighting === light.id
                        ? 'bg-indigo-950/80 border-indigo-500 text-indigo-100 shadow-[0_0_10px_rgba(99,102,241,0.2)]'
                        : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:border-indigo-900 hover:bg-[#121829]'
                    }`}
                  >
                    <div className="text-[8.5px] font-bold truncate">{light.label}</div>
                    <div className="text-[7px] opacity-75 mt-0.5 truncate leading-tight font-normal">{light.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Brand Text & Typography Application */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="flex items-center gap-1.5 text-[9.5px] font-bold text-indigo-400 uppercase tracking-widest">
                  <Type className="w-3.5 h-3.5 text-indigo-400" /> Brand Text & Typography
                </label>
                <span className="text-[8px] text-indigo-300/70 font-medium">Integration</span>
              </div>
              <div className="grid grid-cols-1 gap-1">
                {[
                  { id: 'full-branding', label: 'Full Brand Identity Suite', desc: 'Emblem logo, brand wordmark, tagline & typography across products' },
                  { id: 'emblem-only', label: 'Iconic Logo Emblem Only', desc: 'Minimalist logo symbol or monogram featured on products without paragraphs' },
                  { id: 'minimal-clean', label: 'Product-Centric Clean', desc: 'Subtle understated logo stamps emphasizing pure product forms & materials' }
                ].map((txt) => (
                  <button
                    key={txt.id}
                    type="button"
                    onClick={() => setVisualIdentityTextAmount?.(txt.id as any)}
                    className={`py-1.5 px-2 text-left rounded-lg border transition-all ${
                      visualIdentityTextAmount === txt.id
                        ? 'bg-indigo-950/80 border-indigo-500 text-indigo-100 shadow-[0_0_10px_rgba(99,102,241,0.2)]'
                        : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:border-indigo-900 hover:bg-[#121829]'
                    }`}
                  >
                    <div className="text-[8.5px] font-bold flex items-center justify-between">
                      <span>{txt.label}</span>
                      {visualIdentityTextAmount === txt.id && (
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                      )}
                    </div>
                    <div className="text-[7px] opacity-75 mt-0.5 leading-tight font-normal">
                      {txt.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* DIXIT DREAMSCAPE SURREAL ART ENGINE - SMART & STREAMLINED */}
        {generationMode === 'dixit' && (
          <div className="space-y-3 bg-[#080c14] p-3.5 rounded-xl border border-purple-900/40 shadow-inner">
            {/* Randomizer Mode Flat Button - Placed before all other buttons */}
            <button
              type="button"
              onClick={() => setDixitRandomMode?.(!dixitRandomMode)}
              className={`w-full py-1.5 px-2.5 rounded-lg border text-left transition-all duration-200 flex items-center justify-between group ${
                dixitRandomMode
                  ? 'bg-purple-950/90 border-purple-400 text-purple-100 shadow-[0_0_15px_rgba(168,85,247,0.3)] ring-1 ring-purple-400/50'
                  : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:border-purple-500/50 hover:text-purple-300 hover:bg-[#121829]'
              }`}
            >
              <div className="flex items-center gap-2">
                <div className={`w-5 h-5 rounded flex items-center justify-center text-xs transition-colors shrink-0 ${
                  dixitRandomMode ? 'bg-purple-500/20 text-purple-300' : 'bg-slate-800/80 text-slate-400 group-hover:text-purple-300'
                }`}>
                  <Shuffle className="w-3 h-3" />
                </div>
                <div className="min-w-0">
                  <div className="text-[9.5px] font-bold flex items-center gap-1.5 flex-wrap">
                    <span>Randomizer Mode</span>
                    {dixitRandomMode ? (
                      <span className="text-[7.5px] uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-purple-500/25 text-purple-300 border border-purple-500/40 font-semibold animate-pulse">
                        Active • Shuffles Every Round
                      </span>
                    ) : (
                      <span className="text-[8px] text-slate-500">Pick random combination each round</span>
                    )}
                  </div>
                  {dixitRandomMode && (
                    <div className="text-[7.5px] text-purple-200/75 mt-0.5 font-normal">
                      Every round dynamically rolls a fresh dream universe, metaphor depth & presentation style.
                    </div>
                  )}
                </div>
              </div>
              <div className={`px-2 py-0.5 text-[8px] font-bold rounded uppercase tracking-wider transition-all shrink-0 ml-2 ${
                dixitRandomMode ? 'bg-purple-400 text-slate-950 shadow-sm' : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700'
              }`}>
                {dixitRandomMode ? 'ON' : 'OFF'}
              </div>
            </button>

            {/* When Randomizer is activated, the other buttons roll up and only it stays activated */}
            <AnimatePresence initial={false}>
              {!dixitRandomMode && (
                <motion.div
                  key="dixit-options-collapsible"
                  initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
                  animate={{ opacity: 1, height: 'auto', overflow: 'visible' }}
                  exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="space-y-4 pt-1"
                >
                  {/* 1. Curated Dream Universe */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="flex items-center gap-1.5 text-[10px] font-bold text-purple-400 uppercase tracking-widest">
                        <Palette className="w-3.5 h-3.5 text-purple-400" /> Surreal Dream Universe
                      </label>
                      <span className="text-[8.5px] text-purple-300/70 font-medium">Curated Art Archetypes</span>
                    </div>
                    <div className="grid grid-cols-1 gap-1.5">
                      {[
                        {
                          id: 'classic-hybrid',
                          icon: '🌟',
                          title: 'Classic Dreamscape (Cardouat & Collette)',
                          desc: 'Velvety gouache, luminous twilight skies, crescent moons, floating sailboats & gentle wonder'
                        },
                        {
                          id: 'coudray-revelations',
                          icon: '👑',
                          title: 'Gilded Revelations (Art Nouveau & Mucha)',
                          desc: '24K gold foil ornamentation, celestial tarot filigree, intricate constellations & Klimt elegance'
                        },
                        {
                          id: 'lefevre-origins',
                          icon: '🕰️',
                          title: 'Curiosity & Clockwork (Vintage Storybook)',
                          desc: 'Antique brass apparatus, whimsical curiosity cabinets, shadow puppets & nostalgic mystery'
                        },
                        {
                          id: 'pelissier-memories',
                          icon: '🌿',
                          title: 'Luminous Biome (Enchanted Fantasy)',
                          desc: 'Radiant glowing nature, bioluminescent flora, wet watercolor bleeding & vivid dream ecosystems'
                        },
                        {
                          id: 'telleschi-mirrors',
                          icon: '🪞',
                          title: 'Surreal Paradox (Magritte & Optical Dualities)',
                          desc: 'Mirrored alternate realities, impossible perspective, day/night contrasts & gravity inversions'
                        }
                      ].map(universe => (
                        <button
                          key={universe.id}
                          type="button"
                          onClick={() => setDixitArtistStyle?.(universe.id as any)}
                          className={`p-2 text-left rounded-lg border transition-all ${
                            dixitArtistStyle === universe.id
                              ? 'bg-purple-950/70 border-purple-400 text-purple-100 shadow-[0_0_12px_rgba(168,85,247,0.25)] ring-1 ring-purple-400/40'
                              : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:bg-[#141b2d] hover:text-slate-200'
                          }`}
                        >
                          <div className="flex items-center justify-between text-[10px] font-bold">
                            <span className="flex items-center gap-1.5">
                              <span>{universe.icon}</span>
                              <span>{universe.title}</span>
                            </span>
                            {dixitArtistStyle === universe.id && (
                              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                            )}
                          </div>
                          <div className="text-[8px] opacity-75 mt-0.5 leading-snug font-normal">
                            {universe.desc}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 2. AI Metaphor Depth (The AI's Creative Intelligence) */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="flex items-center gap-1.5 text-[10px] font-bold text-violet-400 uppercase tracking-widest">
                        <Brain className="w-3.5 h-3.5 text-violet-400" /> AI Metaphor Depth
                      </label>
                      <span className="text-[8.5px] text-violet-300/70 font-medium">Semantic Dream Logic</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {[
                        {
                          id: 'autonomous-poetry',
                          icon: '🌌',
                          label: 'Autonomous Dream Poetry',
                          badge: 'Max AI Creativity',
                          desc: 'AI freely synthesizes unexpected, profound visual allegories from your word'
                        },
                        {
                          id: 'poetic-paradox',
                          icon: '☂️',
                          label: 'Poetic Paradox & Irony',
                          badge: 'Impossible Physics',
                          desc: 'Inside-out umbrellas, desert sailboats, underwater flames & celestial keys'
                        },
                        {
                          id: 'scale-inversion',
                          icon: '🔍',
                          label: 'Miniature Worlds',
                          badge: 'Scale Inversion',
                          desc: 'Tiny curious wanderers exploring giant pocketwatches and floral landscapes'
                        },
                        {
                          id: 'metamorphosis',
                          icon: '🦋',
                          label: 'Living Metamorphosis',
                          badge: 'Organic Shifts',
                          desc: 'Musical instruments growing tree roots and cloud formations turning into swans'
                        },
                        {
                          id: 'celestial-allegory',
                          icon: '🌙',
                          label: 'Celestial Allegory',
                          badge: 'Cosmic Dreams',
                          desc: 'Catching moons in butterfly nets, star-filled jars & ladders into the cosmos'
                        }
                      ].map(mode => (
                        <button
                          key={mode.id}
                          type="button"
                          onClick={() => setDixitMetaphorMode?.(mode.id as any)}
                          className={`p-2 text-left rounded-lg border transition-all ${
                            dixitMetaphorMode === mode.id
                              ? 'bg-violet-950/70 border-violet-400 text-violet-100 shadow-[0_0_10px_rgba(139,92,246,0.2)] ring-1 ring-violet-400/40'
                              : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:bg-[#141b2d] hover:text-slate-200'
                          }`}
                        >
                          <div className="flex items-center justify-between text-[9.5px] font-bold">
                            <span className="flex items-center gap-1 truncate">
                              <span>{mode.icon}</span>
                              <span className="truncate">{mode.label}</span>
                            </span>
                          </div>
                          <div className="text-[7.5px] text-violet-300/80 font-medium mt-0.5">{mode.badge}</div>
                          <div className="text-[7.5px] opacity-75 mt-0.5 leading-tight font-normal line-clamp-2">
                            {mode.desc}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* WES ANDERSON ART */}
        {generationMode === 'wes_anderson' && (
          <div className="space-y-3 bg-[#080c14] p-3 rounded-xl border border-amber-900/40">
            <div>
              <label className="flex items-center gap-1.5 text-[9px] font-bold text-amber-400 uppercase tracking-widest mb-1.5">
                <Film className="w-3 h-3 text-amber-400" /> Wes Anderson Aesthetic Style
              </label>
              <div className="grid grid-cols-1 gap-1.5">
                {[
                  { id: 'whimsical-drawing', label: 'Whimsical Architectural Line Drawing', desc: 'Detailed 2D facades & symmetrical line art' },
                  { id: 'vintage-collage', label: 'Eccentric Vintage Cutout Collage', desc: 'Paper cutouts, magazine scraps & open colorways' },
                  { id: 'symmetrical-cinematic', label: 'Symmetrical Cinematic Tableau', desc: 'Dead-center axial symmetry & 1-point diorama' }
                ].map(option => (
                  <button 
                    key={option.id} 
                    type="button"
                    onClick={() => setWesAndersonStyle(option.id as any)} 
                    className={`p-2 rounded-lg text-left border transition-all ${
                      wesAndersonStyle === option.id || (wesAndersonStyle === 'pastel-collage' && option.id === 'vintage-collage')
                        ? 'bg-amber-700/80 text-white border-amber-400 shadow-sm' 
                        : 'bg-[#0d1321] border-[#1e293b] text-slate-400 hover:bg-[#1e293b] hover:text-slate-200'
                    }`}
                  >
                    <div className="text-[9.5px] font-bold flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${wesAndersonStyle === option.id ? 'bg-amber-300' : 'bg-slate-600'}`} />
                      {option.label}
                    </div>
                    <div className="text-[8px] opacity-75 pl-3 mt-0.5">{option.desc}</div>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-[9px] font-bold text-amber-400 uppercase tracking-widest mb-1.5">
                <Type className="w-3 h-3 text-amber-400" /> Typography & Labeling
              </label>
              <div className="grid grid-cols-3 gap-1">
                {[
                  { id: 'none', label: 'Wordless' },
                  { id: 'labels', label: 'Label-Maker' },
                  { id: 'title', label: 'Futura Title' }
                ].map(item => (
                  <button 
                    key={item.id} 
                    type="button"
                    onClick={() => setWesAndersonTextAmount(item.id as any)} 
                    className={`py-1.5 px-1 text-[8.5px] font-bold rounded-md flex items-center justify-center border uppercase tracking-wider transition-all ${
                      wesAndersonTextAmount === item.id ? 'bg-amber-600 text-white border-amber-400' : 'bg-[#0d1321] border-[#1e293b] text-slate-400 hover:bg-[#1e293b]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* MACRO */}
        {generationMode === 'macro' && (
          <div className="space-y-3">
            <div>
              <label className="flex items-center gap-1.5 text-[9px] font-bold text-cyan-400/80 uppercase tracking-widest mb-1.5">
                <Camera className="w-2.5 h-2.5" /> Macro Lens Variant
              </label>
              <div className="grid grid-cols-1 gap-1">
                {[
                  { id: 'classic-dewdrop', label: 'Classic Dewdrop Focus' },
                  { id: 'crystalline-fractal', label: 'Crystalline Prism Facet' },
                  { id: 'bioluminescent-organism', label: 'Bioluminescent Organic Sheen' }
                ].map(option => (
                  <button key={option.id} onClick={() => setMacroStyleVariant?.(option.id as any)} className={`py-1.5 px-2 text-[9px] font-bold rounded flex items-center justify-start gap-1.5 border uppercase tracking-wider transition-all ${macroStyleVariant === option.id ? 'bg-cyan-600 text-white border-cyan-500' : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:bg-[#1e293b]'}`}>
                    <span className="w-1 h-1 rounded-full bg-current" />
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SILHOUETTE */}
        {generationMode === 'silhouette' && (
          <div className="space-y-3">
            <div>
              <label className="flex items-center gap-1.5 text-[9px] font-bold text-amber-400/80 uppercase tracking-widest mb-1.5">
                <Layers className="w-2.5 h-2.5" /> Silhouette Atmosphere
              </label>
              <div className="grid grid-cols-1 gap-1">
                {[
                  { id: 'sunset-backlit', label: 'Fiery Sunset Backlit' },
                  { id: 'cyberpunk-neon', label: 'Cyberpunk Neon Haze' },
                  { id: 'minimalist-monochrome', label: 'Minimal High-Contrast Monochrome' }
                ].map(option => (
                  <button key={option.id} onClick={() => setSilhouetteStyleVariant?.(option.id as any)} className={`py-1.5 px-2 text-[9px] font-bold rounded flex items-center justify-start gap-1.5 border uppercase tracking-wider transition-all ${silhouetteStyleVariant === option.id ? 'bg-amber-600 text-white border-amber-500' : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:bg-[#1e293b]'}`}>
                    <span className="w-1 h-1 rounded-full bg-current" />
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ORIGAMI */}
        {generationMode === 'origami' && (
          <div className="space-y-3">
            <div>
              <label className="flex items-center gap-1.5 text-[9px] font-bold text-rose-400/80 uppercase tracking-widest mb-1.5">
                <Sparkles className="w-2.5 h-2.5" /> Paper Material
              </label>
              <div className="grid grid-cols-1 gap-1">
                {[
                  { id: 'crisp-paper-fold', label: 'Crisp Studio Paper Folds' },
                  { id: 'washi-patterned', label: 'Traditional Washi Patterns' },
                  { id: 'metallic-foil', label: 'Gilded Metallic Foil' }
                ].map(option => (
                  <button key={option.id} onClick={() => setOrigamiStyleVariant?.(option.id as any)} className={`py-1.5 px-2 text-[9px] font-bold rounded flex items-center justify-start gap-1.5 border uppercase tracking-wider transition-all ${origamiStyleVariant === option.id ? 'bg-rose-600 text-white border-rose-500' : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:bg-[#1e293b]'}`}>
                    <span className="w-1 h-1 rounded-full bg-current" />
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CLAYMATION */}
        {generationMode === 'claymation' && (
          <div className="space-y-3">
            <div>
              <label className="flex items-center gap-1.5 text-[9px] font-bold text-orange-400/80 uppercase tracking-widest mb-1.5">
                <Sparkles className="w-2.5 h-2.5" /> Modeling Clay Style
              </label>
              <div className="grid grid-cols-1 gap-1">
                {[
                  { id: 'tactile-stopmotion', label: 'Tactile Clay Stop-Motion' },
                  { id: 'glossy-plasticine', label: 'Vibrant Glossy Plasticine' },
                  { id: 'vintage-ardman', label: 'Nostalgic Studio Clay' }
                ].map(option => (
                  <button key={option.id} onClick={() => setClaymationStyleVariant?.(option.id as any)} className={`py-1.5 px-2 text-[9px] font-bold rounded flex items-center justify-start gap-1.5 border uppercase tracking-wider transition-all ${claymationStyleVariant === option.id ? 'bg-orange-600 text-white border-orange-500' : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:bg-[#1e293b]'}`}>
                    <span className="w-1 h-1 rounded-full bg-current" />
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* NEON */}
        {generationMode === 'neon' && (
          <div className="space-y-3">
            <div>
              <label className="flex items-center gap-1.5 text-[9px] font-bold text-fuchsia-400/80 uppercase tracking-widest mb-1.5">
                <Sparkles className="w-2.5 h-2.5" /> Neon Wireframe Aesthetic
              </label>
              <div className="grid grid-cols-1 gap-1">
                {[
                  { id: 'cyber-grid-3d', label: 'Cybernetic 3D Wireframe' },
                  { id: 'vaporwave-retro', label: 'Vaporwave Synth Horizon' },
                  { id: 'holographic-blueprint', label: 'Holographic Vector Schema' }
                ].map(option => (
                  <button key={option.id} onClick={() => setNeonStyleVariant?.(option.id as any)} className={`py-1.5 px-2 text-[9px] font-bold rounded flex items-center justify-start gap-1.5 border uppercase tracking-wider transition-all ${neonStyleVariant === option.id ? 'bg-fuchsia-600 text-white border-fuchsia-500' : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:bg-[#1e293b]'}`}>
                    <span className="w-1 h-1 rounded-full bg-current" />
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 1. PHOTOGRAPHIC */}
        {generationMode === 'photo' && (
          <div className="space-y-3">
            <div>
              <label className="flex items-center gap-1.5 text-[9px] font-bold text-cyan-400/80 uppercase tracking-widest mb-1.5">
                <Camera className="w-2.5 h-2.5" /> Lens & Shot Style
              </label>
              <div className="grid grid-cols-1 gap-1">
                {[
                  { id: 'studio-portrait', label: 'Studio Portrait' },
                  { id: 'action-shot', label: 'Action/Motion Shot' },
                  { id: 'editorial-macro', label: 'Macro/Detail Close-up' }
                ].map(option => (
                  <button key={option.id} onClick={() => setPhotoStyleVariant(option.id as any)} className={`py-1.5 px-2 text-[9px] font-bold rounded flex items-center justify-start gap-1.5 border uppercase tracking-wider transition-all ${photoStyleVariant === option.id ? 'bg-cyan-600 text-white border-cyan-500' : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:bg-[#1e293b]'}`}>
                    <span className="w-1 h-1 rounded-full bg-current" />
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-[9px] font-bold text-cyan-400/80 uppercase tracking-widest mb-1.5">
                <Type className="w-2.5 h-2.5" /> Text Density
              </label>
              <div className="grid grid-cols-2 gap-1">
                {['none', 'integrated'].map(amount => (
                  <button key={amount} onClick={() => setPhotoTextAmount(amount as any)} className={`py-1 px-1 text-[9px] font-bold rounded flex items-center justify-center border uppercase tracking-wider transition-all ${photoTextAmount === amount ? 'bg-cyan-600 text-white border-cyan-500' : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:bg-[#1e293b]'}`}>{amount}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. ESL ILLUSTRATION */}
        {generationMode === 'esl' && (
          <div className="space-y-3">
            <div>
              <label className="flex items-center gap-1.5 text-[9px] font-bold text-fuchsia-400/80 uppercase tracking-widest mb-1.5">
                <PenTool className="w-2.5 h-2.5" /> Illustration Style
              </label>
              <div className="grid grid-cols-1 gap-1">
                {[
                  { id: 'vibrant-flat', label: 'Vibrant Flat Vector' },
                  { id: 'retro-crayon', label: 'Hand-drawn Crayon' },
                  { id: 'modern-isometric', label: 'Modern 3D Isometric' }
                ].map(option => (
                  <button key={option.id} onClick={() => setEslIllustrationStyle(option.id as any)} className={`py-1.5 px-2 text-[9px] font-bold rounded flex items-center justify-start gap-1.5 border uppercase tracking-wider transition-all ${eslIllustrationStyle === option.id ? 'bg-fuchsia-600 text-white border-fuchsia-500' : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:bg-[#1e293b]'}`}>
                    <span className="w-1 h-1 rounded-full bg-current" />
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-[9px] font-bold text-fuchsia-400/80 uppercase tracking-widest mb-1.5">
                <Type className="w-2.5 h-2.5" /> Text Density
              </label>
              <div className="grid grid-cols-3 gap-1">
                {['none', 'little', 'full'].map(amount => (
                  <button key={amount} onClick={() => setEslTextAmount(amount as any)} className={`py-1 px-1 text-[9px] font-bold rounded flex items-center justify-center border uppercase tracking-wider transition-all ${eslTextAmount === amount ? 'bg-fuchsia-600 text-white border-fuchsia-500' : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:bg-[#1e293b]'}`}>{amount}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 3. DICTIONARY PAGE */}
        {generationMode === 'doc' && (
          <div className="space-y-3">
            <div>
              <label className="flex items-center gap-1.5 text-[9px] font-bold text-amber-400/80 uppercase tracking-widest mb-1.5">
                <BookOpen className="w-2.5 h-2.5" /> Manuscript Style
              </label>
              <div className="grid grid-cols-1 gap-1">
                {[
                  { id: 'vintage-dictionary', label: 'Vintage Encyclopedia' },
                  { id: 'clean-handwritten', label: 'Modern Clean Hand' },
                  { id: 'illuminated-manuscript', label: 'Illuminated Manuscript' }
                ].map(option => (
                  <button key={option.id} onClick={() => setDocPageStyle(option.id as any)} className={`py-1.5 px-2 text-[9px] font-bold rounded flex items-center justify-start gap-1.5 border uppercase tracking-wider transition-all ${docPageStyle === option.id ? 'bg-amber-600 text-white border-amber-500' : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:bg-[#1e293b]'}`}>
                    <span className="w-1 h-1 rounded-full bg-current" />
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-[9px] font-bold text-amber-400/80 uppercase tracking-widest mb-1.5">
                <Type className="w-2.5 h-2.5" /> Definition Length
              </label>
              <div className="grid grid-cols-2 gap-1">
                {['short', 'full'].map(amount => (
                  <button key={amount} onClick={() => setDocTextAmount(amount as any)} className={`py-1 px-1 text-[9px] font-bold rounded flex items-center justify-center border uppercase tracking-wider transition-all ${docTextAmount === amount ? 'bg-amber-600 text-white border-amber-500' : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:bg-[#1e293b]'}`}>{amount}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 4. EMBROIDERY */}
        {generationMode === 'embroidery' && (
          <div className="space-y-3">
            <div>
              <label className="flex items-center gap-1.5 text-[9px] font-bold text-rose-400/80 uppercase tracking-widest mb-1.5">
                <Sparkles className="w-2.5 h-2.5" /> Stitch Density
              </label>
              <div className="grid grid-cols-1 gap-1">
                {[
                  { id: 'thick-yarn', label: 'Thick Wool Yarn' },
                  { id: 'dense-cross-stitch', label: 'Dense Cross-Stitch' },
                  { id: 'delicate-satin', label: 'Delicate Satin Thread' }
                ].map(option => (
                  <button key={option.id} onClick={() => setEmbroideryStitch(option.id as any)} className={`py-1.5 px-2 text-[9px] font-bold rounded flex items-center justify-start gap-1.5 border uppercase tracking-wider transition-all ${embroideryStitch === option.id ? 'bg-rose-600 text-white border-rose-500' : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:bg-[#1e293b]'}`}>
                    <span className="w-1 h-1 rounded-full bg-current" />
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-[9px] font-bold text-rose-400/80 uppercase tracking-widest mb-1.5">
                <Type className="w-2.5 h-2.5" /> Stitched Text
              </label>
              <div className="grid grid-cols-2 gap-1">
                {['none', 'stitched'].map(amount => (
                  <button key={amount} onClick={() => setEmbroideryTextAmount(amount as any)} className={`py-1 px-1 text-[9px] font-bold rounded flex items-center justify-center border uppercase tracking-wider transition-all ${embroideryTextAmount === amount ? 'bg-rose-600 text-white border-rose-500' : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:bg-[#1e293b]'}`}>{amount}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 5. COMIC */}
        {generationMode === 'comic' && (
          <div className="space-y-3">
            <div>
              <label className="flex items-center gap-1.5 text-[9px] font-bold text-red-400/80 uppercase tracking-widest mb-1.5">
                <LayoutTemplate className="w-2.5 h-2.5" /> Ink & Print Style
              </label>
              <div className="grid grid-cols-1 gap-1">
                {[
                  { id: 'retro-halftone', label: 'Retro Halftone Dots' },
                  { id: 'manga-ink', label: 'Screentone Manga Ink' },
                  { id: 'modern-indie', label: 'Modern Indie Webcomic' }
                ].map(option => (
                  <button key={option.id} onClick={() => setComicStyleVariant(option.id as any)} className={`py-1.5 px-2 text-[9px] font-bold rounded flex items-center justify-start gap-1.5 border uppercase tracking-wider transition-all ${comicStyleVariant === option.id ? 'bg-red-600 text-white border-red-500' : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:bg-[#1e293b]'}`}>
                    <span className="w-1 h-1 rounded-full bg-current" />
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-[9px] font-bold text-red-400/80 uppercase tracking-widest mb-1.5">
                <Type className="w-2.5 h-2.5" /> Dialogue Density
              </label>
              <div className="grid grid-cols-3 gap-1">
                {['none', 'short', 'dialogue'].map(amount => (
                  <button key={amount} onClick={() => setComicTextAmount(amount as any)} className={`py-1 px-1 text-[9px] font-bold rounded flex items-center justify-center border uppercase tracking-wider transition-all ${comicTextAmount === amount ? 'bg-red-600 text-white border-red-500' : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:bg-[#1e293b]'}`}>{amount}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 6. COLLAGE */}
        {generationMode === 'collage' && (
          <div className="space-y-3">
            <div>
              <label className="flex items-center gap-1.5 text-[9px] font-bold text-orange-400/80 uppercase tracking-widest mb-1.5">
                <Scissors className="w-2.5 h-2.5" /> Cut & Media Medium
              </label>
              <div className="grid grid-cols-1 gap-1">
                {[
                  { id: 'analog-torn', label: 'Torn Magazine Scraps' },
                  { id: 'retro-catalogue', label: 'Vintage Newsprint' },
                  { id: 'minimalist-kraft', label: 'Kraft Paper Cardboard' }
                ].map(option => (
                  <button key={option.id} onClick={() => setCollageStyleVariant(option.id as any)} className={`py-1.5 px-2 text-[9px] font-bold rounded flex items-center justify-start gap-1.5 border uppercase tracking-wider transition-all ${collageStyleVariant === option.id ? 'bg-orange-600 text-white border-orange-500' : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:bg-[#1e293b]'}`}>
                    <span className="w-1 h-1 rounded-full bg-current" />
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-[9px] font-bold text-orange-400/80 uppercase tracking-widest mb-1.5">
                <Type className="w-2.5 h-2.5" /> Text Treatment
              </label>
              <div className="grid grid-cols-2 gap-1">
                {['none', 'ransom'].map(amount => (
                  <button key={amount} onClick={() => setCollageTextAmount(amount as any)} className={`py-1 px-1 text-[9px] font-bold rounded flex items-center justify-center border uppercase tracking-wider transition-all ${collageTextAmount === amount ? 'bg-orange-600 text-white border-orange-500' : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:bg-[#1e293b]'}`}>{amount}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 7. SPLIT */}
        {generationMode === 'split' && (
          <div className="space-y-3">
            <div>
              <label className="flex items-center gap-1.5 text-[9px] font-bold text-blue-400/80 uppercase tracking-widest mb-1.5">
                <Columns className="w-2.5 h-2.5" /> Layout Orientation
              </label>
              <div className="grid grid-cols-1 gap-1">
                {[
                  { id: 'horizontal-diptych', label: 'Horizontal Split' },
                  { id: 'diagonal-slice', label: 'Dynamic Diagonal Slice' },
                  { id: 'clean-side-by-side', label: 'Clean Side-by-Side' }
                ].map(option => (
                  <button key={option.id} onClick={() => setSplitLayoutType(option.id as any)} className={`py-1.5 px-2 text-[9px] font-bold rounded flex items-center justify-start gap-1.5 border uppercase tracking-wider transition-all ${splitLayoutType === option.id ? 'bg-blue-600 text-white border-blue-500' : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:bg-[#1e293b]'}`}>
                    <span className="w-1 h-1 rounded-full bg-current" />
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-[9px] font-bold text-blue-400/80 uppercase tracking-widest mb-1.5">
                <Type className="w-2.5 h-2.5" /> Comparison Labels
              </label>
              <div className="grid grid-cols-2 gap-1">
                {['none', 'labels'].map(amount => (
                  <button key={amount} onClick={() => setSplitTextAmount(amount as any)} className={`py-1 px-1 text-[9px] font-bold rounded flex items-center justify-center border uppercase tracking-wider transition-all ${splitTextAmount === amount ? 'bg-blue-600 text-white border-blue-500' : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:bg-[#1e293b]'}`}>{amount}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 8. INFOGRAPHIC */}
        {generationMode === 'infographic' && (
          <div className="space-y-3">
            <div>
              <label className="flex items-center gap-1.5 text-[9px] font-bold text-indigo-400/80 uppercase tracking-widest mb-1.5">
                <Network className="w-2.5 h-2.5" /> Vector Style
              </label>
              <div className="grid grid-cols-1 gap-1">
                {[
                  { id: 'minimalist-swiss', label: 'Clean Swiss Grid' },
                  { id: 'hand-drawn-schematic', label: 'Technical Hand Schematic' },
                  { id: 'vibrant-isometric', label: 'Vibrant Isometric Flow' }
                ].map(option => (
                  <button key={option.id} onClick={() => setInfographicStyle(option.id as any)} className={`py-1.5 px-2 text-[9px] font-bold rounded flex items-center justify-start gap-1.5 border uppercase tracking-wider transition-all ${infographicStyle === option.id ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:bg-[#1e293b]'}`}>
                    <span className="w-1 h-1 rounded-full bg-current" />
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-[9px] font-bold text-indigo-400/80 uppercase tracking-widest mb-1.5">
                <Type className="w-2.5 h-2.5" /> Text Complexity
              </label>
              <div className="grid grid-cols-2 gap-1">
                {['short', 'elaborate'].map(amount => (
                  <button key={amount} onClick={() => setInfographicTextAmount(amount as any)} className={`py-1 px-1 text-[9px] font-bold rounded flex items-center justify-center border uppercase tracking-wider transition-all ${infographicTextAmount === amount ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:bg-[#1e293b]'}`}>{amount}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 9. FLASHCARD */}
        {generationMode === 'flashcard' && (
          <div className="space-y-3">
            <div>
              <label className="flex items-center gap-1.5 text-[9px] font-bold text-yellow-500/80 uppercase tracking-widest mb-1.5">
                <CreditCard className="w-2.5 h-2.5" /> Subject Dimension
              </label>
              <div className="grid grid-cols-1 gap-1">
                {[
                  { id: 'bold-minimalist', label: 'Flat Vector Graphic' },
                  { id: '3d-claymorphic', label: 'Tactile 3D Clay' },
                  { id: 'vintage-flashcard', label: 'Aged Cardboard Print' }
                ].map(option => (
                  <button key={option.id} onClick={() => setFlashcardStyle(option.id as any)} className={`py-1.5 px-2 text-[9px] font-bold rounded flex items-center justify-start gap-1.5 border uppercase tracking-wider transition-all ${flashcardStyle === option.id || (option.id === '3d-claymorphic' && flashcardStyle === '3-claymorphic') || (option.id === 'bold-minimalist' && flashcardStyle === 'bold-minimal') ? 'bg-yellow-600 text-white border-yellow-500' : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:bg-[#1e293b]'}`}>
                    <span className="w-1 h-1 rounded-full bg-current" />
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-[9px] font-bold text-yellow-500/80 uppercase tracking-widest mb-1.5">
                <Type className="w-2.5 h-2.5" /> Card Text Content
              </label>
              <div className="grid grid-cols-3 gap-1">
                {['none', 'short', 'free'].map(amount => (
                  <button key={amount} onClick={() => setFlashcardTextAmount(amount as any)} className={`py-1 px-1 text-[9px] font-bold rounded flex items-center justify-center border uppercase tracking-wider transition-all ${flashcardTextAmount === amount ? 'bg-yellow-600 text-white border-yellow-500' : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:bg-[#1e293b]'}`}>{amount}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 10. ICON */}
        {generationMode === 'icon' && (
          <div className="space-y-3">
            <div>
              <label className="flex items-center gap-1.5 text-[9px] font-bold text-slate-350 uppercase tracking-widest mb-1.5">
                <Hexagon className="w-2.5 h-2.5" /> Icon Rendering
              </label>
              <div className="grid grid-cols-1 gap-1">
                {[
                  { id: 'skeuomorphic-glass', label: 'Skeuomorphic Glass' },
                  { id: 'vibrant-isometric', label: '3D Isometric Block' },
                  { id: 'glowing-flat', label: 'Luminescent Flat Symbol' }
                ].map(option => (
                  <button key={option.id} onClick={() => setIconStyle(option.id as any)} className={`py-1.5 px-2 text-[9px] font-bold rounded flex items-center justify-start gap-1.5 border uppercase tracking-wider transition-all ${iconStyle === option.id ? 'bg-slate-600 text-white border-slate-500' : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:bg-[#1e293b]'}`}>
                    <span className="w-1 h-1 rounded-full bg-current" />
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-[9px] font-bold text-slate-350 uppercase tracking-widest mb-1.5">
                <Type className="w-2.5 h-2.5" /> Include Label Text
              </label>
              <div className="grid grid-cols-2 gap-1">
                {['off', 'on'].map(amount => (
                  <button key={amount} onClick={() => setIconTextAmount(amount as any)} className={`py-1 px-1 text-[9px] font-bold rounded flex items-center justify-center border uppercase tracking-wider transition-all ${iconTextAmount === amount ? 'bg-slate-600 text-white border-slate-500' : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:bg-[#1e293b]'}`}>{amount}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 11. MNEMONIC */}
        {generationMode === 'mnemonic' && (
          <div className="space-y-3">
            <div>
              <label className="flex items-center gap-1.5 text-[9px] font-bold text-purple-400/80 uppercase tracking-widest mb-1.5">
                <Brain className="w-2.5 h-2.5" /> Mnemonic Dreamscape
              </label>
              <div className="grid grid-cols-1 gap-1">
                {[
                  { id: 'dali-surrealist', label: 'Dali Surrealism' },
                  { id: 'playful-cartoon', label: 'Playful Retro Cartoon' },
                  { id: 'neo-noir-dreamscape', label: 'Cyberpunk Dreamscape' }
                ].map(option => (
                  <button key={option.id} onClick={() => setMnemonicStyle(option.id as any)} className={`py-1.5 px-2 text-[9px] font-bold rounded flex items-center justify-start gap-1.5 border uppercase tracking-wider transition-all ${mnemonicStyle === option.id ? 'bg-purple-600 text-white border-purple-500' : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:bg-[#1e293b]'}`}>
                    <span className="w-1 h-1 rounded-full bg-current" />
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-[9px] font-bold text-purple-400/80 uppercase tracking-widest mb-1.5">
                <Type className="w-2.5 h-2.5" /> Word Incorporation
              </label>
              <div className="grid grid-cols-2 gap-1">
                {['none', 'integrated'].map(amount => (
                  <button key={amount} onClick={() => setMnemonicTextAmount(amount as any)} className={`py-1 px-1 text-[9px] font-bold rounded flex items-center justify-center border uppercase tracking-wider transition-all ${mnemonicTextAmount === amount ? 'bg-purple-600 text-white border-purple-500' : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:bg-[#1e293b]'}`}>{amount}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 12. STORYBOOK */}
        {generationMode === 'storybook' && (
          <div className="space-y-3">
            <div>
              <label className="flex items-center gap-1.5 text-[9px] font-bold text-amber-400/80 uppercase tracking-widest mb-1.5">
                <Palette className="w-2.5 h-2.5" /> Narrative Medium
              </label>
              <div className="grid grid-cols-1 gap-1">
                {[
                  { id: 'vintage-watercolor', label: 'Vintage Watercolor' },
                  { id: 'classic-gilded-age', label: 'Etched Gilded Age' },
                  { id: 'nordic-folk-art', label: 'Nordic Folk Pattern' }
                ].map(option => (
                  <button key={option.id} onClick={() => setStorybookStyle(option.id as any)} className={`py-1.5 px-2 text-[9px] font-bold rounded flex items-center justify-start gap-1.5 border uppercase tracking-wider transition-all ${storybookStyle === option.id ? 'bg-amber-600 text-white border-amber-500' : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:bg-[#1e293b]'}`}>
                    <span className="w-1 h-1 rounded-full bg-current" />
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-[9px] font-bold text-amber-400/80 uppercase tracking-widest mb-1.5">
                <Type className="w-2.5 h-2.5" /> Page Layout
              </label>
              <div className="grid grid-cols-2 gap-1">
                {['none', 'page-text'].map(amount => (
                  <button key={amount} onClick={() => setStorybookTextAmount(amount as any)} className={`py-1 px-1 text-[9px] font-bold rounded flex items-center justify-center border uppercase tracking-wider transition-all ${storybookTextAmount === amount ? 'bg-amber-600 text-white border-amber-500' : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:bg-[#1e293b]'}`}>{amount}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 13. CINEMATIC */}
        {generationMode === 'cinematic' && (
          <div className="space-y-3">
            <div>
              <label className="flex items-center gap-1.5 text-[9px] font-bold text-indigo-400/80 uppercase tracking-widest mb-1.5">
                <Clapperboard className="w-2.5 h-2.5" /> Light & Shadows
              </label>
              <div className="grid grid-cols-1 gap-1">
                {[
                  { id: 'neon-noir', label: 'Cyberpunk Neon Noir' },
                  { id: 'golden-hour', label: 'Nostalgic Golden Hour' },
                  { id: 'moody-low-key', label: 'Moody Film Noir' }
                ].map(option => (
                  <button key={option.id} onClick={() => setCinematicLightingStyle(option.id as any)} className={`py-1.5 px-2 text-[9px] font-bold rounded flex items-center justify-start gap-1.5 border uppercase tracking-wider transition-all ${cinematicLightingStyle === option.id ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:bg-[#1e293b]'}`}>
                    <span className="w-1 h-1 rounded-full bg-current" />
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-[9px] font-bold text-indigo-400/80 uppercase tracking-widest mb-1.5">
                <Type className="w-2.5 h-2.5" /> Typography Layout
              </label>
              <div className="grid grid-cols-3 gap-1">
                {['none', 'title', 'poster'].map(amount => (
                  <button key={amount} onClick={() => setCinematicTextAmount(amount as any)} className={`py-1 px-1 text-[9px] font-bold rounded flex items-center justify-center border uppercase tracking-wider transition-all ${cinematicTextAmount === amount ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:bg-[#1e293b]'}`}>{amount}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 14. PAPERCRAFT */}
        {generationMode === 'papercraft' && (
          <div className="space-y-3">
            <div>
              <label className="flex items-center gap-1.5 text-[9px] font-bold text-orange-400/80 uppercase tracking-widest mb-1.5">
                <Layers className="w-2.5 h-2.5" /> Layer & Materials
              </label>
              <div className="grid grid-cols-1 gap-1">
                {[
                  { id: 'layered-origami', label: 'Layered Origami' },
                  { id: 'deep-shadowbox', label: 'Deep Glass Shadowbox' },
                  { id: 'flat-felt', label: 'Soft Stitched Felt' }
                ].map(option => (
                  <button key={option.id} onClick={() => setPapercraftDepth(option.id as any)} className={`py-1.5 px-2 text-[9px] font-bold rounded flex items-center justify-start gap-1.5 border uppercase tracking-wider transition-all ${papercraftDepth === option.id ? 'bg-orange-600 text-white border-orange-500' : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:bg-[#1e293b]'}`}>
                    <span className="w-1 h-1 rounded-full bg-current" />
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-[9px] font-bold text-orange-400/80 uppercase tracking-widest mb-1.5">
                <Type className="w-2.5 h-2.5" /> Cutout Labels
              </label>
              <div className="grid grid-cols-2 gap-1">
                {['none', 'labels'].map(amount => (
                  <button key={amount} onClick={() => setPapercraftTextAmount(amount as any)} className={`py-1 px-1 text-[9px] font-bold rounded flex items-center justify-center border uppercase tracking-wider transition-all ${papercraftTextAmount === amount ? 'bg-orange-600 text-white border-orange-500' : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:bg-[#1e293b]'}`}>{amount}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 15. PIXEL ART */}
        {generationMode === 'pixelart' && (
          <div className="space-y-3">
            <div>
              <label className="flex items-center gap-1.5 text-[9px] font-bold text-emerald-400/80 uppercase tracking-widest mb-1.5">
                <Gamepad2 className="w-2.5 h-2.5" /> Console & Palette
              </label>
              <div className="grid grid-cols-1 gap-1">
                {[
                  { id: 'retro-8bit', label: '8-Bit Retro NES' },
                  { id: 'gorgeous-16bit', label: 'Gorgeous 16-Bit SNES' },
                  { id: 'cyberpunk-isometric', label: 'Cyberpunk Isometric PC' }
                ].map(option => (
                  <button key={option.id} onClick={() => setPixelartStyle(option.id as any)} className={`py-1.5 px-2 text-[9px] font-bold rounded flex items-center justify-start gap-1.5 border uppercase tracking-wider transition-all ${pixelartStyle === option.id ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:bg-[#1e293b]'}`}>
                    <span className="w-1 h-1 rounded-full bg-current" />
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-[9px] font-bold text-emerald-400/80 uppercase tracking-widest mb-1.5">
                <Type className="w-2.5 h-2.5" /> Dialog Type
              </label>
              <div className="grid grid-cols-3 gap-1">
                {['none', 'dialog-box', 'floating'].map(amount => (
                  <button key={amount} onClick={() => setPixelartTextAmount(amount as any)} className={`py-1 px-1 text-[9px] font-bold rounded flex items-center justify-center border uppercase tracking-wider transition-all ${pixelartTextAmount === amount ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:bg-[#1e293b]'}`}>{amount}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 16. STITCHED GRAMMAR */}
        {generationMode === 'stitched' && (
          <div className="space-y-3">
            <div>
              <label className="flex items-center gap-1.5 text-[9px] font-bold text-amber-400/80 uppercase tracking-widest mb-1.5">
                <Layers className="w-2.5 h-2.5" /> Banner Material
              </label>
              <div className="grid grid-cols-1 gap-1">
                {[
                  { id: 'felt-board', label: 'Felt Notice Board' },
                  { id: 'quilted-tapestry', label: 'Quilted Tapestry Pattern' },
                  { id: 'homespun-canvas', label: 'Homespun Canvas Board' }
                ].map(option => (
                  <button key={option.id} onClick={() => setStitchedBannerStyle(option.id as any)} className={`py-1.5 px-2 text-[9px] font-bold rounded flex items-center justify-start gap-1.5 border uppercase tracking-wider transition-all ${stitchedBannerStyle === option.id ? 'bg-amber-600 text-white border-amber-500' : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:bg-[#1e293b]'}`}>
                    <span className="w-1 h-1 rounded-full bg-current" />
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-[9px] font-bold text-amber-400/80 uppercase tracking-widest mb-1.5">
                <Type className="w-2.5 h-2.5" /> Stitched Annotations
              </label>
              <div className="grid grid-cols-3 gap-1">
                {['none', 'titles', 'full'].map(amount => (
                  <button key={amount} onClick={() => setStitchedTextAmount(amount as any)} className={`py-1 px-1 text-[9px] font-bold rounded flex items-center justify-center border uppercase tracking-wider transition-all ${stitchedTextAmount === amount ? 'bg-amber-600 text-white border-amber-500' : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:bg-[#1e293b]'}`}>{amount}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 17. VAN GOGH */}
        {generationMode === 'vangogh' && (
          <div className="space-y-3">
            <div>
              <label className="flex items-center gap-1.5 text-[9px] font-bold text-yellow-400/80 uppercase tracking-widest mb-1.5">
                <PenTool className="w-2.5 h-2.5" /> Stroke Style
              </label>
              <div className="grid grid-cols-3 gap-1">
                {[
                  { id: 'impasto', label: 'Impasto' },
                  { id: 'classic', label: 'Classic' },
                  { id: 'swirling', label: 'Swirls' }
                ].map(option => (
                  <button key={option.id} onClick={() => setVanGoghStroke(option.id as any)} className={`py-1 px-1 text-[9.5px] font-bold rounded flex items-center justify-center border uppercase tracking-wider transition-all ${vanGoghStroke === option.id ? 'bg-yellow-600 text-white border-yellow-500' : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:bg-[#1e293b]'}`}>{option.label}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-[9px] font-bold text-yellow-400/80 uppercase tracking-widest mb-1.5">
                <Palette className="w-2.5 h-2.5" /> Color Palette Mode
              </label>
              <div className="grid grid-cols-2 gap-1">
                {[
                  { id: 'starry', label: 'Starry Night' },
                  { id: 'sunflowers', label: 'Sunflowers' },
                  { id: 'turbulent', label: 'Heavy Storm' },
                  { id: 'provence', label: 'Café Corner' }
                ].map(option => (
                  <button key={option.id} onClick={() => setVanGoghPalette(option.id as any)} className={`py-1 px-1 text-[9.5px] font-bold rounded flex items-center justify-center border uppercase tracking-wider transition-all ${vanGoghPalette === option.id ? 'bg-yellow-600 text-white border-yellow-500' : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:bg-[#1e293b]'}`}>{option.label}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-[9px] font-bold text-yellow-400/80 uppercase tracking-widest mb-1.5">
                <Type className="w-2.5 h-2.5" /> Text Signature
              </label>
              <div className="grid grid-cols-3 gap-1">
                {[
                  { id: 'none', label: 'None' },
                  { id: 'signature', label: 'Vincent' },
                  { id: 'caption', label: 'Caption' }
                ].map(option => (
                  <button key={option.id} onClick={() => setVangoghTextAmount(option.id as any)} className={`py-1 px-1 text-[9px] font-bold rounded flex items-center justify-center border uppercase tracking-wider transition-all ${vangoghTextAmount === option.id ? 'bg-yellow-600 text-white border-yellow-500' : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:bg-[#1e293b]'}`}>{option.label}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 18. REMBRANDT */}
        {generationMode === 'rembrandt' && (
          <div className="space-y-3">
            <div>
              <label className="flex items-center gap-1.5 text-[9px] font-bold text-orange-400/80 uppercase tracking-widest mb-1.5">
                <Sun className="w-2.5 h-2.5" /> Lighting Setup
              </label>
              <div className="grid grid-cols-3 gap-1">
                {[
                  { id: 'chiaroscuro', label: 'Chiaroscuro' },
                  { id: 'soft-glow', label: 'Soft Glow' },
                  { id: 'dramatic', label: 'Spotlight' }
                ].map(option => (
                  <button key={option.id} onClick={() => setRembrandtLighting(option.id as any)} className={`py-1 px-1 text-[9.5px] font-bold rounded flex items-center justify-center border uppercase tracking-wider transition-all ${rembrandtLighting === option.id ? 'bg-orange-600 text-white border-orange-500' : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:bg-[#1e293b]'}`}>{option.label}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-[9px] font-bold text-orange-400/80 uppercase tracking-widest mb-1.5">
                <Layers className="w-2.5 h-2.5" /> Canvas Texture
              </label>
              <div className="grid grid-cols-3 gap-1">
                {[
                  { id: 'rough-impasto', label: 'Impasto Highlights' },
                  { id: 'glazed', label: 'Smooth Glazes' },
                  { id: 'aged-canvas', label: 'Antique Canvas' }
                ].map(option => (
                  <button key={option.id} onClick={() => setRembrandtTexture(option.id as any)} className={`py-1 px-1 text-[9.5px] font-bold rounded flex items-center justify-center border uppercase tracking-wider transition-all ${rembrandtTexture === option.id ? 'bg-orange-600 text-white border-orange-500' : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:bg-[#1e293b]'}`}>{option.label}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-[9px] font-bold text-orange-400/80 uppercase tracking-widest mb-1.5">
                <Type className="w-2.5 h-2.5" /> Text Signature
              </label>
              <div className="grid grid-cols-3 gap-1">
                {[
                  { id: 'none', label: 'None' },
                  { id: 'gilded', label: 'Gilded Frame' },
                  { id: 'monogram', label: 'R Monogram' }
                ].map(option => (
                  <button key={option.id} onClick={() => setRembrandtTextAmount(option.id as any)} className={`py-1 px-1 text-[9px] font-bold rounded flex items-center justify-center border uppercase tracking-wider transition-all ${rembrandtTextAmount === option.id ? 'bg-orange-600 text-white border-orange-500' : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:bg-[#1e293b]'}`}>{option.label}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 19. CHALKBOARD */}
        {generationMode === 'chalkboard' && (
          <div className="space-y-3">
            <div>
              <label className="flex items-center gap-1.5 text-[9px] font-bold text-teal-400/80 uppercase tracking-widest mb-1.5">
                <GraduationCap className="w-2.5 h-2.5" /> Board Environment
              </label>
              <div className="grid grid-cols-1 gap-1">
                {[
                  { id: 'traditional-classroom', label: 'Traditional Slate Board' },
                  { id: 'mathematical-draft', label: 'Grid Drafting Board' },
                  { id: 'university-lecture', label: 'Vintage University Tier' }
                ].map(option => (
                  <button key={option.id} onClick={() => setChalkboardStyle(option.id as any)} className={`py-1.5 px-2 text-[9px] font-bold rounded flex items-center justify-start gap-1.5 border uppercase tracking-wider transition-all ${chalkboardStyle === option.id ? 'bg-teal-600 text-white border-teal-500' : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:bg-[#1e293b]'}`}>
                    <span className="w-1 h-1 rounded-full bg-current" />
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-[9px] font-bold text-teal-400/80 uppercase tracking-widest mb-1.5">
                <Palette className="w-2.5 h-2.5" /> Chalk Colors
              </label>
              <div className="grid grid-cols-3 gap-1">
                {[
                  { id: 'multicolor', label: 'Multicolor' },
                  { id: 'white-only', label: 'White Only' },
                  { id: 'vintage-neon', label: 'Vintage Neon' }
                ].map(option => (
                  <button key={option.id} onClick={() => setChalkboardPalette(option.id as any)} className={`py-1 px-1 text-[9px] font-bold rounded flex items-center justify-center border uppercase tracking-wider transition-all ${chalkboardPalette === option.id ? 'bg-teal-600 text-white border-teal-500' : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:bg-[#1e293b]'}`}>{option.label}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-[9px] font-bold text-teal-400/80 uppercase tracking-widest mb-1.5">
                <Type className="w-2.5 h-2.5" /> Diagram Details
              </label>
              <div className="grid grid-cols-3 gap-1">
                {[
                  { id: 'none', label: 'None' },
                  { id: 'titles-only', label: 'Titles' },
                  { id: 'full-diagram', label: 'Full Labels' }
                ].map(option => (
                  <button key={option.id} onClick={() => setChalkboardTextAmount(option.id as any)} className={`py-1 px-1 text-[9px] font-bold rounded flex items-center justify-center border uppercase tracking-wider transition-all ${chalkboardTextAmount === option.id ? 'bg-teal-600 text-white border-teal-500' : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:bg-[#1e293b]'}`}>{option.label}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 20. PHONETIC MOUTH GUIDE */}
        {generationMode === 'mouth_guide' && (
          <div className="space-y-3">
            <div>
              <label className="flex items-center gap-1.5 text-[9px] font-bold text-sky-400/80 uppercase tracking-widest mb-1.5">
                <MessageSquare className="w-2.5 h-2.5" /> Anatomical Style
              </label>
              <div className="grid grid-cols-1 gap-1">
                {[
                  { id: 'full-cross-section', label: 'Full Sagittal Section' },
                  { id: 'front-3d', label: 'Front 3D Vocal View' },
                  { id: 'simplified-schema', label: 'Simplified Cartoon Outline' }
                ].map(option => (
                  <button key={option.id} onClick={() => setMouthGuideStyle(option.id as any)} className={`py-1.5 px-2 text-[9px] font-bold rounded flex items-center justify-start gap-1.5 border uppercase tracking-wider transition-all ${mouthGuideStyle === option.id ? 'bg-sky-600 text-white border-sky-500' : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:bg-[#1e293b]'}`}>
                    <span className="w-1 h-1 rounded-full bg-current" />
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-[9px] font-bold text-sky-400/80 uppercase tracking-widest mb-1.5">
                <Palette className="w-2.5 h-2.5" /> Vocal Theme
              </label>
              <div className="grid grid-cols-1 gap-1">
                {[
                  { id: 'clinical-neon', label: 'Luminescent Clinical Vector' },
                  { id: 'vintage-medical', label: 'Vintage Medical Lithograph' },
                  { id: 'friendly-crayon', label: 'Friendly Chalkboard Draw' }
                ].map(option => (
                  <button key={option.id} onClick={() => setMouthGuideColorStyle(option.id as any)} className={`py-1.5 px-2 text-[9px] font-bold rounded flex items-center justify-start gap-1.5 border uppercase tracking-wider transition-all ${mouthGuideColorStyle === option.id ? 'bg-sky-600 text-white border-sky-500' : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:bg-[#1e293b]'}`}>
                    <span className="w-1 h-1 rounded-full bg-current" />
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-[9px] font-bold text-sky-400/80 uppercase tracking-widest mb-1.5">
                <Type className="w-2.5 h-2.5" /> Anatomical Labels
              </label>
              <div className="grid grid-cols-1 gap-1">
                {[
                  { id: 'none', label: 'No Labels' },
                  { id: 'phonetic-label', label: 'Sound Symbols Only' },
                  { id: 'full-anatomical', label: 'Sound Symbols & Anatomical' }
                ].map(option => (
                  <button key={option.id} onClick={() => setMouthGuideTextAmount(option.id as any)} className={`py-1.5 px-2 text-[9px] font-bold rounded flex items-center justify-start gap-1.5 border uppercase tracking-wider transition-all ${mouthGuideTextAmount === option.id ? 'bg-sky-600 text-white border-sky-500' : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:bg-[#1e293b]'}`}>
                    <span className="w-1 h-1 rounded-full bg-current" />
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 21. SYNONYM SCALE */}
        {generationMode === 'synonym_scale' && (
          <div className="space-y-3">
            <div>
              <label className="flex items-center gap-1.5 text-[9px] font-bold text-emerald-400/80 uppercase tracking-widest mb-1.5">
                <Sliders className="w-2.5 h-2.5" /> Design Style
              </label>
              <div className="grid grid-cols-1 gap-1">
                {[
                  { id: 'vibrant-gradient-cards', label: 'Vibrant Multi-color Cards' },
                  { id: 'playful-cartoon', label: 'Playful Block Scale' },
                  { id: 'minimalist-ruler', label: 'Engineered Calibrator Ruler' }
                ].map(option => (
                  <button key={option.id} onClick={() => setSynonymScaleStyle(option.id as any)} className={`py-1.5 px-2 text-[9px] font-bold rounded flex items-center justify-start gap-1.5 border uppercase tracking-wider transition-all ${synonymScaleStyle === option.id ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:bg-[#1e293b]'}`}>
                    <span className="w-1 h-1 rounded-full bg-current" />
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-[9px] font-bold text-emerald-400/80 uppercase tracking-widest mb-1.5">
                <Sliders className="w-2.5 h-2.5" /> Scale Steps
              </label>
              <div className="grid grid-cols-2 gap-1">
                {[
                  { id: '3-steps', label: '3 Synonyms' },
                  { id: '5-steps', label: '5-Step Spectrum' }
                ].map(option => (
                  <button key={option.id} onClick={() => setSynonymScaleSteps(option.id as any)} className={`py-1 px-1 text-[9px] font-bold rounded flex items-center justify-center border uppercase tracking-wider transition-all ${synonymScaleSteps === option.id ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:bg-[#1e293b]'}`}>{option.label}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-[9px] font-bold text-emerald-400/80 uppercase tracking-widest mb-1.5">
                <Type className="w-2.5 h-2.5" /> Scale Text Level
              </label>
              <div className="grid grid-cols-1 gap-1">
                {[
                  { id: 'none', label: 'No Text labels' },
                  { id: 'scale-levels', label: 'Scale Levels Only' },
                  { id: 'detailed-definitions', label: 'Detailed Definitions & Uses' }
                ].map(option => (
                  <button key={option.id} onClick={() => setSynonymScaleTextAmount(option.id as any)} className={`py-1.5 px-2 text-[9px] font-bold rounded flex items-center justify-start gap-1.5 border uppercase tracking-wider transition-all ${synonymScaleTextAmount === option.id ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:bg-[#1e293b]'}`}>
                    <span className="w-1 h-1 rounded-full bg-current" />
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 22. TECHNICAL CUTAWAY */}
        {generationMode === 'cutaway' && (
          <div className="space-y-3">
            <div>
              <label className="flex items-center gap-1.5 text-[9px] font-bold text-cyan-400/80 uppercase tracking-widest mb-1.5">
                <Compass className="w-2.5 h-2.5" /> Drafting Medium
              </label>
              <div className="grid grid-cols-1 gap-1">
                {[
                  { id: 'blueprint-blue', label: 'Industrial Cyanotype Blueprint' },
                  { id: 'sketchbook', label: 'Graphite Sketchbook Draft' },
                  { id: 'retro-patina', label: 'Aged Sepia Drafting' }
                ].map(option => (
                  <button key={option.id} onClick={() => setCutawayStyle(option.id as any)} className={`py-1.5 px-2 text-[9px] font-bold rounded flex items-center justify-start gap-1.5 border uppercase tracking-wider transition-all ${cutawayStyle === option.id ? 'bg-cyan-600 text-white border-cyan-500' : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:bg-[#1e293b]'}`}>
                    <span className="w-1 h-1 rounded-full bg-current" />
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-[9px] font-bold text-cyan-400/80 uppercase tracking-widest mb-1.5">
                <Compass className="w-2.5 h-2.5" /> Cutaway Subject
              </label>
              <div className="grid grid-cols-1 gap-1">
                {[
                  { id: 'mechanical-gears', label: 'Clockwork & Pistons' },
                  { id: 'natural-geology', label: 'Geological Fault & Crystals' },
                  { id: 'architectural', label: 'Structural Architecture' }
                ].map(option => (
                  <button key={option.id} onClick={() => setCutawaySubjectType(option.id as any)} className={`py-1.5 px-2 text-[9px] font-bold rounded flex items-center justify-start gap-1.5 border uppercase tracking-wider transition-all ${cutawaySubjectType === option.id ? 'bg-cyan-600 text-white border-cyan-500' : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:bg-[#1e293b]'}`}>
                    <span className="w-1 h-1 rounded-full bg-current" />
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-[9px] font-bold text-cyan-400/80 uppercase tracking-widest mb-1.5">
                <Type className="w-2.5 h-2.5" /> Specs & Labels
              </label>
              <div className="grid grid-cols-1 gap-1">
                {[
                  { id: 'none', label: 'No Labels' },
                  { id: 'technical-labels', label: 'Technical Pointer Labels' },
                  { id: 'detailed-specifications', label: 'Detailed Technical Specs' }
                ].map(option => (
                  <button key={option.id} onClick={() => setCutawayTextAmount(option.id as any)} className={`py-1.5 px-2 text-[9px] font-bold rounded flex items-center justify-start gap-1.5 border uppercase tracking-wider transition-all ${cutawayTextAmount === option.id ? 'bg-cyan-600 text-white border-cyan-500' : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:bg-[#1e293b]'}`}>
                    <span className="w-1 h-1 rounded-full bg-current" />
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 23. ACTION STORYBOARD */}
        {generationMode === 'action_sequence' && (
          <div className="space-y-3">
            <div>
              <label className="flex items-center gap-1.5 text-[9px] font-bold text-indigo-400/80 uppercase tracking-widest mb-1.5">
                <ListOrdered className="w-2.5 h-2.5" /> Storyboard Style
              </label>
              <div className="grid grid-cols-1 gap-1">
                {[
                  { id: 'vintage-comic', label: 'Retro Comic Ink' },
                  { id: 'modern-line-vector', label: 'Modern Minimal Vector' },
                  { id: 'soft-watercolor', label: 'Soft Storybook Watercolor' }
                ].map(option => (
                  <button key={option.id} onClick={() => setActionSequenceStyle(option.id as any)} className={`py-1.5 px-2 text-[9px] font-bold rounded flex items-center justify-start gap-1.5 border uppercase tracking-wider transition-all ${actionSequenceStyle === option.id ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:bg-[#1e293b]'}`}>
                    <span className="w-1 h-1 rounded-full bg-current" />
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-[9px] font-bold text-indigo-400/80 uppercase tracking-widest mb-1.5">
                <ListOrdered className="w-2.5 h-2.5" /> Frame Layout
              </label>
              <div className="grid grid-cols-2 gap-1">
                {[
                  { id: 'three-panels', label: '3-Panels' },
                  { id: 'four-panels', label: '2x2 Grid' }
                ].map(option => (
                  <button key={option.id} onClick={() => setActionSequenceLayout(option.id as any)} className={`py-1 px-1 text-[9px] font-bold rounded flex items-center justify-center border uppercase tracking-wider transition-all ${actionSequenceLayout === option.id ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:bg-[#1e293b]'}`}>{option.label}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-[9px] font-bold text-indigo-400/80 uppercase tracking-widest mb-1.5">
                <Type className="w-2.5 h-2.5" /> Story Narration
              </label>
              <div className="grid grid-cols-1 gap-1">
                {[
                  { id: 'none', label: 'No Text labels' },
                  { id: 'captions-only', label: 'Caption Titles Only' },
                  { id: 'full-narration', label: 'Detailed Step Narrations' }
                ].map(option => (
                  <button key={option.id} onClick={() => setActionSequenceTextAmount(option.id as any)} className={`py-1.5 px-2 text-[9px] font-bold rounded flex items-center justify-start gap-1.5 border uppercase tracking-wider transition-all ${actionSequenceTextAmount === option.id ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:bg-[#1e293b]'}`}>
                    <span className="w-1 h-1 rounded-full bg-current" />
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 24. ETYMOLOGY ROOT TREE */}
        {generationMode === 'etymology' && (
          <div className="space-y-3">
            <div>
              <label className="flex items-center gap-1.5 text-[9px] font-bold text-amber-400/80 uppercase tracking-widest mb-1.5">
                <GitBranch className="w-2.5 h-2.5" /> Botanical Tree Style
              </label>
              <div className="grid grid-cols-1 gap-1">
                {[
                  { id: 'ancient-scroll', label: 'Ancient Calligraphy Scroll' },
                  { id: 'vibrant-infographic', label: 'Modern Vector Plant' },
                  { id: 'botanical-sketch', label: 'Vintage Botanical Lithograph' }
                ].map(option => (
                  <button key={option.id} onClick={() => setEtymologyStyle(option.id as any)} className={`py-1.5 px-2 text-[9px] font-bold rounded flex items-center justify-start gap-1.5 border uppercase tracking-wider transition-all ${etymologyStyle === option.id ? 'bg-amber-600 text-white border-amber-500' : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:bg-[#1e293b]'}`}>
                    <span className="w-1 h-1 rounded-full bg-current" />
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-[9px] font-bold text-amber-400/80 uppercase tracking-widest mb-1.5">
                <GitBranch className="w-2.5 h-2.5" /> Branch Layout
              </label>
              <div className="grid grid-cols-1 gap-1">
                {[
                  { id: 'majestic-oak', label: 'Majestic Oak Tree' },
                  { id: 'stylized-vining', label: 'Vining Ivy Tendrils' },
                  { id: 'symmetrical-radial', label: 'Symmetrical Radial Diagram' }
                ].map(option => (
                  <button key={option.id} onClick={() => setEtymologyBranchLayout(option.id as any)} className={`py-1.5 px-2 text-[9px] font-bold rounded flex items-center justify-start gap-1.5 border uppercase tracking-wider transition-all ${etymologyBranchLayout === option.id ? 'bg-amber-600 text-white border-amber-500' : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:bg-[#1e293b]'}`}>
                    <span className="w-1 h-1 rounded-full bg-current" />
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-[9px] font-bold text-amber-400/80 uppercase tracking-widest mb-1.5">
                <Type className="w-2.5 h-2.5" /> Root Text Details
              </label>
              <div className="grid grid-cols-1 gap-1">
                {[
                  { id: 'none', label: 'No Text labels' },
                  { id: 'root-and-words', label: 'Roots & Derived Word Labels' },
                  { id: 'exhaustive-notes', label: 'Detailed Definition & Evolution Notes' }
                ].map(option => (
                  <button key={option.id} onClick={() => setEtymologyTextAmount(option.id as any)} className={`py-1.5 px-2 text-[9px] font-bold rounded flex items-center justify-start gap-1.5 border uppercase tracking-wider transition-all ${etymologyTextAmount === option.id ? 'bg-amber-600 text-white border-amber-500' : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:bg-[#1e293b]'}`}>
                    <span className="w-1 h-1 rounded-full bg-current" />
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 25. SPATIAL PREPOSITION MAP */}
        {generationMode === 'preposition' && (
          <div className="space-y-3">
            <div>
              <label className="flex items-center gap-1.5 text-[9px] font-bold text-sky-400/80 uppercase tracking-widest mb-1.5">
                <Compass className="w-2.5 h-2.5" /> Spatial Mapping Style
              </label>
              <div className="grid grid-cols-1 gap-1">
                {[
                  { id: 'architectural-3d', label: '3D Exploded Grid' },
                  { id: 'playful-isometric', label: 'Playful Isometric Town Map' },
                  { id: 'abstract-geometry', label: 'Abstract Spatial Geometry' }
                ].map(option => (
                  <button key={option.id} onClick={() => setPrepositionStyle(option.id as any)} className={`py-1.5 px-2 text-[9px] font-bold rounded flex items-center justify-start gap-1.5 border uppercase tracking-wider transition-all ${prepositionStyle === option.id ? 'bg-sky-600 text-white border-sky-500' : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:bg-[#1e293b]'}`}>
                    <span className="w-1 h-1 rounded-full bg-current" />
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-[9px] font-bold text-sky-400/80 uppercase tracking-widest mb-1.5">
                <Type className="w-2.5 h-2.5" /> Label Annotation Level
              </label>
              <div className="grid grid-cols-1 gap-1">
                {[
                  { id: 'none', label: 'No Text labels' },
                  { id: 'arrows-only', label: 'Directional Arrows & Prepositions' },
                  { id: 'full-sentences', label: 'Full Example Sentences' }
                ].map(option => (
                  <button key={option.id} onClick={() => setPrepositionTextAmount(option.id as any)} className={`py-1.5 px-2 text-[9px] font-bold rounded flex items-center justify-start gap-1.5 border uppercase tracking-wider transition-all ${prepositionTextAmount === option.id ? 'bg-sky-600 text-white border-sky-500' : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:bg-[#1e293b]'}`}>
                    <span className="w-1 h-1 rounded-full bg-current" />
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 26. WORD MORPHOLOGY BLOCKS */}
        {generationMode === 'morphology' && (
          <div className="space-y-3">
            <div>
              <label className="flex items-center gap-1.5 text-[9px] font-bold text-indigo-400/80 uppercase tracking-widest mb-1.5">
                <Layers className="w-2.5 h-2.5" /> Block Material Style
              </label>
              <div className="grid grid-cols-1 gap-1">
                {[
                  { id: 'wooden-blocks', label: 'Hand-carved Wooden Blocks' },
                  { id: 'glowing-modular', label: 'Glow Modular Lego Bricks' },
                  { id: 'letterpress-type', label: 'Antique Metal Type' }
                ].map(option => (
                  <button key={option.id} onClick={() => setMorphologyStyle(option.id as any)} className={`py-1.5 px-2 text-[9px] font-bold rounded flex items-center justify-start gap-1.5 border uppercase tracking-wider transition-all ${morphologyStyle === option.id ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:bg-[#1e293b]'}`}>
                    <span className="w-1 h-1 rounded-full bg-current" />
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-[9px] font-bold text-indigo-400/80 uppercase tracking-widest mb-1.5">
                <Type className="w-2.5 h-2.5" /> Morpheme Labels
              </label>
              <div className="grid grid-cols-1 gap-1">
                {[
                  { id: 'none', label: 'No Text labels' },
                  { id: 'morphemes-only', label: 'Prefix / Root / Suffix labels' },
                  { id: 'etymology-notes', label: 'Detailed Morphological Notes' }
                ].map(option => (
                  <button key={option.id} onClick={() => setMorphologyTextAmount(option.id as any)} className={`py-1.5 px-2 text-[9px] font-bold rounded flex items-center justify-start gap-1.5 border uppercase tracking-wider transition-all ${morphologyTextAmount === option.id ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:bg-[#1e293b]'}`}>
                    <span className="w-1 h-1 rounded-full bg-current" />
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 27. COLLOCATION BUBBLE WEB */}
        {generationMode === 'collocation' && (
          <div className="space-y-3">
            <div>
              <label className="flex items-center gap-1.5 text-[9px] font-bold text-emerald-400/80 uppercase tracking-widest mb-1.5">
                <Network className="w-2.5 h-2.5" /> Network Diagram Style
              </label>
              <div className="grid grid-cols-1 gap-1">
                {[
                  { id: 'mindmap-bubbles', label: 'Organic Mindmap Bubbles' },
                  { id: 'chalk-web', label: 'Chalk Constellation Web' },
                  { id: 'vector-nodes', label: 'Geometric Node Constellation' }
                ].map(option => (
                  <button key={option.id} onClick={() => setCollocationStyle(option.id as any)} className={`py-1.5 px-2 text-[9px] font-bold rounded flex items-center justify-start gap-1.5 border uppercase tracking-wider transition-all ${collocationStyle === option.id ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:bg-[#1e293b]'}`}>
                    <span className="w-1 h-1 rounded-full bg-current" />
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-[9px] font-bold text-emerald-400/80 uppercase tracking-widest mb-1.5">
                <Type className="w-2.5 h-2.5" /> Bubble Context Level
              </label>
              <div className="grid grid-cols-1 gap-1">
                {[
                  { id: 'none', label: 'No Text labels' },
                  { id: 'words-only', label: 'Collocation Word Pairs Only' },
                  { id: 'example-sentences', label: 'Contextual Example Sentences' }
                ].map(option => (
                  <button key={option.id} onClick={() => setCollocationTextAmount(option.id as any)} className={`py-1.5 px-2 text-[9px] font-bold rounded flex items-center justify-start gap-1.5 border uppercase tracking-wider transition-all ${collocationTextAmount === option.id ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:bg-[#1e293b]'}`}>
                    <span className="w-1 h-1 rounded-full bg-current" />
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Shared Canvas Background Engine (Natural, Solid Color, or Backgroundless PNG) for all modes */}
        <CustomColorPicker
          backgroundColor={backgroundColor}
          setBackgroundColor={setBackgroundColor}
          useCustomBackground={useCustomBackground}
          setUseCustomBackground={setUseCustomBackground}
          isBackgroundless={isBackgroundless || generationMode === 'no_background'}
          setIsBackgroundless={setIsBackgroundless}
          transparentCutoutStyle={transparentCutoutStyle}
          setTransparentCutoutStyle={setTransparentCutoutStyle}
          transparentTolerance={transparentTolerance}
          setTransparentTolerance={setTransparentTolerance}
        />
      </div>
    </div>
  );
};
