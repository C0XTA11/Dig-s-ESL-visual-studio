import React, { useState, useRef, useEffect } from 'react';
import { Camera, Image as ImageIcon, Sparkles, Sun, Wand2, Upload, Zap, Loader2, Download, AlertCircle, Settings2, Square, RectangleHorizontal, RectangleVertical, Copy, Check, BookOpen, PenTool, Type, CopyCheck, LayoutTemplate, Layers, MessageSquare, ChevronUp, ChevronDown, Scissors, Columns, Network, CreditCard, Hexagon, History, X, Brain, Package, Palette, Clapperboard, Gamepad2, GraduationCap, GitBranch, Sliders, Compass, ListOrdered, Eraser } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { eslModes, creativeModes, backgroundSupportedModes } from './components/ModesData';
import { ActiveEngineOptionsPanel } from './components/ActiveEngineOptionsPanel';
import { GoogleGenAI } from '@google/genai';
import JSZip from 'jszip';
import { get, set } from 'idb-keyval';
import { LightValveModal } from './components/LightValveModal';
import { PhotoLightModal } from './components/PhotoLightModal';
import { removeBackgroundFromDataUrl } from './utils/removeBackground';

interface HistoryEntry {
  id: string;
  prompt: string;
  images: string[];
  timestamp: number;
}

export default function App() {

  const [hoveredMode, setHoveredMode] = useState<{label: string, description: string} | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  
  useEffect(() => {
    get<HistoryEntry[]>('generation_history')
      .then(val => {
        if (val) setHistory(val);
      })
      .catch(err => console.error("Could not load history from idb", err));
  }, []);
  
  // Synchronously read saved settings on mount to prevent layout/UI flicker
  const savedSettings = (() => {
    try {
      const saved = localStorage.getItem('digs_studio_settings');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      console.error("Could not parse saved settings", e);
      return null;
    }
  })();

  const [generationMode, setGenerationMode] = useState<string>(() => savedSettings?.generationMode || 'doc');
  const [imageModel, setImageModel] = useState<'gemini-3.1-flash-image' | 'gemini-3.1-flash-lite-image'>(() => savedSettings?.imageModel || 'gemini-3.1-flash-image');
  const [backgroundColor, setBackgroundColor] = useState<string>(() => savedSettings?.backgroundColor || '#D2C9B8');
  const [useCustomBackground, setUseCustomBackground] = useState<boolean>(() => savedSettings?.useCustomBackground ?? false);
  const [visualTheme, setVisualTheme] = useState<string>(() => savedSettings?.visualTheme || '');
  const [showAdvancedModes, setShowAdvancedModes] = useState<boolean>(() => savedSettings?.showAdvancedModes ?? false);
  const [showEslCategory, setShowEslCategory] = useState<boolean>(() => savedSettings?.showEslCategory ?? true);
  const [showCreativeCategory, setShowCreativeCategory] = useState<boolean>(() => savedSettings?.showCreativeCategory ?? false);
  
  // Sub-options states: Text densities
  const [eslTextAmount, setEslTextAmount] = useState<'none' | 'little' | 'full'>(() => savedSettings?.eslTextAmount || 'none');
  const [photoTextAmount, setPhotoTextAmount] = useState<'none' | 'integrated'>(() => savedSettings?.photoTextAmount || 'none');
  const [docTextAmount, setDocTextAmount] = useState<'short' | 'full'>(() => savedSettings?.docTextAmount || 'short');
  const [infographicTextAmount, setInfographicTextAmount] = useState<'short' | 'elaborate'>(() => savedSettings?.infographicTextAmount || 'elaborate');
  const [flashcardTextAmount, setFlashcardTextAmount] = useState<'none' | 'short' | 'free'>(() => savedSettings?.flashcardTextAmount || 'short');
  const [iconTextAmount, setIconTextAmount] = useState<'off' | 'on'>(() => savedSettings?.iconTextAmount || 'off');
  const [comicTextAmount, setComicTextAmount] = useState<'none' | 'short' | 'dialogue'>(() => savedSettings?.comicTextAmount || 'short');
  const [collageTextAmount, setCollageTextAmount] = useState<'none' | 'ransom'>(() => savedSettings?.collageTextAmount || 'ransom');
  const [splitTextAmount, setSplitTextAmount] = useState<'none' | 'labels'>(() => savedSettings?.splitTextAmount || 'labels');
  const [mnemonicTextAmount, setMnemonicTextAmount] = useState<'none' | 'integrated'>(() => savedSettings?.mnemonicTextAmount || 'none');
  const [storybookTextAmount, setStorybookTextAmount] = useState<'none' | 'page-text'>(() => savedSettings?.storybookTextAmount || 'page-text');
  const [cinematicTextAmount, setCinematicTextAmount] = useState<'none' | 'title' | 'poster'>(() => savedSettings?.cinematicTextAmount || 'title');
  const [papercraftTextAmount, setPapercraftTextAmount] = useState<'none' | 'labels'>(() => savedSettings?.papercraftTextAmount || 'none');
  const [pixelartTextAmount, setPixelartTextAmount] = useState<'none' | 'dialog-box' | 'floating'>(() => savedSettings?.pixelartTextAmount || 'dialog-box');
  const [embroideryTextAmount, setEmbroideryTextAmount] = useState<'none' | 'stitched'>(() => savedSettings?.embroideryTextAmount || 'none');
  const [stitchedTextAmount, setStitchedTextAmount] = useState<'none' | 'titles' | 'full'>(() => savedSettings?.stitchedTextAmount || 'full');
  
  // Custom text amounts for remaining modes
  const [vangoghTextAmount, setVangoghTextAmount] = useState<'none' | 'signature' | 'caption'>(() => savedSettings?.vangoghTextAmount || 'none');
  const [rembrandtTextAmount, setRembrandtTextAmount] = useState<'none' | 'gilded' | 'monogram'>(() => savedSettings?.rembrandtTextAmount || 'none');
  const [chalkboardTextAmount, setChalkboardTextAmount] = useState<'none' | 'titles-only' | 'full-diagram'>(() => savedSettings?.chalkboardTextAmount || 'full-diagram');
  const [mouthGuideTextAmount, setMouthGuideTextAmount] = useState<'none' | 'phonetic-label' | 'full-anatomical'>(() => savedSettings?.mouthGuideTextAmount || 'full-anatomical');
  const [synonymScaleTextAmount, setSynonymScaleTextAmount] = useState<'none' | 'scale-levels' | 'detailed-definitions'>(() => savedSettings?.synonymScaleTextAmount || 'scale-levels');
  const [cutawayTextAmount, setCutawayTextAmount] = useState<'none' | 'technical-labels' | 'detailed-specifications'>(() => savedSettings?.cutawayTextAmount || 'technical-labels');
  const [actionSequenceTextAmount, setActionSequenceTextAmount] = useState<'none' | 'captions-only' | 'full-narration'>(() => savedSettings?.actionSequenceTextAmount || 'captions-only');
  const [etymologyTextAmount, setEtymologyTextAmount] = useState<'none' | 'root-and-words' | 'exhaustive-notes'>(() => savedSettings?.etymologyTextAmount || 'root-and-words');

  // Creative sub-option style variants
  const [macroStyleVariant, setMacroStyleVariant] = useState<'classic-dewdrop' | 'crystalline-fractal' | 'bioluminescent-organism'>(() => savedSettings?.macroStyleVariant || 'classic-dewdrop');
  const [silhouetteStyleVariant, setSilhouetteStyleVariant] = useState<'sunset-backlit' | 'cyberpunk-neon' | 'minimalist-monochrome'>(() => savedSettings?.silhouetteStyleVariant || 'sunset-backlit');
  const [origamiStyleVariant, setOrigamiStyleVariant] = useState<'crisp-paper-fold' | 'washi-patterned' | 'metallic-foil'>(() => savedSettings?.origamiStyleVariant || 'crisp-paper-fold');
  const [claymationStyleVariant, setClaymationStyleVariant] = useState<'tactile-stopmotion' | 'glossy-plasticine' | 'vintage-ardman'>(() => savedSettings?.claymationStyleVariant || 'tactile-stopmotion');
  const [neonStyleVariant, setNeonStyleVariant] = useState<'cyber-grid-3d' | 'vaporwave-retro' | 'holographic-blueprint'>(() => savedSettings?.neonStyleVariant || 'cyber-grid-3d');

  const [photoStyleVariant, setPhotoStyleVariant] = useState<'studio-portrait' | 'action-shot' | 'editorial-macro'>(() => savedSettings?.photoStyleVariant || 'studio-portrait');
  const [eslIllustrationStyle, setEslIllustrationStyle] = useState<'vibrant-flat' | 'retro-crayon' | 'modern-isometric'>(() => savedSettings?.eslIllustrationStyle || 'vibrant-flat');
  const [docPageStyle, setDocPageStyle] = useState<'vintage-dictionary' | 'clean-handwritten' | 'illuminated-manuscript'>(() => savedSettings?.docPageStyle || 'vintage-dictionary');
  const [comicStyleVariant, setComicStyleVariant] = useState<'retro-halftone' | 'manga-ink' | 'modern-indie'>(() => savedSettings?.comicStyleVariant || 'retro-halftone');
  const [collageStyleVariant, setCollageStyleVariant] = useState<'analog-torn' | 'retro-catalogue' | 'minimalist-kraft'>(() => savedSettings?.collageStyleVariant || 'analog-torn');
  const [splitLayoutType, setSplitLayoutType] = useState<'horizontal-diptych' | 'diagonal-slice' | 'clean-side-by-side'>(() => savedSettings?.splitLayoutType || 'clean-side-by-side');
  const [infographicStyle, setInfographicStyle] = useState<'minimalist-swiss' | 'hand-drawn-schematic' | 'vibrant-isometric'>(() => savedSettings?.infographicStyle || 'minimalist-swiss');
  const [flashcardStyle, setFlashcardStyle] = useState<'bold-minimalist' | '3d-claymorphic' | 'vintage-flashcard'>(() => savedSettings?.flashcardStyle || '3d-claymorphic');
  const [iconStyle, setIconStyle] = useState<'skeuomorphic-glass' | 'vibrant-isometric' | 'glowing-flat'>(() => savedSettings?.iconStyle || 'vibrant-isometric');
  const [mnemonicStyle, setMnemonicStyle] = useState<'dali-surrealist' | 'playful-cartoon' | 'neo-noir-dreamscape'>(() => savedSettings?.mnemonicStyle || 'playful-cartoon');
  const [storybookStyle, setStorybookStyle] = useState<'vintage-watercolor' | 'classic-gilded-age' | 'nordic-folk-art'>(() => savedSettings?.storybookStyle || 'vintage-watercolor');
  const [cinematicLightingStyle, setCinematicLightingStyle] = useState<'neon-noir' | 'golden-hour' | 'moody-low-key'>(() => savedSettings?.cinematicLightingStyle || 'golden-hour');
  const [papercraftDepth, setPapercraftDepth] = useState<'layered-origami' | 'deep-shadowbox' | 'flat-felt'>(() => savedSettings?.papercraftDepth || 'layered-origami');
  const [pixelartStyle, setPixelartStyle] = useState<'retro-8bit' | 'gorgeous-16bit' | 'cyberpunk-isometric'>(() => savedSettings?.pixelartStyle || 'gorgeous-16bit');
  const [embroideryStitch, setEmbroideryStitch] = useState<'thick-yarn' | 'dense-cross-stitch' | 'delicate-satin'>(() => savedSettings?.embroideryStitch || 'thick-yarn');
  const [stitchedBannerStyle, setStitchedBannerStyle] = useState<'felt-board' | 'quilted-tapestry' | 'homespun-canvas'>(() => savedSettings?.stitchedBannerStyle || 'felt-board');

  const [vanGoghStroke, setVanGoghStroke] = useState<'impasto' | 'classic' | 'swirling'>(() => savedSettings?.vanGoghStroke || 'impasto');
  const [vanGoghPalette, setVanGoghPalette] = useState<'starry' | 'sunflowers' | 'turbulent' | 'provence'>(() => savedSettings?.vanGoghPalette || 'starry');
  const [rembrandtLighting, setRembrandtLighting] = useState<'chiaroscuro' | 'soft-glow' | 'dramatic'>(() => savedSettings?.rembrandtLighting || 'chiaroscuro');
  const [rembrandtTexture, setRembrandtTexture] = useState<'rough-impasto' | 'glazed' | 'aged-canvas'>(() => savedSettings?.rembrandtTexture || 'aged-canvas');
  const [wesAndersonStyle, setWesAndersonStyle] = useState<'whimsical-drawing' | 'vintage-collage' | 'symmetrical-cinematic' | 'pastel-collage'>(() => savedSettings?.wesAndersonStyle || 'whimsical-drawing');
  const [wesAndersonTextAmount, setWesAndersonTextAmount] = useState<'none' | 'labels' | 'title'>(() => savedSettings?.wesAndersonTextAmount || 'labels');

  // Visual Identity Engine States
  const [visualIdentityStyle, setVisualIdentityStyle] = useState<'modern-tech' | 'luxury-editorial' | 'organic-artisan' | 'bold-streetwear' | 'cyberpunk-future'>(() => savedSettings?.visualIdentityStyle || 'modern-tech');
  const [visualIdentityMockup, setVisualIdentityMockup] = useState<'complete-flatlay' | 'packaging-merch' | 'clothing-brand' | 'prompted' | 'digital-suite' | 'stationery-print'>(() => savedSettings?.visualIdentityMockup || 'complete-flatlay');
  const [visualIdentityLighting, setVisualIdentityLighting] = useState<'nordic-minimal' | 'dark-luxury' | 'sunlit-atelier' | 'vibrant-studio'>(() => savedSettings?.visualIdentityLighting || 'nordic-minimal');
  const [visualIdentityTextAmount, setVisualIdentityTextAmount] = useState<'full-branding' | 'emblem-only' | 'minimal-clean'>(() => savedSettings?.visualIdentityTextAmount || 'full-branding');

  // No Background / Transparent Cutout Engine States
  const [isBackgroundless, setIsBackgroundless] = useState<boolean>(() => savedSettings?.isBackgroundless ?? false);
  const [transparentCutoutStyle, setTransparentCutoutStyle] = useState<'clean' | 'sticker' | 'feather'>(() => savedSettings?.transparentCutoutStyle || 'clean');
  const [transparentSubjectType, setTransparentSubjectType] = useState<'object' | 'character' | 'icon' | 'illustration'>(() => savedSettings?.transparentSubjectType || 'object');
  const [transparentTolerance, setTransparentTolerance] = useState<number>(() => savedSettings?.transparentTolerance || 32);
  const [isRemovingBgIndex, setIsRemovingBgIndex] = useState<number | null>(null);

  // Dixit Dreamscape Surreal Engine State (Smart & Streamlined)
  const [dixitRandomMode, setDixitRandomMode] = useState<boolean>(() => savedSettings?.dixitRandomMode || false);
  const [dixitArtistStyle, setDixitArtistStyle] = useState<'classic-hybrid' | 'coudray-revelations' | 'lefevre-origins' | 'pelissier-memories' | 'telleschi-mirrors'>(() => savedSettings?.dixitArtistStyle || 'classic-hybrid');
  const [dixitMetaphorMode, setDixitMetaphorMode] = useState<'autonomous-poetry' | 'scale-inversion' | 'metamorphosis' | 'poetic-paradox' | 'celestial-allegory'>(() => savedSettings?.dixitMetaphorMode || 'autonomous-poetry');
  
  // Universal Illustrative ESL Explainer Overlay state
  const [isEslExplainer, setIsEslExplainer] = useState<boolean>(() => savedSettings?.isEslExplainer || false);
  const [eslExplainerFocus, setEslExplainerFocus] = useState<'auto' | 'definition' | 'difference' | 'expression' | 'contrast' | 'depiction'>(() => savedSettings?.eslExplainerFocus || 'auto');
  
  // ESL-driven modes states
  const [chalkboardPalette, setChalkboardPalette] = useState<'multicolor' | 'white-only' | 'vintage-neon'>(() => savedSettings?.chalkboardPalette || 'multicolor');
  const [chalkboardStyle, setChalkboardStyle] = useState<'traditional-classroom' | 'mathematical-draft' | 'university-lecture'>(() => savedSettings?.chalkboardStyle || 'traditional-classroom');
  const [mouthGuideStyle, setMouthGuideStyle] = useState<'full-cross-section' | 'front-3d' | 'simplified-schema'>(() => savedSettings?.mouthGuideStyle || 'full-cross-section');
  const [mouthGuideColorStyle, setMouthGuideColorStyle] = useState<'clinical-neon' | 'vintage-medical' | 'friendly-crayon'>(() => savedSettings?.mouthGuideColorStyle || 'clinical-neon');
  const [synonymScaleSteps, setSynonymScaleSteps] = useState<'3-steps' | '5-steps'>(() => savedSettings?.synonymScaleSteps || '3-steps');
  const [synonymScaleStyle, setSynonymScaleStyle] = useState<'vibrant-gradient-cards' | 'playful-cartoon' | 'minimalist-ruler'>(() => savedSettings?.synonymScaleStyle || 'vibrant-gradient-cards');
  const [cutawayStyle, setCutawayStyle] = useState<'blueprint-blue' | 'sketchbook' | 'retro-patina'>(() => savedSettings?.cutawayStyle || 'blueprint-blue');
  const [cutawaySubjectType, setCutawaySubjectType] = useState<'mechanical-gears' | 'natural-geology' | 'architectural'>(() => savedSettings?.cutawaySubjectType || 'mechanical-gears');
  const [actionSequenceLayout, setActionSequenceLayout] = useState<'three-panels' | 'four-panels'>(() => savedSettings?.actionSequenceLayout || 'three-panels');
  const [actionSequenceStyle, setActionSequenceStyle] = useState<'vintage-comic' | 'modern-line-vector' | 'soft-watercolor'>(() => savedSettings?.actionSequenceStyle || 'modern-line-vector');
  const [etymologyStyle, setEtymologyStyle] = useState<'ancient-scroll' | 'vibrant-infographic' | 'botanical-sketch'>(() => savedSettings?.etymologyStyle || 'ancient-scroll');
  const [etymologyBranchLayout, setEtymologyBranchLayout] = useState<'majestic-oak' | 'stylized-vining' | 'symmetrical-radial'>(() => savedSettings?.etymologyBranchLayout || 'majestic-oak');

  // New ESL-driven engines
  const [prepositionStyle, setPrepositionStyle] = useState<'architectural-3d' | 'playful-isometric' | 'abstract-geometry'>(() => savedSettings?.prepositionStyle || 'playful-isometric');
  const [prepositionTextAmount, setPrepositionTextAmount] = useState<'none' | 'arrows-only' | 'full-sentences'>(() => savedSettings?.prepositionTextAmount || 'arrows-only');
  const [morphologyStyle, setMorphologyStyle] = useState<'wooden-blocks' | 'glowing-modular' | 'letterpress-type'>(() => savedSettings?.morphologyStyle || 'wooden-blocks');
  const [morphologyTextAmount, setMorphologyTextAmount] = useState<'none' | 'morphemes-only' | 'etymology-notes'>(() => savedSettings?.morphologyTextAmount || 'morphemes-only');
  const [collocationStyle, setCollocationStyle] = useState<'mindmap-bubbles' | 'chalk-web' | 'vector-nodes'>(() => savedSettings?.collocationStyle || 'mindmap-bubbles');
  const [collocationTextAmount, setCollocationTextAmount] = useState<'none' | 'words-only' | 'example-sentences'>(() => savedSettings?.collocationTextAmount || 'words-only');
  
  const [prompt, setPrompt] = useState<string>(() => savedSettings?.prompt || '');
  const [imageSize, setImageSize] = useState<'512px' | '1K' | '2K' | '4K'>(() => savedSettings?.imageSize || '2K');
  const [aspectRatio, setAspectRatio] = useState<'1:1' | '16:9' | '9:16' | '4:3' | '3:4'>(() => savedSettings?.aspectRatio || '3:4');
  const [numImages, setNumImages] = useState<1 | 2>(() => savedSettings?.numImages || 2);
  const [cefrLevel, setCefrLevel] = useState<number>(() => savedSettings?.cefrLevel !== undefined ? savedSettings.cefrLevel : 3); // Index 3 is A2+

  // Effect to automatically persist options and current input state to localStorage on modification with debouncing
  useEffect(() => {
    const handler = setTimeout(() => {
      try {
        const settingsObj = {
          generationMode,
          imageModel,
          backgroundColor,
          useCustomBackground,
          visualTheme,
          showAdvancedModes,
          showEslCategory,
          showCreativeCategory,
          macroStyleVariant,
          silhouetteStyleVariant,
          origamiStyleVariant,
          claymationStyleVariant,
          neonStyleVariant,
          eslTextAmount,
          photoTextAmount,
          docTextAmount,
          infographicTextAmount,
          flashcardTextAmount,
          iconTextAmount,
          comicTextAmount,
          collageTextAmount,
          splitTextAmount,
          mnemonicTextAmount,
          storybookTextAmount,
          cinematicTextAmount,
          papercraftTextAmount,
          pixelartTextAmount,
          embroideryTextAmount,
          stitchedTextAmount,
          vangoghTextAmount,
          rembrandtTextAmount,
          chalkboardTextAmount,
          mouthGuideTextAmount,
          synonymScaleTextAmount,
          cutawayTextAmount,
          actionSequenceTextAmount,
          etymologyTextAmount,
          photoStyleVariant,
          eslIllustrationStyle,
          docPageStyle,
          comicStyleVariant,
          collageStyleVariant,
          splitLayoutType,
          infographicStyle,
          flashcardStyle,
          iconStyle,
          mnemonicStyle,
          storybookStyle,
          cinematicLightingStyle,
          papercraftDepth,
          pixelartStyle,
          embroideryStitch,
          stitchedBannerStyle,
          vanGoghStroke,
          vanGoghPalette,
          rembrandtLighting,
          rembrandtTexture,
          wesAndersonStyle,
          wesAndersonTextAmount,
          visualIdentityStyle,
          visualIdentityMockup,
          visualIdentityLighting,
          visualIdentityTextAmount,
          isBackgroundless,
          transparentCutoutStyle,
          transparentSubjectType,
          transparentTolerance,
          dixitRandomMode,
          dixitArtistStyle,
          dixitMetaphorMode,
          isEslExplainer,
          eslExplainerFocus,
          chalkboardPalette,
          chalkboardStyle,
          mouthGuideStyle,
          mouthGuideColorStyle,
          synonymScaleSteps,
          synonymScaleStyle,
          cutawayStyle,
          cutawaySubjectType,
          actionSequenceLayout,
          actionSequenceStyle,
          etymologyStyle,
          etymologyBranchLayout,
          prepositionStyle,
          prepositionTextAmount,
          morphologyStyle,
          morphologyTextAmount,
          collocationStyle,
          collocationTextAmount,
          prompt,
          imageSize,
          aspectRatio,
          numImages,
          cefrLevel
        };
        localStorage.setItem('digs_studio_settings', JSON.stringify(settingsObj));
      } catch (e) {
        console.error("Could not save settings to localStorage", e);
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [
    generationMode,
    imageModel,
    backgroundColor,
    useCustomBackground,
    visualTheme,
    showAdvancedModes,
    showEslCategory,
    showCreativeCategory,
    macroStyleVariant,
    silhouetteStyleVariant,
    origamiStyleVariant,
    claymationStyleVariant,
    neonStyleVariant,
    eslTextAmount,
    photoTextAmount,
    docTextAmount,
    infographicTextAmount,
    flashcardTextAmount,
    iconTextAmount,
    comicTextAmount,
    collageTextAmount,
    splitTextAmount,
    mnemonicTextAmount,
    storybookTextAmount,
    cinematicTextAmount,
    papercraftTextAmount,
    pixelartTextAmount,
    embroideryTextAmount,
    stitchedTextAmount,
    vangoghTextAmount,
    rembrandtTextAmount,
    chalkboardTextAmount,
    mouthGuideTextAmount,
    synonymScaleTextAmount,
    cutawayTextAmount,
    actionSequenceTextAmount,
    etymologyTextAmount,
    photoStyleVariant,
    eslIllustrationStyle,
    docPageStyle,
    comicStyleVariant,
    collageStyleVariant,
    splitLayoutType,
    infographicStyle,
    flashcardStyle,
    iconStyle,
    mnemonicStyle,
    storybookStyle,
    cinematicLightingStyle,
    papercraftDepth,
    pixelartStyle,
    embroideryStitch,
    stitchedBannerStyle,
    vanGoghStroke,
    vanGoghPalette,
    rembrandtLighting,
    rembrandtTexture,
    wesAndersonStyle,
    wesAndersonTextAmount,
    visualIdentityStyle,
    visualIdentityMockup,
    visualIdentityLighting,
    visualIdentityTextAmount,
    isBackgroundless,
    transparentCutoutStyle,
    transparentSubjectType,
    transparentTolerance,
    dixitRandomMode,
    dixitArtistStyle,
    dixitMetaphorMode,
    isEslExplainer,
    eslExplainerFocus,
    chalkboardPalette,
    chalkboardStyle,
    mouthGuideStyle,
    mouthGuideColorStyle,
    synonymScaleSteps,
    synonymScaleStyle,
    cutawayStyle,
    cutawaySubjectType,
    actionSequenceLayout,
    actionSequenceStyle,
    etymologyStyle,
    etymologyBranchLayout,
    prepositionStyle,
    prepositionTextAmount,
    morphologyStyle,
    morphologyTextAmount,
    collocationStyle,
    collocationTextAmount,
    prompt,
    imageSize,
    aspectRatio,
    numImages,
    cefrLevel
  ]);
  const [activeGenerationPrompt, setActiveGenerationPrompt] = useState('');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultImages, setResultImages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [copySuccessStates, setCopySuccessStates] = useState<{[key: number]: boolean}>({});
  
  const [isLightModalOpen, setIsLightModalOpen] = useState(false);
  const [lightProps, setLightProps] = useState<{azimuth: string, altitude: string, tension: string, lumens: string, beamAngle: string, intensity: string, colorTemp: string, modifiers: string[]} | null>(null);
  const [isPhotoLightModalOpen, setIsPhotoLightModalOpen] = useState(false);
  const [photoLightData, setPhotoLightData] = useState<{prompt: string, state: any} | null>(null);
  const [lightingDigest, setLightingDigest] = useState<string | null>(null);
  const [isDigestingLight, setIsDigestingLight] = useState(false);

  // Reference / Inspiration / Character Image state
  const [referenceImage, setReferenceImage] = useState<{dataUrl: string, base64: string, mimeType: string, name: string} | null>(null);
  const [referenceRole, setReferenceRole] = useState<'all' | 'character' | 'theme' | 'style' | 'palette'>('all');
  const [refImageDragOver, setRefImageDragOver] = useState(false);
  const referenceImageInputRef = useRef<HTMLInputElement>(null);

  const handleProcessReferenceFile = (file: File) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        const mimeType = file.type || 'image/png';
        const base64 = result.split(',')[1] || '';
        setReferenceImage({
          dataUrl: result,
          base64,
          mimeType,
          name: file.name
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleReferenceImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleProcessReferenceFile(e.target.files[0]);
    }
  };

  const cefrLevels = ['A1', 'A1+', 'A2', 'A2+', 'B1', 'B1+', 'B2', 'B2+', 'C1', 'C1+', 'C2', 'C2+'];

  const generateRef = useRef<((prompt?: string | React.MouseEvent) => Promise<void>) | null>(null);
  
  useEffect(() => {
    generateRef.current = handleGenerate;
  });

  useEffect(() => {
    document.title = "DIG'S ESL STUDIO";
    
    const params = new URLSearchParams(window.location.search);
    const initialPrompt = params.get('prompt');
    const paramMode = params.get('mode');
    const paramLevel = params.get('level');
    const paramSize = params.get('size');

    if (initialPrompt) {
      setTimeout(() => {
        if (generateRef.current) {
          generateRef.current({
            prompt: initialPrompt,
            mode: paramMode || 'doc',
            level: paramLevel ? parseInt(paramLevel) : 3,
            size: paramSize || '2K',
            count: 2
          });
        }
      }, 100);
      const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
      window.history.replaceState({path:newUrl},'',newUrl);
    }

    const messageHandler = (e: MessageEvent) => {
      if (e.data && e.data.type === 'DIGS_IMG_PROMPT' && e.data.detail && generateRef.current) {
        generateRef.current(e.data.detail);
      }
    };
    window.addEventListener('message', messageHandler);
    return () => {
      window.removeEventListener('message', messageHandler);
    };
  }, []);

  const downloadExtension = async () => {
    const zip = new JSZip();

    const manifest = {
      "manifest_version": 3,
      "name": "DIG'S Studio Helper",
      "version": "1.5",
      "description": "Generate visuals from clipboard directly in DIG'S ESL STUDIO.",
      "permissions": ["activeTab", "scripting", "tabs"],
      "icons": {
        "128": "icon.png"
      },
      "action": {
        "default_popup": "popup.html",
        "default_title": "Send to DIG'S Studio",
        "default_icon": "icon.png"
      },
      "background": {
        "service_worker": "background.js"
      },
      "commands": {
        "_execute_action": {
          "suggested_key": {
            "default": "Ctrl+Shift+9",
            "mac": "Command+Shift+9"
          },
          "description": "Open DIG'S IMAGES popup"
        }
      },
      "host_permissions": [
        "<all_urls>"
      ]
    };

    const backgroundJs = `
const pendingPrompts = {};

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'SET_PENDING') {
    pendingPrompts[msg.tabId] = msg.prompt;
    sendResponse({ success: true });
  }
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && pendingPrompts[tabId]) {
    const prompt = pendingPrompts[tabId];
    delete pendingPrompts[tabId];
    
    // Slight delay to ensure React app is mounted in the iframe
    setTimeout(async () => {
      try {
        await chrome.scripting.executeScript({
          world: "MAIN",
          target: { tabId: tabId, allFrames: true },
          func: (data) => {
            if (window.location.host.includes('ai.studio')) {
              var iframes = document.querySelectorAll('iframe');
              iframes.forEach(f => {
                try { f.contentWindow.postMessage({type: 'DIGS_IMG_PROMPT', detail: data}, '*'); } catch(e){}
              });
            } else {
              window.postMessage({type: 'DIGS_IMG_PROMPT', detail: data}, '*');
            }
          },
          args: [prompt]
        });
      } catch (err) {
        console.error('Failed to inject upon load', err);
      }
    }, 2500);
  }
});
`;

    const popupHtml = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { width: 320px; padding: 16px; font-family: system-ui, sans-serif; background: rgba(7, 11, 20, 0.96); backdrop-filter: blur(12px); color: #e2e8f0; margin: 0; }
    /* Making it "draggable" via CSS (applies to elements within, though extension popups themselves can't be moved on the screen) */
    html { -webkit-app-region: drag; }
    body > * { -webkit-app-region: no-drag; }
    h3 { margin-top: 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; display: flex; align-items: center; justify-content: center; gap: 4px; margin-bottom: 12px; font-weight: 900; width: 100%; text-align: center;}
    textarea { width: 100%; box-sizing: border-box; background: rgba(15, 23, 42, 0.8); border: 1px solid #1e293b; color: white; padding: 10px; border-radius: 8px; min-height: 80px; margin-bottom: 12px; font-size: 13px; resize: vertical; }
    textarea:focus { outline: none; border-color: #06b6d4; background: rgba(15, 23, 42, 1); }
    .grid { display: grid; gap: 10px; margin-bottom: 15px; }
    .col-2 { grid-template-columns: 1fr 1fr; }
    .field { display: flex; flex-direction: column; gap: 4px; }
    label { font-size: 10px; text-transform: uppercase; color: #94a3b8; font-weight: bold; letter-spacing: 0.5px; }
    select { background: rgba(15, 23, 42, 0.8); border: 1px solid #1e293b; color: white; padding: 8px; border-radius: 6px; font-size: 12px; cursor: pointer; }
    select:focus { outline: none; border-color: #06b6d4; background: rgba(15, 23, 42, 1); }
    button { width: 100%; background: #0891b2; color: white; border: none; padding: 12px; border-radius: 8px; font-weight: bold; cursor: pointer; text-transform: uppercase; letter-spacing: 1px; font-size: 12px; transition: background 0.2s; box-shadow: 0 4px 6px rgba(0,0,0,0.3); }
    button:hover { background: #06b6d4; box-shadow: 0 4px 12px rgba(6,182,212,0.4); }
    #status { margin-top: 10px; font-size: 11px; color: #ef4444; text-align: center; font-weight: bold; }
    .success-text { color: #10b981 !important; }
  </style>
</head>
<body>
  <h3>
    <span style="color:#b30000">D</span><span style="color:#cc5200">I</span><span style="color:#b38f00">G</span><span style="color:#008000">'</span><span style="color:#0000b3">S</span>
    &nbsp;
    <span style="color:#330080">I</span><span style="color:#660080">M</span><span style="color:#b30000">A</span><span style="color:#cc5200">G</span><span style="color:#b38f00">E</span><span style="color:#008000">S</span>
  </h3>
  <textarea id="promptInput" placeholder="Paste or type your concept here... (Press Enter to Send)"></textarea>
  
  <div class="grid">
    <div class="field">
      <label>Visual Engine Mode</label>
      <select id="modeSelect">
        <option value="photo">Photographic</option>
        <option value="esl">ESL Illustration</option>
        <option value="doc" selected>Digtionary View</option>
        <option value="embroidery">Textile Embroidery</option>
        <option value="comic">Comic Scenario</option>
        <option value="collage">Collage Art</option>
        <option value="split">Literal vs Meaning</option>
        <option value="infographic">Grammar Diagram</option>
        <option value="flashcard">Minimal Flashcard</option>
        <option value="icon">Vibrant Icon</option>
        <option value="mnemonic">Surreal Mnemonic</option>
        <option value="storybook">Storybook Scene</option>
        <option value="cinematic">Cinematic Poster</option>
        <option value="papercraft">Tactile Papercraft</option>
        <option value="pixelart">16-Bit Pixel RPG</option>
        <option value="stitched">Stitched Grammar</option>
        <option value="vangogh">Van Gogh Oil Painting</option>
        <option value="rembrandt">Rembrandt Masterpiece</option>
      </select>
    </div>
    
    <div class="grid col-2" style="margin-bottom:0">
      <div class="field">
        <label>Level</label>
        <select id="levelSelect">
          <option value="0">A1</option><option value="1">A1+</option>
          <option value="2">A2</option><option value="3" selected>A2+</option>
          <option value="4">B1</option><option value="5">B1+</option>
          <option value="6">B2</option><option value="7">B2+</option>
          <option value="8">C1</option><option value="9">C1+</option>
          <option value="10">C2</option><option value="11">C2+</option>
        </select>
      </div>
      <div class="field">
        <label>Resolution</label>
        <select id="sizeSelect">
          <option value="1K">1K</option>
          <option value="2K" selected>2K HI</option>
          <option value="4K">4K UHD</option>
        </select>
      </div>
    </div>
  </div>

  <button id="generateBtn">Send Command</button>
  <div id="status"></div>
  <script src="popup.js"></script>
</body>
</html>
`;

    const popupJs = `
document.addEventListener('DOMContentLoaded', async () => {
  const input = document.getElementById('promptInput');
  const btn = document.getElementById('generateBtn');
  const status = document.getElementById('status');
  
  const modeSelect = document.getElementById('modeSelect');
  const levelSelect = document.getElementById('levelSelect');
  const sizeSelect = document.getElementById('sizeSelect');

  // Focus input by default
  input.focus();

  // Try reading clipboard using a dummy visible element (compatible with MV3 popups)
  const dummy = document.createElement('textarea');
  document.body.appendChild(dummy);
  dummy.focus();
  document.execCommand('paste');
  const clipboardText = dummy.value;
  document.body.removeChild(dummy);

  if (clipboardText && clipboardText.trim()) {
    input.value = clipboardText.trim();
    input.select();
  } else {
    // Fallback block if permitted (usually unneeded if execCommand works)
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        input.value = text.trim();
        input.select();
      }
    } catch (err) {}
  }
  
  // Re-focus the main input
  input.focus();

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      btn.click();
    }
  });

  btn.addEventListener('click', async () => {
    const prompt = input.value.trim();
    if (!prompt) {
      status.style.color = '#ef4444';
      status.className = '';
      status.textContent = 'Please enter a prompt.';
      return;
    }

    const payload = {
      prompt: prompt,
      mode: modeSelect.value,
      level: parseInt(levelSelect.value),
      size: sizeSelect.value,
      count: 2
    };

    btn.textContent = 'Sending...';
    
    // Find open DIG'S Studio tab
    const tabs = await chrome.tabs.query({});
    const targetTab = tabs.find(t => 
      (t.url && t.url.includes('ai.studio/apps')) || 
      (t.title && (t.title.includes("DIG'S") || t.title.includes("ESL Visuals")))
    );

    if (targetTab) {
      try {
        await chrome.scripting.executeScript({
          world: "MAIN",
          target: { tabId: targetTab.id, allFrames: true },
          func: (data) => {
            if (window.location.host.includes('ai.studio')) {
              var iframes = document.querySelectorAll('iframe');
              iframes.forEach(f => {
                try { f.contentWindow.postMessage({type: 'DIGS_IMG_PROMPT', detail: data}, '*'); } catch(e){}
              });
            } else {
              window.postMessage({type: 'DIGS_IMG_PROMPT', detail: data}, '*');
            }
          },
          args: [payload]
        }).catch(err => {
            // Fallback for browsers that don't support MAIN world execution gracefully yet
            return chrome.scripting.executeScript({
              target: { tabId: targetTab.id, allFrames: true },
              func: (data) => {
                if (window.location.host.includes('ai.studio')) {
                  var iframes = document.querySelectorAll('iframe');
                  iframes.forEach(f => {
                    try { f.contentWindow.postMessage({type: 'DIGS_IMG_PROMPT', detail: data}, '*'); } catch(e){}
                  });
                } else {
                  window.postMessage({type: 'DIGS_IMG_PROMPT', detail: data}, '*');
                }
              },
              args: [payload]
            });
        });
        
        status.className = 'success-text';
        status.textContent = 'Sent! Generating in background tab...';
        btn.textContent = 'Task Launched';
        
        // Auto-close after a moment
        setTimeout(() => window.close(), 1200);

      } catch(err) {
         status.style.color = '#ef4444';
         status.className = '';
         status.textContent = 'Could not communicate. Try refreshing the app tab.';
         btn.textContent = 'Send Command';
      }
    } else {
      // Open new tab in background
      const queryParams = '?prompt=' + encodeURIComponent(payload.prompt) + '&mode=' + payload.mode + '&level=' + payload.level + '&size=' + payload.size;
      const appUrl = 'https://ai.studio/apps/67c3a215-8b5e-460e-a567-06def7be33b4?fullscreenApplet=true' + queryParams.replace('?','&');
      
      status.className = 'success-text';
      status.textContent = 'Opening new tab and generating...';
      
      const newTab = await chrome.tabs.create({ url: appUrl, active: false });
      chrome.runtime.sendMessage({ type: 'SET_PENDING', tabId: newTab.id, prompt: payload }, () => {
        setTimeout(() => window.close(), 1000);
      });
    }
  });
});
`;

    // Generate Icon using Canvas
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    let iconBase64 = '';
    if (ctx) {
      ctx.fillStyle = '#070b14';
      ctx.beginPath();
      ctx.roundRect(0,0,128,128, 24);
      ctx.fill();
      
      ctx.fillStyle = '#0891b2';
      ctx.beginPath();
      ctx.arc(64, 64, 40, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = '#f8fafc';
      ctx.beginPath();
      ctx.arc(64, 64, 40, Math.PI / 2, Math.PI * 1.5);
      ctx.fill();
      
      ctx.fillStyle = '#0891b2';
      ctx.beginPath();
      ctx.arc(64, 44, 20, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = '#f8fafc';
      ctx.beginPath();
      ctx.arc(64, 84, 20, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = '#f8fafc';
      ctx.beginPath();
      ctx.arc(64, 44, 6, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = '#0891b2';
      ctx.beginPath();
      ctx.arc(64, 84, 6, 0, Math.PI * 2);
      ctx.fill();

      // Convert to base64
      const dataUrl = canvas.toDataURL('image/png');
      iconBase64 = dataUrl.split(',')[1];
    }

    zip.file("manifest.json", JSON.stringify(manifest, null, 2));
    if (iconBase64) zip.file("icon.png", iconBase64, {base64: true});
    zip.file("background.js", backgroundJs);
    zip.file("popup.html", popupHtml);
    zip.file("popup.js", popupJs);

    const content = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(content);
    const a = document.createElement("a");
    a.href = url;
    a.download = "digs-ext.zip";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleGenerate = async (options?: any) => {
    const isEvent = options && !!options.nativeEvent;
    // Extract payload from popup extension or keep local state, this handles overriding dynamically
    let payload = (!isEvent && options) ? options : null;
    if (typeof payload === 'string') payload = { prompt: payload };

    const finalPromptText = payload && payload.prompt !== undefined ? payload.prompt : prompt;
    const finalMode = payload && payload.mode !== undefined ? payload.mode : generationMode;
    const finalSize = payload && payload.size !== undefined ? payload.size : imageSize;
    const finalLevel = payload && payload.level !== undefined ? payload.level : cefrLevel;
    const finalCount = payload && payload.count !== undefined ? payload.count : numImages;

    if (!finalPromptText) {
      setError("Please enter a prompt.");
      return;
    }
    
    // Apply extension overrides directly to UI as well
    setPrompt(finalPromptText);
    setGenerationMode(finalMode);
    setImageSize(finalSize);
    setCefrLevel(finalLevel);
    setNumImages(finalCount);
    if (payload && payload.mode === 'doc') setDocTextAmount('short');
    if (payload && payload.count === 2) setAspectRatio('3:4');

    setIsGenerating(true);
    setError(null);
    // Preserving old resultImages while new ones are generating
    setActiveGenerationPrompt(finalPromptText);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      let finalPrompt = finalPromptText;
      const activeBackgroundless = isBackgroundless || finalMode === 'no_background';

      const getSmartBgInstruction = (defaultNatural: string) => {
        if (activeBackgroundless) {
          return 'CRITICAL ISOLATION MANDATE: The background MUST be a pure, flat, uniform, solid white (#FFFFFF) seamless studio void. ABSOLUTELY NO scenery, no environment, no horizon, no tabletop, and ZERO cast ground shadows or contact shadows. The subject must float completely isolated on the white background.';
        }
        if (useCustomBackground) {
          return `The background MUST be a pure, solid, uniform color of hex ${backgroundColor} to eliminate distractions.`;
        }
        return defaultNatural;
      };

      const targetLevel = cefrLevels[finalLevel];
      const basePersona = `You are an expert visual designer and linguist creating materials for an ESL (English as a Second Language) class of ${targetLevel} level. Your goal is to take the target phrase/concept and create a brilliant, highly intuitive visual explanation that helps language learners instantly grasp the meaning and context. Keep the difficulty appropriate for ${targetLevel} students. Target concept/phrase:`;
      const themeInstruction = visualTheme.trim() ? ` VERY IMPORTANT VISUAL THEME RESTRICTION: The entire image MUST strictly adhere to this specific visual theme: "${visualTheme.trim()}". Interpret this safely but apply it heavily to the style, atmosphere, and visual motifs.` : '';

      if (finalMode === 'photo') {
        let styleDesc = '';
        if (photoStyleVariant === 'studio-portrait') styleDesc = 'crisp studio portrait photography, soft key light, premium depth of field, elegant framing';
        else if (photoStyleVariant === 'action-shot') styleDesc = 'dynamic lifestyle action shot, candid motion blur, realistic environmental lighting, natural framing';
        else styleDesc = 'macro editorial photography, extreme close-up detail, sharp focal point, rich texture emphasis';

        let textInstr = photoTextAmount === 'integrated' ? 'Ingeniously integrate the relevant target phrase natively into the environment (e.g., written on a vintage sign, carved in wood, floating as neon lights).' : 'Do NOT include any text, typography, or labels in the image.';
        finalPrompt = `${basePersona}

[SUBJECT / CORE CONCEPT]
Topic to explicitly illustrate: "${finalPromptText}"
(Ensure the image clearly, literally, and accurately depicts this concept, action, or object. Make the primary subject the absolute focus of the image).

[ART STYLE & COMPOSITION]
Make sure the image is photorealistic, high quality photography that perfectly captures the essence of the meaning. Style: ${styleDesc}.

[TEXT INSTRUCTIONS]
${textInstr}

[THEME & EXTRAS]
${themeInstruction}
Include a small easter-egg perfectly shaped yin-yang in some ingenious context suitable for the composition.`;

      } else if (finalMode === 'macro') {
        let styleDesc = '';
        if (macroStyleVariant === 'crystalline-fractal') {
          styleDesc = 'crystalline refraction macro photography, featuring ultra-detailed mineral facets, light prism flares, geometric microscopic crystal surfaces, and razor-sharp focal optics';
        } else if (macroStyleVariant === 'bioluminescent-organism') {
          styleDesc = 'bioluminescent organic macro photography, subtle glowing cellular textures, iridescent microscopic skin or flora sheen, and soft luminescent ambient depth';
        } else {
          styleDesc = 'classic real-life macro photography, extremely shallow depth of field, exquisite bokeh background, razor-sharp central subject, and crisp microscopic liquid dewdrop fiber texture';
        }

        finalPrompt = `${basePersona}

[SUBJECT / CORE CONCEPT]
Topic to explicitly illustrate: "${finalPromptText}"
(Ensure the image clearly, literally, and accurately depicts this concept, action, or object. Make the primary subject the absolute focus of the image).

[ART STYLE & COMPOSITION]
Create a highly professional, breathtaking real-life macro photography shot (${styleDesc}). The depth of field should be extremely shallow, creating a beautiful bokeh effect in the background while the central subject is razor-sharp. Lighting should be natural and revealing of microscopic textures.

[TEXT INSTRUCTIONS]
Rules: NO text, NO labels, NO typography of any kind. The image must be completely purely visual.

[THEME & EXTRAS]
${themeInstruction}
Include a small easter-egg perfectly shaped yin-yang cleverly hidden in the natural textures.`;
      } else if (finalMode === 'silhouette') {
        let styleDesc = '';
        if (silhouetteStyleVariant === 'cyberpunk-neon') {
          styleDesc = 'cyberpunk neon fog silhouette, deep pitch-black subject framed by glowing electric cyan and vivid magenta atmospheric haze';
        } else if (silhouetteStyleVariant === 'minimalist-monochrome') {
          styleDesc = 'minimalist high-contrast architectural monochrome silhouette, pure black subject against stark clean white and cream studio backlighting';
        } else {
          styleDesc = 'dramatic sunset back-lit silhouette, heavy solid dark shadows set against an intensely vibrant blazing fiery sunset sky';
        }

        finalPrompt = `${basePersona}

[SUBJECT / CORE CONCEPT]
Topic to explicitly illustrate: "${finalPromptText}"
(Ensure the image clearly, literally, and accurately depicts this concept, action, or object. Make the primary subject the absolute focus of the image).

[ART STYLE & COMPOSITION]
Create a striking, high-contrast silhouette composition (${styleDesc}). The main subject should be completely black or heavily shadowed, set against an intensely vibrant, dramatic, and colorful backdrop.

[TEXT INSTRUCTIONS]
Rules: NO text, NO labels, NO typography of any kind. The image must be completely purely visual.

[THEME & EXTRAS]
${themeInstruction}
Include a small easter-egg perfectly shaped yin-yang hidden in the background light.`;
      } else if (finalMode === 'origami') {
        let styleDesc = '';
        if (origamiStyleVariant === 'washi-patterned') {
          styleDesc = 'traditional Japanese washi paper origami, featuring intricate floral and gold foil pattern prints on soft fibrous paper folds';
        } else if (origamiStyleVariant === 'metallic-foil') {
          styleDesc = 'gilded metallic foil origami, luminescent gold, bronze, and iridescent foil-stamped paper creases reflecting studio rim light';
        } else {
          styleDesc = 'classic crisp geometric origami paper art, clean sharp angular folds, pristine paper texture, and soft realistic drop shadows';
        }

        const bgInstruction = getSmartBgInstruction('The background should be a clean natural paper studio backdrop.');
        finalPrompt = `${basePersona}

[SUBJECT / CORE CONCEPT]
Topic to explicitly illustrate: "${finalPromptText}"
(Ensure the image clearly, literally, and accurately depicts this concept, action, or object. Make the primary subject the absolute focus of the image).

[ART STYLE & COMPOSITION]
Create a beautiful, pristine origami paper art scene (${styleDesc}). The subjects should be constructed from intricately folded paper. ${bgInstruction} The lighting should highlight the crisp folds and cast soft shadows on the background.

[TEXT INSTRUCTIONS]
Rules: NO text, NO labels, NO typography of any kind. The image must be completely purely visual.

[THEME & EXTRAS]
${themeInstruction}
Include a small easter-egg perfectly shaped yin-yang folded out of paper.`;
      } else if (finalMode === 'claymation') {
        let styleDesc = '';
        if (claymationStyleVariant === 'glossy-plasticine') {
          styleDesc = 'vibrant glossy plasticine claymation, ultra smooth colorful modeling clay figures with glossy sheen and bright studio ring lighting';
        } else if (claymationStyleVariant === 'vintage-ardman') {
          styleDesc = 'nostalgic studio stop-motion clay art, quirky hand-sculpted tactile characters, warm felt background accents, and classic studio stop-motion charm';
        } else {
          styleDesc = 'tactile polymer claymation stop-motion style, hand-sculpted from modeling clay with visible thumbprints, soft clay seams, and physical tabletop lighting';
        }

        const bgInstruction = getSmartBgInstruction('The background should be a realistic studio claymation tabletop setting.');
        finalPrompt = `${basePersona}

[SUBJECT / CORE CONCEPT]
Topic to explicitly illustrate: "${finalPromptText}"
(Ensure the image clearly, literally, and accurately depicts this concept, action, or object. Make the primary subject the absolute focus of the image).

[ART STYLE & COMPOSITION]
Create a charming, tactile claymation stop-motion style scene (${styleDesc}). The characters and objects should look like they are hand-sculpted from modeling clay or plastilina, complete with visible fingerprints, slightly imperfect shapes, and a physical studio lighting setup. ${bgInstruction}

[TEXT INSTRUCTIONS]
Rules: NO text, NO labels, NO typography of any kind. The image must be completely purely visual.

[THEME & EXTRAS]
${themeInstruction}
Include a small easter-egg perfectly shaped yin-yang made of clay.`;
      } else if (finalMode === 'neon') {
        let styleDesc = '';
        if (neonStyleVariant === 'vaporwave-retro') {
          styleDesc = 'vaporwave synthwave neon glow, glowing cyan and magenta wireframe tubes on an extended retro grid horizon with glowing sunset gradient void';
        } else if (neonStyleVariant === 'holographic-blueprint') {
          styleDesc = 'holographic cyan vector schema, glowing wireframe nodes, translucent high-tech wireframe outlines, and electric blue vector lines in dark void';
        } else {
          styleDesc = 'futuristic glowing 3D cybernetic wireframe, luminous bright colored neon tube structure floating in a dark atmospheric pitch-black void';
        }

        finalPrompt = `${basePersona}

[SUBJECT / CORE CONCEPT]
Topic to explicitly illustrate: "${finalPromptText}"
(Ensure the image clearly, literally, and accurately depicts this concept, action, or object. Make the primary subject the absolute focus of the image).

[ART STYLE & COMPOSITION]
Create a futuristic, glowing 3D neon wireframe scene (${styleDesc}). The subjects should be constructed entirely from luminous, brightly colored neon tubes floating in a dark, atmospheric, pitch-black void. The style is heavily inspired by synthwave aesthetics and minimalist vector arcade graphics.

[TEXT INSTRUCTIONS]
Rules: NO text, NO labels, NO typography of any kind. The image must be completely purely visual.

[THEME & EXTRAS]
${themeInstruction}
Include a small easter-egg perfectly shaped glowing yin-yang.`;
      } else if (finalMode === 'dixit') {
        const DIXIT_UNIVERSES: Array<'classic-hybrid' | 'coudray-revelations' | 'lefevre-origins' | 'pelissier-memories' | 'telleschi-mirrors'> = [
          'classic-hybrid',
          'coudray-revelations',
          'lefevre-origins',
          'pelissier-memories',
          'telleschi-mirrors'
        ];
        const DIXIT_METAPHORS: Array<'autonomous-poetry' | 'scale-inversion' | 'metamorphosis' | 'poetic-paradox' | 'celestial-allegory'> = [
          'autonomous-poetry',
          'scale-inversion',
          'metamorphosis',
          'poetic-paradox',
          'celestial-allegory'
        ];

        const activeArtist = dixitRandomMode
          ? DIXIT_UNIVERSES[Math.floor(Math.random() * DIXIT_UNIVERSES.length)]
          : dixitArtistStyle;
        const activeMetaphor = dixitRandomMode
          ? DIXIT_METAPHORS[Math.floor(Math.random() * DIXIT_METAPHORS.length)]
          : dixitMetaphorMode;

        let artistDesc = '';
        if (activeArtist === 'coudray-revelations') {
          artistDesc = 'Gilded Revelations Dixit universe inspired by Marina Coudray and Gustav Klimt, characterized by ornate 24K gilded gold leaf filigree, celestial tarot constellations, flowing Alphonse Mucha Art Nouveau organic curves, illuminated egg tempera glazes, and rich jewel-toned pigments';
        } else if (activeArtist === 'lefevre-origins') {
          artistDesc = 'Curiosity & Clockwork Dixit universe inspired by Clément Lefèvre and Franck Dion, featuring vintage storybook surrealism, antique brass apparatus, curiosity cabinets, theatrical silhouette shadow puppets, tactile matte acrylic textures, and nostalgic mystery';
        } else if (activeArtist === 'pelissier-memories') {
          artistDesc = 'Luminous Biome Dixit universe inspired by Jérôme Pélissier and Paul Echegoyen, featuring radiant enchanted fantasy, bioluminescent flora, wet-on-wet blooming watercolor washes, glowing mossy greens, delicate floating spores, and saturated joyful dream ecologies';
        } else if (activeArtist === 'telleschi-mirrors') {
          artistDesc = 'Surreal Paradox & Mirrors Dixit universe inspired by René Magritte and Sébastien Telleschi, characterized by optical illusions, mirrored alternate realities where reflections live different lives, day/night atmospheric dualities, and impossible perspective paradoxes';
        } else {
          artistDesc = 'Classic Dixit Dreamscape universe inspired by Marie Cardouat and Xavier Collette, rendered with velvety matte gouache and soft pastels on textured cotton rag paper, atmospheric indigo twilight, glowing golden crescent moons, celestial wanderers with lanterns, paper sailboats drifting on grassy seas, and whimsical dream logic';
        }

        let metaphorDesc = '';
        if (activeMetaphor === 'scale-inversion') {
          metaphorDesc = `Scale Inversion & Miniature Worlds: dramatize scale by placing tiny curious human explorers inside oversized everyday objects or flora related to "${finalPromptText}" (such as navigating the brass gears of an antique pocketwatch, walking through a cathedral carved inside an open pomegranate, or sailing inside an ornate teacup)`;
        } else if (activeMetaphor === 'metamorphosis') {
          metaphorDesc = `Living Metamorphosis: seamlessly transform objects and entities into living nature (such as cello strings growing into silver tree roots, flocking swallows forming storm waves, or drifting pages of a book becoming fluttering autumn butterflies)`;
        } else if (activeMetaphor === 'poetic-paradox') {
          metaphorDesc = `Poetic Paradox & Situational Irony: depict "${finalPromptText}" through a delightful surreal contradiction (such as an umbrella raining upward from inside onto floating stars, an anchor caught in floating clouds, a glowing campfire burning peacefully deep underwater, or a keyhole in a cloud unlocking the sunrise)`;
        } else if (activeMetaphor === 'celestial-allegory') {
          metaphorDesc = `Celestial Allegory & Cosmic Dreams: express "${finalPromptText}" through nocturnal wonder—catching crescent moons in butterfly nets, harvesting starlight in glowing glass lanterns, planting constellations in fertile cloud soil, or climbing staircases woven from stardust`;
        } else {
          metaphorDesc = `AUTONOMOUS DREAM METAPHOR ALCHEMY (MAXIMUM AI CREATIVITY): Do not illustrate "${finalPromptText}" literally. Deeply interpret the emotional essence, philosophical tension, and abstract wonder of the concept into an unexpected, multi-layered visual riddle. Create surprising surreal juxtapositions, dream physics, and symbolic storytelling that invite multiple poetic interpretations suitable for the world-renowned Dixit board game`;
        }

        const textInstruction = 'CRITICAL REQUIREMENT - ABSOLUTELY 100% PURE VISUAL RIDDLE: Zero text. Absolutely NO words, NO letters, NO labels, NO typography, NO banners, NO titles, NO calligraphy, NO ribbons, NO inscriptions, NO watermark, NO numbers, NO alphabet symbols anywhere in the image. The entire story, clue, and meaning must be conveyed solely through evocative painting, dream symbolism, color, and surreal metaphor, identical to an authentic wordless Dixit game card.';

        const bgClause = activeBackgroundless
          ? 'The background behind the surreal subject must be pure, seamless solid white (#FFFFFF) studio void with zero ground shadows, isolating the poetic element.'
          : (useCustomBackground ? `Harmonize the atmospheric tones with custom background hex #${backgroundColor.replace('#', '')}.` : '');

        finalPrompt = `${basePersona}

[SUBJECT / DIXIT METAPHORICAL THEME]
Concept / Clue to visually allegorize: "${finalPromptText}"
(Transform this concept into an evocative, multi-layered visual metaphor worthy of the world-renowned board game Dixit. It should spark curiosity, poetic wonder, multiple interpretive readings, and emotional depth. Do NOT write or print any text, titles, or words on the image).

[ART STYLE & DREAM UNIVERSE]
Dream Universe & Aesthetic: ${artistDesc}.
Dream Logic & Metaphor Alchemy: ${metaphorDesc}.
Format: Vertical full-bleed storybook Dixit card composition.
${bgClause}

[COMPOSITION & NARRATIVE LAYERS]
Compose a vertical storybook masterpiece card with profound narrative layers. Combine whimsical innocence with quiet melancholic wonder, poetic juxtapositions, and subtle dream logic. Use deep spatial atmospheric perspective with rich foreground intrigue and endless dreamy horizons.

[TEXT INSTRUCTIONS]
${textInstruction}

[THEME & EXTRAS]
${themeInstruction}
Include a small, clearly identifiable glowing yin-yang symbol cleverly and harmoniously integrated into the dreamscape (such as a luminous celestial medallion, a crescent moon charm, a reflection in a pool of starlight, a brass clockwork gear emblem, or an enchanted water lily). It MUST be visibly recognizable while blending seamlessly into the surreal world.`;
      } else if (finalMode === 'no_background') {
        let subjectDetails = '';
        if (transparentSubjectType === 'character') {
          subjectDetails = 'a complete standalone character, figure, or mascot cutout in a dynamic pose, with crisp anatomical or stylistic contours, sharp hair and garment edges, and zero background clutter';
        } else if (transparentSubjectType === 'icon') {
          subjectDetails = 'a clean, volumetric 3D graphic icon or UI symbol, featuring sleek geometric curves, glossy highlights, subtle specular reflections, and an immaculate silhouette';
        } else if (transparentSubjectType === 'illustration') {
          subjectDetails = 'an artistic vector or hand-rendered clipart illustration, vibrant colors, clean contours, graphic boldness, and isolated composition';
        } else {
          subjectDetails = 'a pristine commercial product or object cutout showcase, studio photography quality, authentic material textures, crisp edges, and no environmental interference';
        }

        let edgeDetails = '';
        if (transparentCutoutStyle === 'sticker') {
          edgeDetails = 'The subject should have a clean, solid, bright white vinyl sticker die-cut border contour around its entire silhouette, making it look like a premium physical vinyl laptop sticker or decal.';
        } else if (transparentCutoutStyle === 'feather') {
          edgeDetails = 'The subject should have soft, natural, finely rendered outer contours that blend smoothly into the surrounding void without harsh blockiness.';
        } else {
          edgeDetails = 'The subject must have razor-sharp, distinct, high-contrast outer edges that create an immaculate silhouette against the white background.';
        }

        finalPrompt = `${basePersona}

[SUBJECT / ISOLATED CUTOUT CONCEPT]
Target subject to generate: "${finalPromptText}"
Subject Category & Execution: ${subjectDetails}.

[BACKGROUNDLESS & STUDIO ISOLATION MANDATE - CRITICAL]
- The subject MUST be 100% isolated on an absolute, seamless, pure solid white background (#FFFFFF).
- ABSOLUTELY ZERO background scenery, zero environment, zero floor textures, zero walls, zero ground plane.
- ZERO cast ground shadows or contact drop shadows on the floor/backdrop. The subject must float cleanly in pure white void space so that all background pixels can be extracted to pure transparency.
- The boundary between the subject and the solid white background must be sharp, well-defined, and unambiguous.
- ${edgeDetails}

[LIGHTING & MATERIALS]
Even, high-clarity studio illumination that lights the subject from all sides with clean rim light or key light, accentuating true colors and materials without casting shadows onto the perimeter backdrop.

[TEXT & BRANDING]
Do not print random unprompted text or logos unless specifically requested in "${finalPromptText}".

[THEME & EXTRAS]
${themeInstruction}
Include a small, clever, subtle yin-yang easter egg discreetly placed on the subject (such as a tiny engraved emblem, a subtle button or zipper detail, or an understated pattern detail) that harmonizes with the object.`;
      } else if (finalMode === 'visual_identity') {
        let styleDetails = '';
        if (visualIdentityStyle === 'luxury-editorial') {
          styleDetails = 'high-end luxury editorial branding with refined serif typography, metallic embossed gold foil accents, matte noir and muted earth tones, minimalist elegance and high fashion aesthetics';
        } else if (visualIdentityStyle === 'organic-artisan') {
          styleDetails = 'organic artisan sustainable brand identity with hand-rendered botanical linework emblem, warm terracotta, sage green, and oat tones, textured recycled kraft paper, and warm tactile craft craftsmanship';
        } else if (visualIdentityStyle === 'bold-streetwear') {
          styleDetails = 'bold streetwear & neo-pop visual identity featuring punchy heavy geometric display typography, high-contrast dynamic logo mark, vibrant electric accent colors, and contemporary youth culture edge';
        } else if (visualIdentityStyle === 'cyberpunk-future') {
          styleDetails = 'futuristic industrial tech branding with glowing holographic logo glyph, precision isometric grid typography, dark titanium and carbon fiber textures, neon cyan and magenta accents';
        } else {
          styleDetails = 'modern tech minimalist visual identity with clean vector geometric logo mark, Swiss typography hierarchy, sophisticated monochrome with a vibrant signature accent color, sleek premium aesthetic';
        }

        let mockupDetails = '';
        if (visualIdentityMockup === 'clothing-brand') {
          mockupDetails = 'an exclusive luxury clothing brand showcase: meticulously tailored high-quality garments (such as a heavyweight premium cotton hoodie, structured minimalist jacket or tee, bespoke woven fabric textures, embroidered logo patches, subtle woven neck labels, embossed cardstock garment hangtags, and branded apparel packaging), highlighting exquisite textile craftsmanship, precise stitching, and editorial fashion photography styling';
        } else if (visualIdentityMockup === 'prompted') {
          mockupDetails = `a bespoke commercial product showcase dynamically guided by the user's prompt: faithfully displaying and highlighting the exact products, merchandise, packaging items, and collateral described in "${finalPromptText}", featuring exquisite realistic materials, authentic textures, and high-end brand commercial photography execution`;
        } else if (visualIdentityMockup === 'packaging-merch') {
          mockupDetails = 'an exquisite product packaging and physical merchandise showcase: premium rigid gift boxes, custom labeled bottles or cosmetic jars, branded cotton canvas tote bag, matte coffee tumbler, and product hangtags, beautifully displayed in a high-end commercial photo presentation';
        } else if (visualIdentityMockup === 'digital-suite') {
          mockupDetails = 'a contemporary digital workspace and device showcase: sleek aluminum laptop, tablet, and smartphone displaying responsive brand web UI and mobile app screens, flanked by branded minimalist desk accessories, notebook, and wireless earbuds';
        } else if (visualIdentityMockup === 'stationery-print') {
          mockupDetails = 'a tactile premium stationery and corporate print suite: heavyweight textured cotton business cards with debossed foil logo, letterhead with custom watermark, sealed envelope with wax stamp, branded metal pen, and notebook';
        } else {
          mockupDetails = 'a complete multi-product brand identity flatlay and showcase: meticulously arranged business cards, branded product packaging box, ceramic coffee mug or tumbler, cotton tote bag, smartphone displaying the brand app, and notebook, displayed in a stunning studio composition';
        }

        let lightingDetails = '';
        if (visualIdentityLighting === 'dark-luxury') {
          lightingDetails = 'dramatic low-key studio lighting with soft specular highlights, deep charcoal matte stone background, moody directional shadows, and luxurious atmosphere';
        } else if (visualIdentityLighting === 'sunlit-atelier') {
          lightingDetails = 'warm natural golden sunlight casting architectural shadows through window blinds, light linen and concrete textures, organic relaxed studio ambience';
        } else if (visualIdentityLighting === 'vibrant-studio') {
          lightingDetails = 'bright contemporary commercial studio lighting, crisp geometric drop shadows, saturated complementary color accents, sharp pop-art clarity';
        } else {
          lightingDetails = 'soft diffused Nordic daylight, clean neutral studio surface, subtle ambient shadows, expansive negative space, and immaculate professional clarity';
        }

        let textInstruction = '';
        if (visualIdentityTextAmount === 'emblem-only') {
          textInstruction = 'Prominently display the creative logo emblem, monogram mark, or symbol cleanly debossed or printed on each product. Keep written text minimal, focusing on the visual brand mark and icon design.';
        } else if (visualIdentityTextAmount === 'minimal-clean') {
          textInstruction = 'Focus predominantly on the visual product forms, brand color palette, and packaging materials with subtle, understated logo stamps. Avoid dense text or paragraphs.';
        } else {
          textInstruction = `Clearly feature the imagined brand name derived from "${finalPromptText}", featuring a custom logo design, coordinated typography system, brand tagline, and unified visual identity seamlessly printed or embossed across all products and packaging.`;
        }

        const bgInstruction = activeBackgroundless
          ? ' The backdrop MUST be a pure, flat, uniform solid white (#FFFFFF) studio void with zero ground shadow or reflections, cleanly isolating the branding products.'
          : (useCustomBackground ? ` The backdrop surface and primary brand accent color should harmonize beautifully with the user-selected background tone ${backgroundColor}.` : '');

        finalPrompt = `${basePersona}

[SUBJECT / BRANDING CONCEPT]
Imagined Brand & Company Concept to design: "${finalPromptText}"
Create a stunning, professional brand visual identity and product showcase for this imagined company/concept.

[VISUAL IDENTITY STYLE & LOGO DESIGN]
Aesthetic: ${styleDetails}.
Design a distinctive, memorable logo mark and typographic identity perfectly suited for "${finalPromptText}".

[PRODUCTS & MOCKUP COMPOSITION]
Composition: ${mockupDetails}.
Every item in the scene must feel cohesive, showing off products containing the imagined brand with authentic materials, realistic reflections, textures, and impeccable commercial photography execution.

[STUDIO ENVIRONMENT & LIGHTING]
Environment: ${lightingDetails}.${bgInstruction}

[TYPOGRAPHY & BRANDING APPLICATION]
${textInstruction}

[THEME & EXTRAS]
${themeInstruction}
Include a small easter-egg subtle yin-yang symbol cleverly integrated as a tiny emblem or watermark on one of the products.`;
      } else if (finalMode === 'wes_anderson') {
        let styleDesc = '';
        const bgClause = activeBackgroundless
          ? 'isolated on a pure seamless solid white (#FFFFFF) studio void with zero ground shadow'
          : (useCustomBackground ? `on a backdrop of solid color hex ${backgroundColor}` : 'on a clean aesthetic backdrop');
        if (wesAndersonStyle === 'whimsical-drawing') {
          styleDesc = `a charming, whimsical architectural hand-drawing and line art illustration in the signature Wes Anderson aesthetic, featuring delicate fountain pen line work, flat 2D elevation cutaway perspective, meticulous nostalgic details, dead-center axial symmetry, and a rich nostalgic color palette (mustard yellow, dusty rose, olive green, warm cream, powder blue) ${bgClause}`;
        } else if (wesAndersonStyle === 'vintage-collage' || wesAndersonStyle === 'pastel-collage') {
          styleDesc = `an eccentric handcrafted vintage cutout paper collage inspired by Wes Anderson art books, featuring layered cut-out magazine clippings, antique textbook illustrations, textured paper scraps, rich nostalgic print tones (open colorway including warm ochres, deep teals, burnt oranges, soft creams, and muted pinks), neatly arranged in a perfectly symmetrical flat-lay grid composition with subtle drop shadows between paper layers ${bgClause}`;
        } else {
          styleDesc = `an iconic cinematic Wes Anderson storybook tableau scene, featuring immaculate dead-center 1-point axial symmetry, flat frontal orthographic camera angle, diorama dollhouse visual framing, knolled nostalgic props, quirky deadpan character framing, warm nostalgic cinematic color grading (mustard, sage, coral, dusty blue), and meticulous theatrical symmetry`;
        }

        let textInstruction = '';
        if (wesAndersonTextAmount === 'none') {
          textInstruction = 'Rules: NO text, NO labels, NO typography of any kind. The image must be completely purely visual.';
        } else if (wesAndersonTextAmount === 'labels') {
          textInstruction = 'Include neat, elegant retro label-maker tags or typewriter labels neatly aligned in the composition to identify key elements or terms in clean Futura or retro typewriter typography.';
        } else {
          textInstruction = 'Include a bold, beautifully centered retro title header in classic Wes Anderson Futura or serif typography across the top or center of the composition.';
        }

        finalPrompt = `${basePersona}

[SUBJECT / CORE CONCEPT]
Topic to explicitly illustrate: "${finalPromptText}"
(Ensure the image clearly, literally, and accurately depicts this concept, action, or object within a whimsical Wes Anderson world. Make the primary subject the absolute focus of the image).

[ART STYLE & COMPOSITION]
Create a signature Wes Anderson masterpiece: ${styleDesc}. The composition MUST embody Wes Anderson's signature director hallmarks: strict horizontal and axial symmetry, flat orthographic perspective, meticulous theatrical framing, and obsessive visual balance.

[TEXT INSTRUCTIONS]
${textInstruction}

[THEME & EXTRAS]
${themeInstruction}
Include a small easter-egg perfectly shaped yin-yang cleverly hidden within the symmetrical patterns or decor.`;
      } else if (finalMode === 'esl') {
        let styleDesc = '';
        if (eslIllustrationStyle === 'vibrant-flat') styleDesc = 'modern flat vector illustration, clean solid shapes, vibrant crisp vector art';
        else if (eslIllustrationStyle === 'retro-crayon') styleDesc = 'charming retro crayon and colored pencil sketch style, soft textured hand-drawn lines';
        else styleDesc = '3D isometric digital vector art, clean volumetric layouts, modern corporate tech illustration style';

        let textInstruction = '';
        if (eslTextAmount === 'none') textInstruction = 'Do NOT include any text, words, or labels in the image.';
        else if (eslTextAmount === 'little') textInstruction = 'Include only very little text: just the target phrase or a short 1-2 word label integrated beautifully.';
        else if (eslTextAmount === 'full') textInstruction = 'Include the target phrase and a short, clear definition visually in beautiful typography.';
        
        const bgInstruction = getSmartBgInstruction('The background should be clean and complementary to the artwork.');
        
        finalPrompt = `${basePersona}

[SUBJECT / CORE CONCEPT]
Topic to explicitly illustrate: "${finalPromptText}"
(Ensure the image clearly, literally, and accurately depicts this concept, action, or object. Make the primary subject the absolute focus of the image).

[ART STYLE & COMPOSITION]
Create a very high quality, vibrant educational illustration with beautiful, popping colors. Style: ${styleDesc}. ${bgInstruction} The artwork itself should contrast clearly against this backdrop. Design it specifically for ESL students to visually explain this concept clearly.

[TEXT INSTRUCTIONS]
${textInstruction}

[THEME & EXTRAS]
${themeInstruction}
Include a small easter-egg perfectly shaped yin-yang.`;
      } else if (finalMode === 'doc') {
        let styleDesc = '';
        if (docPageStyle === 'vintage-dictionary') styleDesc = 'authentic vintage printed dictionary sheet with double column guides, yellowed paper edge';
        else if (docPageStyle === 'clean-handwritten') styleDesc = 'clean modern teacher notebook page with casual handwriting, light blue grid lines';
        else styleDesc = 'medieval illuminated manuscript style, decorative initial capital letter, ornate gilded borders';

        let textInstruction = docTextAmount === 'short' || (payload && payload.mode === 'doc') ? 'Include only a short, punchy definition or brief example sentence.' : 'Include a clear dictionary definition and one highly contextual example sentence. Ensure all spelling is 100% accurate.';
        const bgInstruction = activeBackgroundless
          ? 'The background MUST be a pure, flat, uniform solid white (#FFFFFF) studio void with zero shadows, cleanly isolating the dictionary page element.'
          : (useCustomBackground ? `The background MUST be exactly the color hex ${backgroundColor} while maintaining a subtle paper texture.` : 'The background should maintain an authentic dictionary page paper texture.');
        
        finalPrompt = `${basePersona}

[SUBJECT / CORE CONCEPT]
Topic to explicitly illustrate: "${finalPromptText}"
(Ensure the image clearly, literally, and accurately depicts this concept, action, or object. Make the primary subject the absolute focus of the image).

[ART STYLE & COMPOSITION]
Create a dictionary page visual aid in style: ${styleDesc}. ${bgInstruction} In the image, include the title word 'DIGTIONARY' (make SURE it is spelled with a 'G', not a 'C'). It MUST be positioned at the very bottom center of the page and styled as a debossed (pressed into the paper) element, while retaining its spectrum colors. Do NOT write "fun dictionary" or any extraneous titles. The main focus is the target concept, accompanied by fully colored, beautiful illustrations that explain it.

[TEXT INSTRUCTIONS]
${textInstruction}

[THEME & EXTRAS]
${themeInstruction}
Include a small easter-egg perfectly shaped yin-yang.`;
      } else if (finalMode === 'embroidery') {
        let stitchDesc = '';
        if (embroideryStitch === 'thick-yarn') stitchDesc = 'heavy physical wool yarn, thick crewel-work threads, tufted dimensional textures';
        else if (embroideryStitch === 'dense-cross-stitch') stitchDesc = 'highly ordered tiny cross-stitch needlepoint embroidery, geometric grid textile texture';
        else stitchDesc = 'delicate high-sheen satin stitch fillings, glossy silk threads, tight neat borders';

        const textInstruction = embroideryTextAmount === 'none' ? 'Important restrictions: No visible words, letters, numbers, captions, signs, labels, subtitles, logos, watermarks, or typography inside the image. No flat vector style. No plastic 3D render look. No exact copyrighted characters. No clean digital poster look.' : 'Include beautiful stylized stitched text representing the target phrase, woven naturally into the fabric. The text must look like physical embroidery, using satin stitches or chain stitches. No flat vector style. No plastic 3D render look. No exact copyrighted characters. No clean digital poster look.';
        finalPrompt = `${basePersona}

[SUBJECT / CORE CONCEPT]
Topic to explicitly illustrate: "${finalPromptText}"
(Ensure the image clearly, literally, and accurately depicts this concept, action, or object. Make the primary subject the absolute focus of the image).

[ART STYLE & COMPOSITION]
Create a stunning macro shot of a beautiful, impressive embroidered textile artwork. Stitch style uses ${stitchDesc}. The image should look like a real handcrafted embroidery piece photographed very close up, not a flat digital illustration. Use highly visible thread texture, raised satin stitches, chain stitches, French knots, felt appliqué, tufted yarn, braided thread borders, dense stitched fills, fabric grain, tiny loose fibers, and slight imperfections that make it feel handmade and tactile. Style: cute vintage cartoon embroidery, inspired by the expressive energy of classic animated cartoons: oversized eyes, soft rounded faces, exaggerated facial expressions, playful body language, warm humor, bright saturated colors, and charming storybook composition. Composition: macro photography, shallow depth of field, close framing, rich textile relief, foreground stitches sharply detailed, background softly blurred. The scene should feel like a tiny embroidered diorama or patchwork story scene sewn onto fabric. Use layered depth. Lighting: warm soft studio lighting, gentle highlights on threads, realistic shadows between raised stitches, cozy handmade atmosphere. Color palette: bright but tasteful cartoon colors, warm reds, golden yellows, soft blues, cream thread, teal, purple, green, and orange accents. Character design: original cute cartoon character with big oval embroidered eyes, black stitched pupils with tiny highlights. The character should be made entirely from thread and fabric, not painted. Embroidery details to emphasize: satin-stitch fur or clothing texture, chain-stitch outlines, raised felt-like appliqué pieces, braided rope-like borders, French-knot dots, visible woven fabric background, slightly fuzzy thread fibers, dimensional layered stitching. Camera: ultra-detailed macro lens, shallow depth of field, 1:1 square crop, high-resolution, crisp thread detail, realistic textile relief. Visual storytelling: represent the meaning clearly through action, objects, and expression.

[TEXT INSTRUCTIONS]
${textInstruction}

[THEME & EXTRAS]
${themeInstruction}
Include a small easter-egg perfectly shaped cleverly-stitched yin-yang somewhere.`;
      } else if (finalMode === 'stitched') {
        let bannerStyleDesc = '';
        if (stitchedBannerStyle === 'felt-board') bannerStyleDesc = 'tactile felt-board layout with soft fuzzy cutout shapes, warm felt textures';
        else if (stitchedBannerStyle === 'quilted-tapestry') bannerStyleDesc = 'traditional quilted fabric patchwork tapestry, soft puffy borders, textured fabric squares';
        else bannerStyleDesc = 'homespun rough canvas panel, thick linen weave backdrop, rustic frayed borders';

        let textInstruction = '';
        if (stitchedTextAmount === 'none') textInstruction = 'Rules: Absolutely NO text, words, or labels. Purely visual composition. No watermarks or logos. Keep everything classroom-friendly, charming, warm, and visually organized.';
        else if (stitchedTextAmount === 'titles') textInstruction = 'Rules: Only include the bold retro block lettering title. No messy text, no watermarks, no logos unless specifically requested. Keep everything classroom-friendly, charming, readable, warm, and visually organized. If text appears, it must be clean, intentional, and perfectly spelled.';
        else if (stitchedTextAmount === 'full') textInstruction = 'Rules: Include the bold block title and beautifully readable stitched or stamped text for labels/explanations. No messy text, no watermarks, no logos unless specifically requested. Keep everything classroom-friendly, charming, readable, warm, and visually organized. If text appears, it must be clean, intentional, and perfectly spelled.';
        finalPrompt = `${basePersona}

[SUBJECT / CORE CONCEPT]
Topic to explicitly illustrate: "${finalPromptText}"
(Ensure the image clearly, literally, and accurately depicts this concept, action, or object. Make the primary subject the absolute focus of the image).

[ART STYLE & COMPOSITION]
Create a polished educational illustration in a "stitched grammar workshop" aesthetic with theme: ${bannerStyleDesc}, inspired by handmade embroidery, cross-stitch patterns, vintage classroom posters, and cozy web-design UI. Art style: tactile stitched-paper design, soft textile collage, subtle embroidery details, cross-stitch logic, grid-paper background, warm cream canvas, beige woven fabric texture, visible thread fibers, sewn seams, dashed stitch borders, slightly imperfect handmade alignment, layered paper cutouts, fabric appliqué shapes, and gentle shadowing that makes every element feel physically placed on a craft table. Visual mood: warm, clever, handmade, playful but premium, retro educational workshop energy, like an ESL grammar poster made from fabric, cardboard, yarn, thread, and carefully cut paper labels. Background: light beige graph paper mixed with linen texture, faint square grid lines, subtle fabric grain, slightly aged paper tone, soft vignette, no harsh white areas. Use horizontal stitched guide lines, dashed borders, and faint sewing-pattern marks to organize the layout. Typography style: bold retro block lettering, chunky geometric letters, vintage workshop label typography, monospaced stamped text, embroidered title patches, paper-strip labels, and carefully underlined key words with thread-like strokes. Text should feel printed, sewn, or stamped onto fabric, not digitally flat. Color palette: warm cream, toasted beige, dark coffee brown, muted caramel, faded pink stitch accents, dusty blue, soft red-orange, mustard yellow, teal, grass green, violet, and magenta. Use rainbow-spectrum accents sparingly, especially on title letters or small grammar highlights. Composition: clean educational poster layout with strong visual hierarchy. Use boxed sections, fabric tabs, paper labels, underlines, arrows, plus signs, and small stitched icons. Keep the layout symmetrical but slightly handmade, with tiny rotations and natural imperfections. Texture details: raised satin stitches, visible thread ridges, embroidery borders, tiny loose fibers, paper grain, fabric weave, soft shadows under cards, slightly frayed edges, dashed seam outlines, faint pencil/grid construction marks, and subtle ink bleed on printed areas. Design language: premium ESL learning website aesthetic, combining cozy handmade craft with modern clean UI. The image should feel like a screenshot from a beautifully designed interactive grammar workshop, but rendered as a tactile stitched poster. Quality: high-resolution, sharp details, soft ambient lighting, premium editorial finish, tactile handmade texture.

[TEXT INSTRUCTIONS]
${textInstruction}

[THEME & EXTRAS]
${themeInstruction}
Include a small easter-egg perfectly shaped cleverly-stitched yin-yang somewhere.`;
      } else if (finalMode === 'comic') {
        let styleDesc = '';
        if (comicStyleVariant === 'retro-halftone') styleDesc = 'vintage 1960s pop art halftone comic dot matrix, slightly aged paper color, warm retro ink colors';
        else if (comicStyleVariant === 'manga-ink') styleDesc = 'sleek Japanese manga ink line art, rich speed lines, detailed black-and-white hatching, occasional warm color overlays';
        else styleDesc = 'modern indie webcomic style, smooth hand-drawn vector outlines, soft pastel gradients, cozy casual design';

        let textInstruction = '';
        if (comicTextAmount === 'none') textInstruction = 'Absolutely NO speech bubbles, captions, or text. Entirely visual storytelling.';
        else if (comicTextAmount === 'short') textInstruction = 'Keep text minimal: use a tiny caption or a single short speech bubble with just the target phrase.';
        else if (comicTextAmount === 'dialogue') textInstruction = 'Include punchy comic dialogue in speech bubbles that naturally uses the target phrase in context.';
        finalPrompt = `${basePersona}

[SUBJECT / CORE CONCEPT]
Topic to explicitly illustrate: "${finalPromptText}"
(Ensure the image clearly, literally, and accurately depicts this concept, action, or object. Make the primary subject the absolute focus of the image).

[ART STYLE & COMPOSITION]
Create a professional comic book or graphic novel style scene in style: ${styleDesc} (1 to 2 panels max) that puts the target concept into a clear visual context. Show the *meaning* through character action.

[TEXT INSTRUCTIONS]
${textInstruction}

[THEME & EXTRAS]
${themeInstruction}
Include a small easter-egg perfectly shaped yin-yang.`;
      } else if (finalMode === 'collage') {
        let styleDesc = '';
        if (collageStyleVariant === 'analog-torn') styleDesc = 'rough analog torn newsprint, heavy vintage paper textures, hand-cut photos, physical layer overlapping';
        else if (collageStyleVariant === 'retro-catalogue') styleDesc = '1950s Sears-style catalogue scrapbooking, retro consumer illustrations, faded sepia advertisements';
        else styleDesc = 'minimalist modern kraft-paper collage, clean cardboard geometric slices, understated craft paper tones';

        let textInstruction = collageTextAmount === 'none' ? 'Do NOT include any AI font text or clear labels.' : 'Include the target phrase assembled creatively using real cut-out magazine letters, ransom-note style, or vintage analog typography embedded physically within the collage layers.';
        finalPrompt = `${basePersona}

[SUBJECT / CORE CONCEPT]
Topic to explicitly illustrate: "${finalPromptText}"
(Ensure the image clearly, literally, and accurately depicts this concept, action, or object. Make the primary subject the absolute focus of the image).

[ART STYLE & COMPOSITION]
Create a highly creative, real-life mixed-media collage art style image in style: ${styleDesc}. Use layered torn paper, vintage magazine clippings, textures, and analog elements to visually express the concept.

[TEXT INSTRUCTIONS]
${textInstruction}

[THEME & EXTRAS]
${themeInstruction}
Include a small easter-egg perfectly shaped yin-yang tucked into the collage.`;
      } else if (finalMode === 'split') {
        let layoutDesc = '';
        if (splitLayoutType === 'horizontal-diptych') layoutDesc = 'horizontal diptych layout split top-to-bottom';
        else if (splitLayoutType === 'diagonal-slice') layoutDesc = 'dynamic diagonal split-screen layout cutting corner-to-corner';
        else layoutDesc = 'classic clean side-by-side vertical split-screen layout divided perfectly down the middle';

        let textInstruction = splitTextAmount === 'none' ? 'Do not use any labels or text.' : 'Use stark contrasting text labels embedded in each side of the split screen ("Literal" and "Actual Meaning", plus the phrase).';
        finalPrompt = `${basePersona}

[SUBJECT / CORE CONCEPT]
Topic to explicitly illustrate: "${finalPromptText}"
(Ensure the image clearly, literally, and accurately depicts this concept, action, or object. Make the primary subject the absolute focus of the image).

[ART STYLE & COMPOSITION]
Create a visual split-screen using a ${layoutDesc}. Left/Top side: playfully depict the literal translation of the words. Right/Bottom side: depict the actual idiomatic/figurative meaning in action.

[TEXT INSTRUCTIONS]
${textInstruction}

[THEME & EXTRAS]
${themeInstruction}
Include a small easter-egg perfectly shaped yin-yang.`;
      } else if (finalMode === 'infographic') {
        let styleDesc = '';
        if (infographicStyle === 'minimalist-swiss') styleDesc = 'sleek minimalist Swiss-style graphic design, stark sans-serif typography, grid alignment, flat uniform colors';
        else if (infographicStyle === 'hand-drawn-schematic') styleDesc = 'loose hand-drawn sketchbook engineering schematic, chalky guidelines, technical pencil notations';
        else styleDesc = 'vibrant volumetric 3D isometric infographic layout, glowing data hubs, elegant floating charts';

        const textInstruction = infographicTextAmount === 'short' 
          ? 'Include only a succinct explanation or short text label.' 
          : 'Include a more elaborate text explanation, grammar rules, or detailed relationships mapping.';
        finalPrompt = `${basePersona}

[SUBJECT / CORE CONCEPT]
Topic to explicitly illustrate: "${finalPromptText}"
(Ensure the image clearly, literally, and accurately depicts this concept, action, or object. Make the primary subject the absolute focus of the image).

[ART STYLE & COMPOSITION]
Create a highly clean and structural visual diagram or infographic in style: ${styleDesc}. This is specifically for spatial prepositions, grammar rules, or relationships. Use graphic arrows, geometry, or flowcharts demonstrating the rule or relationship visually.

[TEXT INSTRUCTIONS]
${textInstruction}

[THEME & EXTRAS]
${themeInstruction}
Include a small easter-egg perfectly shaped yin-yang.`;
      } else if (finalMode === 'flashcard') {
        let cardStyleDesc = '';
        if (flashcardStyle === 'bold-minimalist') cardStyleDesc = 'bold minimalist graphic flashcard with crisp geometric layouts and high contrast primary shapes';
        else if (flashcardStyle === '3d-claymorphic') cardStyleDesc = 'playful modern 3D claymorphic card, rounded glossy clay shapes, soft volumetric bevels';
        else cardStyleDesc = 'vintage nostalgic paper school flashcard, weathered card stock, slightly rounded worn corners';
        
        let textInstruction = '';
        if (flashcardTextAmount === 'none') textInstruction = 'Do NOT include any text, typography, or labels in the image - strictly visual.';
        else if (flashcardTextAmount === 'short') textInstruction = 'Include only very short text: just the target phrase or a small label.';
        else if (flashcardTextAmount === 'free') textInstruction = 'Include the target phrase and free text or sentences visually integrated into the flashcard.';
        
        const bgInstruction = getSmartBgInstruction('The background should be a neutral studio surface or subtle soft gradient.');
        
        finalPrompt = `${basePersona}

[SUBJECT / CORE CONCEPT]
Topic to explicitly illustrate: "${finalPromptText}"
(Ensure the image clearly, literally, and accurately depicts this concept, action, or object. Make the primary subject the absolute focus of the image).

[ART STYLE & COMPOSITION]
Create a stunning render of an educational card in style: ${cardStyleDesc}, resting on a surface or creatively framed. EVERY generation MUST have a distinct frame, border, or physical bounding box to look exactly like a flashcard object. ${bgInstruction} Center the target subject visually as an adorable 3D claymation style or crisp flat vector art.

[TEXT INSTRUCTIONS]
${textInstruction}

[THEME & EXTRAS]
${themeInstruction}
Include a small easter-egg perfectly shaped yin-yang.`;
      } else if (finalMode === 'icon') {
        let styleDesc = '';
        if (iconStyle === 'skeuomorphic-glass') styleDesc = 'premium 3D skeuomorphic glassmorphic app icon, translucent glossy refractions, soft physical shadows';
        else if (iconStyle === 'vibrant-isometric') styleDesc = 'vibrant volumetric 3D isometric app icon, glowing elements, highly detailed digital modeling';
        else styleDesc = 'sleek high-contrast modern flat vector icon, elegant minimal geometries, dramatic solid shadows';

        let textInstruction = iconTextAmount === 'off' ? 'Do NOT include any text, letters, or words.' : 'Include the target phrase clearly as text integrated below or around the icon.';
        const bgInstruction = getSmartBgInstruction('The background should be a clean neutral backdrop.');
        
        finalPrompt = `${basePersona}

[SUBJECT / CORE CONCEPT]
Topic to explicitly illustrate: "${finalPromptText}"
(Ensure the image clearly, literally, and accurately depicts this concept, action, or object. Make the primary subject the absolute focus of the image).

[ART STYLE & COMPOSITION]
Create a sleek, highly modern icon in style: ${styleDesc}. ${bgInstruction} The icon should be highly visual, with rich dynamic colors, brilliant shading, and high-quality crafted details. DO NOT use plain monochrome minimalism—make it vibrant and punchy.

[TEXT INSTRUCTIONS]
${textInstruction}

[THEME & EXTRAS]
${themeInstruction}
Include a small easter-egg perfectly shaped yin-yang.`;
      } else if (finalMode === 'mnemonic') {
        let styleDesc = '';
        if (mnemonicStyle === 'dali-surrealist') styleDesc = 'Salvador Dali inspired surrealist oil painting, melting clocks, vast desert horizons, long dramatic shadows';
        else if (mnemonicStyle === 'playful-cartoon') styleDesc = 'playful retro 90s cartoon, high-contrast expressive lines, silly character expressions, bright wacky colors';
        else styleDesc = 'neo-noir surreal dreamscape, dark atmospheric mood, neon glowing highlights, mysterious hazy streets';

        let textInstruction = mnemonicTextAmount === 'none' ? 'Do not include any text. The memory hook must be purely visual.' : 'Ingeniously integrate the text of the phrase directly into the surreal objects (e.g., words formed out of parts of the dreamscape).';
        finalPrompt = `${basePersona}

[SUBJECT / CORE CONCEPT]
Topic to explicitly illustrate: "${finalPromptText}"
(Ensure the image clearly, literally, and accurately depicts this concept, action, or object. Make the primary subject the absolute focus of the image).

[ART STYLE & COMPOSITION]
Create a Surreal Mnemonic Memory Hook in style: ${styleDesc}. The goal is maximum retention through a bizarre, highly memorable visual association. Blend the literal meaning and the figurative meaning of the phrase into a dream-like, mildly absurd but beautiful situational pun. Avoid standard depictions. Make it visually striking, surprising, and emotionally resonant.

[TEXT INSTRUCTIONS]
${textInstruction}

[THEME & EXTRAS]
${themeInstruction}
Include a small easter-egg perfectly shaped yin-yang.`;
      } else if (finalMode === 'storybook') {
        let styleDesc = '';
        if (storybookStyle === 'vintage-watercolor') styleDesc = 'gentle vintage children watercolor illustration, soft washed sepia paper texture, cozy Beatrix Potter style';
        else if (storybookStyle === 'classic-gilded-age') styleDesc = 'classic Victorian golden age fairytale illustration, intricate line art, rich cross-hatched details, glowing gold leaf accents';
        else styleDesc = 'modern Nordic folk art style, flat stenciled geometric motifs, earthy rustic colors, cozy woodcut print textures';

        let textInstruction = storybookTextAmount === 'none' ? 'Pure illustration. Zero text. Story told through environment alone.' : 'Include a beautifully typeset classic storybook sentence at the bottom of the page, laying out the target phrase in context.';
        finalPrompt = `${basePersona}

[SUBJECT / CORE CONCEPT]
Topic to explicitly illustrate: "${finalPromptText}"
(Ensure the image clearly, literally, and accurately depicts this concept, action, or object. Make the primary subject the absolute focus of the image).

[ART STYLE & COMPOSITION]
Create a beautifully gentle and expressive illustration in style: ${styleDesc}. Visually tell a heartwarming or clear story that unmistakably demonstrates the meaning of the phrase in action. The art should be welcoming, slightly nostalgic, and highly legible.

[TEXT INSTRUCTIONS]
${textInstruction}

[THEME & EXTRAS]
${themeInstruction}
Include a small easter-egg perfectly shaped yin-yang.`;
      } else if (finalMode === 'cinematic') {
        let lightingDesc = '';
        if (cinematicLightingStyle === 'neon-noir') lightingDesc = 'intense cyberpunk neon-noir lighting, high-contrast futuristic violet and teal reflections, rainy atmospheric night streets';
        else if (cinematicLightingStyle === 'golden-hour') lightingDesc = 'ethereal golden hour light, majestic long warm rays, atmospheric particles, sweeping emotional nostalgia';
        else lightingDesc = 'moody low-key chiaroscuro studio lighting, extreme shadow depths, dramatic single key-light focus';

        let textInstruction = '';
        if (cinematicTextAmount === 'none') textInstruction = 'Absolutely NO text. Pure cinematic establishing shot.';
        else if (cinematicTextAmount === 'title') textInstruction = 'Prominently feature the target phrase as the massive, bold cinematic movie title.';
        else if (cinematicTextAmount === 'poster') textInstruction = 'Create a full movie poster with the phrase as the title, a witty tagline, and a realistic studio billing block at the bottom.';
        finalPrompt = `${basePersona}

[SUBJECT / CORE CONCEPT]
Topic to explicitly illustrate: "${finalPromptText}"
(Ensure the image clearly, literally, and accurately depicts this concept, action, or object. Make the primary subject the absolute focus of the image).

[ART STYLE & COMPOSITION]
Create an epic, high-budget Hollywood blockbuster movie poster or still where the visual heavily features the situation or emotional weight of the phrase. Style features lighting: ${lightingDesc}. Make the subject matter dramatic and compelling. Let the cinematic lighting and mood explain the concept.

[TEXT INSTRUCTIONS]
${textInstruction}

[THEME & EXTRAS]
${themeInstruction}
Include a small easter-egg perfectly shaped yin-yang.`;
      } else if (finalMode === 'papercraft') {
        let depthDesc = '';
        if (papercraftDepth === 'layered-origami') depthDesc = 'multi-layered delicate folded origami sheets, sharp clean folds, lightweight dimensional layout';
        else if (papercraftDepth === 'deep-shadowbox') depthDesc = 'deep shadowbox miniature theater layout, extreme physical layer-depth, heavy casting shadows';
        else depthDesc = 'charming flat felt-cutout patchwork layers, fuzzy card textures, soft thick craft sheets';

        let textInstruction = papercraftTextAmount === 'none' ? 'Zero text. The diorama must be completely text-free.' : 'Include charming little paper-tag labels, physically cut from paper and tied with string, bearing the target phrase.';
        finalPrompt = `${basePersona}

[SUBJECT / CORE CONCEPT]
Topic to explicitly illustrate: "${finalPromptText}"
(Ensure the image clearly, literally, and accurately depicts this concept, action, or object. Make the primary subject the absolute focus of the image).

[ART STYLE & COMPOSITION]
Create a Tactile Papercraft Diorama in style: ${depthDesc}. Render the concept using a beautiful, multi-layered cut-paper art style. Show physical depth using distinct paper textures, realistic cast shadows between layers, and origami-like folds. The scene should feel like a physical, tangible miniature theater box.

[TEXT INSTRUCTIONS]
${textInstruction}

[THEME & EXTRAS]
${themeInstruction}
Include a small easter-egg perfectly shaped yin-yang.`;
      } else if (finalMode === 'pixelart') {
        let styleDesc = '';
        if (pixelartStyle === 'retro-8bit') styleDesc = 'classic retro 8-bit NES style, restricted primary pixel palette, nostalgic arcade tile grid';
        else if (pixelartStyle === 'gorgeous-16bit') styleDesc = 'gorgeous 16-bit SNES JRPG scenery, rich detailed tilework, lush pixels, soft environmental pixel shading';
        else styleDesc = 'modern cyberpunk isometric pixel grid, detailed micro pixel lights, sleek dark retro-tech tiles';

        let textInstruction = '';
        if (pixelartTextAmount === 'none') textInstruction = 'No UI or text. Just the pure pixel art world.';
        else if (pixelartTextAmount === 'dialog-box') textInstruction = 'Include a classic retro blue or black JRPG text box at the bottom, spelling out the target phrase as NPC dialogue.';
        else if (pixelartTextAmount === 'floating') textInstruction = 'Display the target phrase as floating pixelated arcade-style text (like a "Level Up" pop-up) right above the action.';
        finalPrompt = `${basePersona}

[SUBJECT / CORE CONCEPT]
Topic to explicitly illustrate: "${finalPromptText}"
(Ensure the image clearly, literally, and accurately depicts this concept, action, or object. Make the primary subject the absolute focus of the image).

[ART STYLE & COMPOSITION]
Create a Retro RPG scene in style: ${styleDesc}. The image should feature nostalgic, crisp pixel art reminiscent of classic 90s adventure games or Japanese RPGs (JRPGs). Show a clear, game-like scenario, action, or object that visually teaches the target phrase. The blocky, pixelated style should make the vocabulary feel like a fun quest.

[TEXT INSTRUCTIONS]
${textInstruction}

[THEME & EXTRAS]
${themeInstruction}
Include a small easter-egg perfectly shaped yin-yang.`;
      } else if (finalMode === 'vangogh') {
        let strokeDesc = '';
        if (vanGoghStroke === 'impasto') {
          strokeDesc = 'thick, heavy impasto brushstrokes, deep sculptural paint ridges, raised ridges of wet paint, capturing physical paint depth and rich 3D texture, creating a highly tactile canvas.';
        } else if (vanGoghStroke === 'swirling') {
          strokeDesc = 'turbulent swirling brushstrokes, rhythmic spiral patterns of light, energetic expressive dashes, highly dynamic and flowing visual currents, expressive post-impressionist movement.';
        } else {
          strokeDesc = 'classic expressive dabs, visible directional strokes, masterfully layered oil paint, blending colors directly on the canvas to form the scenery.';
        }

        let paletteDesc = '';
        if (vanGoghPalette === 'starry') {
          paletteDesc = 'Inspired by Starry Night: dominant deep cobalt blues, indigo night skies, electric yellow crescent moons, glowing warm yellow stars, and dark cypress silhouettes.';
        } else if (vanGoghPalette === 'sunflowers') {
          paletteDesc = 'Inspired by Sunflowers: vibrant warm golds, brilliant sunflowers yellow, ochres, glowing rich ambers, soft toasted tans, and touches of sage green.';
        } else if (vanGoghPalette === 'turbulent') {
          paletteDesc = 'Inspired by Wheatfield with Crows: dramatic dark turbulent teal skies, bright golden fields, stark contrasting dirt paths, heavy emotional atmosphere, vivid deep primary pigments.';
        } else {
          paletteDesc = 'Inspired by Café Terrace: warm orange gaslight, cool deep blue cafe corner, starry southern sky, elegant lilac reflections, rich olive greens, and bright cobblestone reflections.';
        }

        let textInstruction = '';
        if (vangoghTextAmount === 'signature') textInstruction = 'Discreetly integrate the target phrase styled as a red or brown physical artist signature "Vincent" or the phrase in the bottom right corner.';
        else if (vangoghTextAmount === 'caption') textInstruction = 'Include the target phrase clearly as if stencil-captioned neatly on a rustic wooden canvas tab below the painting.';

        finalPrompt = `${basePersona}

[SUBJECT / CORE CONCEPT]
Topic to explicitly illustrate: "${finalPromptText}"
(Ensure the image clearly, literally, and accurately depicts this concept, action, or object. Make the primary subject the absolute focus of the image).

[ART STYLE & COMPOSITION]
Create a breathtaking, heavy oil painting as if Vincent van Gogh had been reincarnated today and painted this scene himself with his own hands. The painting MUST look freshly painted, with glistening wet oil pigments, rich dimensional texture, and prominent canvas grain. Visual content: clearly explain the vocabulary word through Van Gogh's signature post-impressionistic dramatic composition. Stroke style: ${strokeDesc} Color palette: ${paletteDesc}.

[TEXT INSTRUCTIONS]
${textInstruction}

[THEME & EXTRAS]
${themeInstruction}
Include a small easter-egg perfectly shaped yin-yang integrated into the swirling oil paint patterns.`;
      } else if (finalMode === 'rembrandt') {
        let lightDesc = '';
        if (rembrandtLighting === 'chiaroscuro') {
          lightDesc = 'masterful pure chiaroscuro, extreme dramatic contrast between deep abyssal shadows and a single brilliant raking light source, shadows bleeding into the pitch-black background.';
        } else if (rembrandtLighting === 'soft-glow') {
          lightDesc = 'a warm, ethereal interior glow, soft golden hour lighting fading beautifully into rich warm darker browns, luminescent skin tones or focal points.';
        } else {
          lightDesc = 'a sharp dramatic spotlight effect, theater-like focus falling heavily on the main subject leaving the edges completely engulfed in darkness, heavy baroque drama.';
        }

        let textureDesc = '';
        if (rembrandtTexture === 'rough-impasto') {
          textureDesc = 'rough, thick impasto application on highlights, heavily built up layers of oil paint on the brightest spots, scumbled dry brush effects on edges.';
        } else if (rembrandtTexture === 'glazed') {
          textureDesc = 'smooth, deep translucent glazes, polished and softly rendered details with a rich liquid appearance glowing from within.';
        } else {
          textureDesc = 'an aged, cracked antique canvas, rich earth tones seeping into the weave, oxidized historical oil paint, museum-quality masterpiece patina.';
        }

        let textInstruction = '';
        if (rembrandtTextAmount === 'gilded') textInstruction = 'Write the target phrase inside a gorgeous gilded golden museum frame plate mounted beneath the historical painting.';
        else if (rembrandtTextAmount === 'monogram') textInstruction = 'Incorporate the phrase in a dark brown classical handwritten monogram lettering inside the paint background.';

        finalPrompt = `${basePersona}

[SUBJECT / CORE CONCEPT]
Topic to explicitly illustrate: "${finalPromptText}"
(Ensure the image clearly, literally, and accurately depicts this concept, action, or object. Make the primary subject the absolute focus of the image).

[ART STYLE & COMPOSITION]
Create a breathtaking, classical oil painting as if Rembrandt van Rijn masterfully painted this scene himself during the Dutch Golden Age. The painting MUST look like a historical masterpiece of the 17th century baroque era. Visual content: elegantly explain the vocabulary word through Rembrandt's signature style. Lighting setup: ${lightDesc} Texture details: ${textureDesc}.

[TEXT INSTRUCTIONS]
${textInstruction}

[THEME & EXTRAS]
${themeInstruction}
Include a small easter-egg perfectly shaped yin-yang integrated into the deep shadows or golden highlights.`;
      } else if (finalMode === 'chalkboard') {
        let paletteDesc = '';
        if (chalkboardPalette === 'multicolor') {
          paletteDesc = 'vibrant multicolored chalks (pastel blues, soft pinks, light yellows, and mint green)';
        } else if (chalkboardPalette === 'white-only') {
          paletteDesc = 'classic minimalist white chalk only, with beautiful variations in pressure, shading, and powder dusting';
        } else {
          paletteDesc = 'vivid retro neon chalks (fluorescent cyan, glowing hot pink, electric yellow, and lime green) that jump off the dark slate';
        }

        let styleDesc = '';
        if (chalkboardStyle === 'traditional-classroom') styleDesc = 'classic green primary school blackboard with light wooden frame, eraser dust smudges';
        else if (chalkboardStyle === 'mathematical-draft') styleDesc = 'highly precise mathematical dark charcoal slate board, coordinate grids, complex mechanical sketches';
        else styleDesc = 'spacious university amphitheater black slate wall, rich chalk notes, arrows, extensive diagrams';

        let textInstruction = '';
        if (chalkboardTextAmount === 'none') textInstruction = 'Strictly DO NOT include any text or words - purely visual chalk illustrations explaining the concept.';
        else if (chalkboardTextAmount === 'titles-only') textInstruction = 'Include only the bold main title in neat block capital chalk.';
        else if (chalkboardTextAmount === 'full-diagram') textInstruction = 'Include extensive, highly detailed hand-written chalk notes, anatomical arrows, labels, and helpful explanatory notes.';

        finalPrompt = `${basePersona}

[SUBJECT / CORE CONCEPT]
Topic to explicitly illustrate: "${finalPromptText}"
(Ensure the image clearly, literally, and accurately depicts this concept, action, or object. Make the primary subject the absolute focus of the image).

[ART STYLE & COMPOSITION]
Create a beautifully organized, highly educational diagram on a real chalkboard in style: ${styleDesc}. The board should have realistic chalk dust smudges, partially erased slate textures, and a frame. The content MUST show detailed visual anatomy or structural breakdown of the vocabulary word, fully drawn and labeled in chalk using ${paletteDesc}. Every word, line, arrow, and illustration should look hand-drawn with physical chalk texture (featuring visible powder grains, scumbled chalk shading, and slightly weathered dry strokes). Include clean, legible handwriting, graphic indicators, and conceptual drawings.

[TEXT INSTRUCTIONS]
${textInstruction}

[THEME & EXTRAS]
${themeInstruction}
Include a small easter-egg chalk-drawn yin-yang in the corner of the chalkboard.`;
      } else if (finalMode === 'mouth_guide') {
        let styleDesc = '';
        if (mouthGuideStyle === 'full-cross-section') {
          styleDesc = 'a detailed, elegant sagittal medical cross-section showing tongue placement, teeth alignment, palate contact, vocal cords, and active breathing airflow arrows';
        } else if (mouthGuideStyle === 'front-3d') {
          styleDesc = 'a highly stylized, beautiful front-facing close-up 3D render of a mouth showing expressive lip shaping, jaw aperture, and teeth alignment';
        } else {
          styleDesc = 'a simplified, charming, minimalist cartoon schematic diagram of lips, teeth, and tongue positions';
        }

        let colorDesc = '';
        if (mouthGuideColorStyle === 'clinical-neon') colorDesc = 'clean surgical clinic aesthetic, glowing neon cyan and hot pink highlight lines showing air flow';
        else if (mouthGuideColorStyle === 'vintage-medical') colorDesc = '19th century medical handbook, aged beige paper texture, soft ink hatchings, pastel wash overlays';
        else colorDesc = 'friendly primary school crayon style, soft textured colors, warm hand-drawn pencil accents';

        let textInstruction = '';
        if (mouthGuideTextAmount === 'none') textInstruction = 'Do NOT write any labels or words, focus 100% on the mouth and breathing diagrams.';
        else if (mouthGuideTextAmount === 'phonetic-label') textInstruction = 'Include phonetic symbols (IPA) and the target word in a neat modern textbook block.';
        else if (mouthGuideTextAmount === 'full-anatomical') textInstruction = 'Include clear anatomical labels with arrows pointing to the vocal chords, tongue, hard palate, and lip placement, ensuring absolute clarity.';

        finalPrompt = `${basePersona}

[SUBJECT / CORE CONCEPT]
Topic to explicitly illustrate: "${finalPromptText}"
(Ensure the image clearly, literally, and accurately depicts this concept, action, or object. Make the primary subject the absolute focus of the image).

[ART STYLE & COMPOSITION]
Create a stunning, premium educational phonetic guide focusing on English pronunciation in color palette: ${colorDesc}. The visual MUST center on ${styleDesc} to teach students exactly how to shape their mouth, lips, or tongue to pronounce the target word and phonetics. Surround the central diagram with a beautiful, clean textbook layout on a soft minimalist background, featuring helpful vector guides, arrows showing airflow direction, and stylized vocal sound wave vibrations.

[TEXT INSTRUCTIONS]
${textInstruction}

[THEME & EXTRAS]
${themeInstruction}
Include a tiny hidden yin-yang somewhere in the phonetics icon or sound wave.`;
      } else if (finalMode === 'synonym_scale') {
        let scaleDesc = synonymScaleSteps === '3-steps' ? '3 distinct progressive stages' : '5 incremental, progressive stages';
        
        let styleDesc = '';
        if (synonymScaleStyle === 'vibrant-gradient-cards') styleDesc = 'modern glassy translucent gradient cards, vibrant flowing color transitions, glossy UI headers';
        else if (synonymScaleStyle === 'playful-cartoon') styleDesc = 'charming cartoon storyboard strip, highly expressive cute character, comical progression';
        else styleDesc = 'understated industrial ruler or thermometer gauge style, sharp mechanical tick marks, high precision minimalist dial';

        let textInstruction = '';
        if (synonymScaleTextAmount === 'none') textInstruction = 'Do not include any words on the scale, show progress purely visually.';
        else if (synonymScaleTextAmount === 'scale-levels') textInstruction = 'Label each step with its corresponding synonym word ranging from weakest to strongest intensity.';
        else if (synonymScaleTextAmount === 'detailed-definitions') textInstruction = 'Label each step with the synonym word AND a tiny, beautifully spelled one-sentence example of its specific shade of meaning.';

        finalPrompt = `${basePersona}

[SUBJECT / CORE CONCEPT]
Topic to explicitly illustrate: "${finalPromptText}"
(Ensure the image clearly, literally, and accurately depicts this concept, action, or object. Make the primary subject the absolute focus of the image).

[ART STYLE & COMPOSITION]
Create a gorgeous semantic intensity spectrum chart or comparative scale in style: ${styleDesc}. The image MUST depict a progressive gradient timeline scale showing the intensity of the word relative to its synonyms (e.g., from mild to extreme, or cold to freezing to arctic). It should feature ${scaleDesc}, with a cute, highly expressive character or distinct situation illustrated inside each step showing the progressive change. Use a clean modern dashboard timeline layout, clear visual transitions, dynamic background gradients, and sleek graphical bars or sliders. Highly educational and visually intuitive.

[TEXT INSTRUCTIONS]
${textInstruction}

[THEME & EXTRAS]
${themeInstruction}
Include a small easter-egg yin-yang somewhere on the slider dial.`;
      } else if (finalMode === 'cutaway') {
        let styleDesc = '';
        if (cutawayStyle === 'blueprint-blue') {
          styleDesc = 'a gorgeous deep blueprint-cyan blue background with bright white and cyan architectural drafting lines, like a classic technical blueprint';
        } else if (cutawayStyle === 'sketchbook') {
          styleDesc = 'a warm, slightly textured vintage artist sketchbook page with delicate graphite pencil lines, technical grid guides, and light ink washes';
        } else {
          styleDesc = 'an aged, sepia-toned antique blueprint with a rich historical parchment paper texture, copperplate cursive script, and weathered edges';
        }

        let subjectDesc = '';
        if (cutawaySubjectType === 'mechanical-gears') subjectDesc = 'complex internal mechanical clockwork gears, physical springs, volumetric wheels, and metallic levers';
        else if (cutawaySubjectType === 'natural-geology') subjectDesc = 'cross-section geology layers, underground tree roots, fossil layers, crystalline formations, and soil horizons';
        else subjectDesc = 'architectural structural layers, interior room cutouts, physical floor frames, and structural supports';

        let textInstruction = '';
        if (cutawayTextAmount === 'none') textInstruction = 'Do NOT write any labels or callout texts, show the internal structural detail purely visually.';
        else if (cutawayTextAmount === 'technical-labels') textInstruction = 'Include neat, tiny educational technical labels with lines pointing to different layers or components.';
        else if (cutawayTextAmount === 'detailed-specifications') textInstruction = 'Include detailed specifications, measurements, structural parameters, and explanatory annotations on the margin.';

        finalPrompt = `${basePersona}

[SUBJECT / CORE CONCEPT]
Topic to explicitly illustrate: "${finalPromptText}"
(Ensure the image clearly, literally, and accurately depicts this concept, action, or object. Make the primary subject the absolute focus of the image).

[ART STYLE & COMPOSITION]
Create a masterpiece technical drafting diagram or detailed labeled cutaway. The visual style should be ${styleDesc}. The subject matter MUST be a fascinating, highly detailed cutaway showing the inner workings, internal components, layers, or structural parts of: ${subjectDesc}. Include beautiful, clean labeled parts, measurements, tiny pointers, architectural arrows, and precise cross-section drafts. The composition should look incredibly crafted, intellectual, and detailed.

[TEXT INSTRUCTIONS]
${textInstruction}

[THEME & EXTRAS]
${themeInstruction}
Include a tiny yin-yang integrated into one of the technical dials, gears, or cross-section layers.`;
      } else if (finalMode === 'action_sequence') {
        let panelsDesc = actionSequenceLayout === 'three-panels' ? 'three horizontal sequential story panels' : 'four panels arranged in a neat 2x2 storyboard grid';
        
        let styleDesc = '';
        if (actionSequenceStyle === 'vintage-comic') styleDesc = 'vintage 1970s newspaper comic strip, soft warm halftone coloring, hand-inked retro outlines';
        else if (actionSequenceStyle === 'modern-line-vector') styleDesc = 'sleek modern line vector art, minimalist colorful fills, pristine contemporary website graphics';
        else styleDesc = 'soft cozy watercolorStoryboard illustrations, delicate pencil lines, blended liquid pigments, charming narrative tone';

        let textInstruction = '';
        if (actionSequenceTextAmount === 'none') textInstruction = 'Absolutely no captions or text inside the story panels.';
        else if (actionSequenceTextAmount === 'captions-only') textInstruction = 'Include a small, neat caption label at the bottom of each panel describing the action simply.';
        else if (actionSequenceTextAmount === 'full-narration') textInstruction = 'Include an elegant storyteller narration box in each panel detailing the characters thoughts and actions.';

        finalPrompt = `${basePersona}

[SUBJECT / CORE CONCEPT]
Topic to explicitly illustrate: "${finalPromptText}"
(Ensure the image clearly, literally, and accurately depicts this concept, action, or object. Make the primary subject the absolute focus of the image).

[ART STYLE & COMPOSITION]
Create a beautiful, clean storyboard sequence with exactly ${panelsDesc} in style: ${styleDesc}. The panels must show a clear step-by-step cause and effect, chronological action, or progressive narrative that illustrates the verb, adverb, or concept perfectly. Each panel should have a subtle border and show a continuous, humorous, or heartwarming action with consistent characters. Style: highly polished modern illustration with warm friendly colors, soft shadows, and clean lines. No complex speech bubbles, but panels must be clear and logical.

[TEXT INSTRUCTIONS]
${textInstruction}

[THEME & EXTRAS]
${themeInstruction}
Include a small easter-egg yin-yang hidden in one of the panels.`;
      } else if (finalMode === 'etymology') {
        let styleDesc = '';
        if (etymologyStyle === 'ancient-scroll') {
          styleDesc = 'an ancient, majestic scholarly scroll with delicate hand-drawn botanical ink lines, classical calligraphy, and warm light reflecting on aged parchment';
        } else if (etymologyStyle === 'vibrant-infographic') {
          styleDesc = 'a sleek modern educational vector illustration of a stylized growing plant with crisp gradients, clean lines, and vibrant contemporary colors';
        } else {
          styleDesc = 'a beautiful vintage botanical sketch or textbook plate, with hand-colored watercolor details and scientific ink drawings';
        }

        let branchDesc = '';
        if (etymologyBranchLayout === 'majestic-oak') branchDesc = 'a massive majestic oak tree with sprawling woody roots and thick leafy branches carrying words';
        else if (etymologyBranchLayout === 'stylized-vining') branchDesc = 'a beautifully stylized growing vining ivy, winding green shoots, delicate leaf stems hosting terms';
        else branchDesc = 'a symmetrical geometric genealogy radial tree, sharp structural branches expanding outwards like a wheel';

        let textInstruction = '';
        if (etymologyTextAmount === 'none') textInstruction = 'Show only the roots and trunk relationships without word letters.';
        else if (etymologyTextAmount === 'root-and-words') textInstruction = 'Clearly label the ancient historical root word on the trunk, and derivative modern English words on each primary branch.';
        else if (etymologyTextAmount === 'exhaustive-notes') textInstruction = 'Include the main root, modern words, AND detailed historical timeline milestones detailing how the pronunciation changed from Latin/Germanic to modern times.';

        finalPrompt = `${basePersona}

[SUBJECT / CORE CONCEPT]
Topic to explicitly illustrate: "${finalPromptText}"
(Ensure the image clearly, literally, and accurately depicts this concept, action, or object. Make the primary subject the absolute focus of the image).

[ART STYLE & COMPOSITION]
Create an inspiring visual root-word etymology tree designed as: ${branchDesc}. The trunk should represent the historical Latin, Greek, or Old Germanic root word, while the branches gracefully grow outwards to spawn derivative modern English words. Each branch must feature a beautiful, clear visual emblem or miniature illustration that explains the meaning of that specific branch's word. The overall design should be structured as ${styleDesc}. Extremely informative, majestic, and visually fascinating.

[TEXT INSTRUCTIONS]
${textInstruction}

[THEME & EXTRAS]
${themeInstruction}
Include a small easter-egg yin-yang incorporated into the roots or leaves of the tree.`;
      } else if (finalMode === 'preposition') {
        let styleDesc = '';
        if (prepositionStyle === 'architectural-3d') styleDesc = 'highly precise clean 3D architectural blueprint blueprint layout, fine line rendering of rooms, clear isometric projections';
        else if (prepositionStyle === 'playful-isometric') styleDesc = 'vibrant colorful 3D isometric cutaway bedroom room, clear transparent walls, playful toy objects, cozy modern lighting';
        else styleDesc = 'abstract geometric vector composition, clean colorful spheres, perfect cubes, and glowing rings floating in 3D';

        let textInstruction = '';
        if (prepositionTextAmount === 'none') textInstruction = 'Do NOT include any text or arrows - purely visual spatial relationships.';
        else if (prepositionTextAmount === 'arrows-only') textInstruction = 'Include clear graphical directional arrows labeled with corresponding prepositions like "INTO", "OUT OF", "ABOVE", "THROUGH", "BETWEEN".';
        else if (prepositionTextAmount === 'full-sentences') textInstruction = 'Include clear, elegant educational banner strips at the bottom with a short, complete sentence explaining each spatial relationship.';

        const bgInstruction = getSmartBgInstruction('The scene should take place in a clean, uncluttered visual setting.');

        finalPrompt = `${basePersona}

[SUBJECT / CORE CONCEPT]
Topic to explicitly illustrate: "${finalPromptText}"
(Ensure the image clearly, literally, and accurately depicts this concept, action, or object. Make the primary subject the absolute focus of the image).

[ART STYLE & COMPOSITION]
Create a Spatial Preposition Map in style: ${styleDesc}. The goal of this educational graphic is to visually teach preposition concepts (e.g. on, under, behind, through, between, next to). ${bgInstruction} Depict a charming character or cute object positioned in various spatial arrangements relative to furniture or shapes, making the spatial prepositions immediately obvious and intuitive.

[TEXT INSTRUCTIONS]
${textInstruction}

[THEME & EXTRAS]
${themeInstruction}
Include a small easter-egg perfectly shaped yin-yang somewhere.`;
      } else if (finalMode === 'morphology') {
        let styleDesc = '';
        if (morphologyStyle === 'wooden-blocks') styleDesc = 'beautiful interlocking physical wooden toy blocks, detailed grain texture, letters printed or carved on each block, nested together';
        else if (morphologyStyle === 'glowing-modular') styleDesc = 'futuristic glowing modular tech blocks, neon slots, translucent high-tech modules interlocking';
        else styleDesc = 'vintage metal and wood letterpress movable typeface blocks, rustic ink splatters, tactile metallic textures';

        let textInstruction = '';
        if (morphologyTextAmount === 'none') textInstruction = 'Show only the word parts without descriptive tags.';
        else if (morphologyTextAmount === 'morphemes-only') textInstruction = 'Label each block category clearly as "PREFIX", "ROOT", or "SUFFIX" to teach morphological boundaries.';
        else if (morphologyTextAmount === 'etymology-notes') textInstruction = 'Include clear morphological tags, plus a small beautifully typeset paper tag underneath explaining the meaning of the affixes.';

        finalPrompt = `${basePersona}

[SUBJECT / CORE CONCEPT]
Topic to explicitly illustrate: "${finalPromptText}"
(Ensure the image clearly, literally, and accurately depicts this concept, action, or object. Make the primary subject the absolute focus of the image).

[ART STYLE & COMPOSITION]
Create a Morphological Word Block diagram in style: ${styleDesc}. The goal is to break down a complex vocabulary word into its morpheme building blocks (Prefix, Root, Suffix) as physical interlocking puzzle segments or slots. The arrangement should make the structure of the word incredibly clear and satisfying to learn. Keep the background clean and minimalist.

[TEXT INSTRUCTIONS]
${textInstruction}

[THEME & EXTRAS]
${themeInstruction}
Include a small easter-egg perfectly shaped yin-yang.`;
      } else if (finalMode === 'collocation') {
        let styleDesc = '';
        if (collocationStyle === 'mindmap-bubbles') styleDesc = 'sleek glossy glassmorphic bubbles floating, connected to a central bubble with glowing colorful silk lines';
        else if (collocationStyle === 'chalk-web') styleDesc = 'charming chalk-drawn web layout on a blackboard, friendly arrows, hand-sketched connector lines';
        else styleDesc = 'minimalist ultra-modern high-contrast node network vector diagram, geometric nodes, pristine digital connections';

        let textInstruction = '';
        if (collocationTextAmount === 'none') textInstruction = 'Do not write any phrases, only show the central node connected to visual objects.';
        else if (collocationTextAmount === 'words-only') textInstruction = 'In each connected node, clearly display a common collocating word (e.g. if target is "Decision", show collocations like "MAKE a decision", "TOUGH decision", "REACH a decision").';
        else if (collocationTextAmount === 'example-sentences') textInstruction = 'Display the collocating words, and underneath each word, write a small natural example sentence demonstrating the collocation in action.';

        const bgInstruction = getSmartBgInstruction('The background should be a clean, subtle mindmap canvas.');

        finalPrompt = `${basePersona}

[SUBJECT / CORE CONCEPT]
Topic to explicitly illustrate: "${finalPromptText}"
(Ensure the image clearly, literally, and accurately depicts this concept, action, or object. Make the primary subject the absolute focus of the image).

[ART STYLE & COMPOSITION]
Create a gorgeous Collocation Mindmap Web in style: ${styleDesc}. The visual should place the target English concept at the absolute center node of the network, with beautiful branches webbing out to show its most common collocations (verbs, nouns, or adjectives that naturally go together with it). ${bgInstruction} High educational value and immaculate visual composition.

[TEXT INSTRUCTIONS]
${textInstruction}

[THEME & EXTRAS]
${themeInstruction}
Include a small easter-egg perfectly shaped yin-yang.`;
      }

      if (isEslExplainer) {
        let focusText = '';
        let strictNoText = false;

        if (eslExplainerFocus === 'depiction') {
          focusText = 'Focus strictly on a PURE VISUAL DEPICTION without any text whatsoever. NO words, NO labels, NO letters, NO text. The visual scene, character actions, objects, and relationships must be so vivid, clear, and intuitive that they self-explain the target vocabulary, phrase, collocation, or idiom instantly for ESL students.';
          strictNoText = true;
        } else if (eslExplainerFocus === 'contrast') {
          focusText = 'Focus explicitly on contrasting information, opposite traits, side-by-side comparative elements, or clear visual antitypes that highlight the core difference clearly for ESL students.';
        } else if (eslExplainerFocus === 'definition') {
          focusText = 'Focus explicitly on a clear, memorable visual definition and core meaning diagram with high pedagogical clarity.';
        } else if (eslExplainerFocus === 'difference') {
          focusText = 'Focus explicitly on showing visual contrast, before/after differences, or side-by-side distinctions between related concepts.';
        } else if (eslExplainerFocus === 'expression') {
          focusText = 'Focus explicitly on illustrating the figurative vs literal context of the English expression or idiom with clever visual cues.';
        } else {
          focusText = 'Auto-detect the pedagogical structure of the topic (whether a single word definition, a difference, a contrast, or an expression/idiom) and automatically generate the optimal ESL classroom visual teaching aid that makes the language concept instantly intuitive.';
        }

        const bgRequirement = activeBackgroundless
          ? '- BACKGROUND REQUIREMENT: The background MUST be a pure, flat, uniform solid white (#FFFFFF) seamless studio void with zero shadows, isolating only the teaching subject.'
          : (useCustomBackground 
            ? `- BACKGROUND REQUIREMENT: The backdrop MUST be a clean, uniform, distraction-free solid color of hex ${backgroundColor} (the custom background color).`
            : '- BACKGROUND REQUIREMENT: The backdrop should be a clean, uncluttered visual setting that highlights the teaching elements.');

        const textOverrideRule = strictNoText 
          ? '- STRICT TEXT OVERRIDE: PURE VISUAL DEPICTION MODE IS ACTIVE. Do NOT write any words, labels, letters, or typography anywhere in the image. Rely 100% on pure visual storytelling and intuitive graphic metaphors.'
          : '- TEXT GUIDANCE: Keep any text minimal, accurate, and highly legible for English learners.';

        finalPrompt += ` \n\n[ILLUSTRATIVE ESL EXPLAINER MODE ACTIVE:
- PEDAGOGICAL PURPOSE: Transform this artwork into a dedicated, highly illustrative ESL teaching graphic focused on explaining definitions, differences, contrasts, or expressions.
${bgRequirement}
- EXPLAINER FOCUS: ${focusText}
${textOverrideRule}
- ART ENGINE INTEGRATION: Seamlessly blend this clear educational explanation into the visual aesthetic of the chosen engine (${finalMode}). Ensure high educational value, high visual charm, and immediate clarity for English learners.]`;
      }

      if (photoLightData) {
        finalPrompt += ` \n\n[PHOTOGRAPHIC LIGHTING OVERRIDE: ${photoLightData.prompt} Do not add generic windows or ambient daylight unless explicitly asked. The shadows and highlights MUST obey this lighting placement exactly.]`;
      } else if (lightProps) {
        const alt = parseInt(lightProps.altitude);
        const az = parseInt(lightProps.azimuth);
        const prox = parseFloat(lightProps.tension);
        const lum = parseInt(lightProps.lumens);
        const beam = parseInt(lightProps.beamAngle || '360');
        const intensityPct = parseInt(lightProps.intensity || '75');
        const colorK = parseInt(lightProps.colorTemp || '5600');

        let distanceDesc = '';
        if (prox < 1.0) distanceDesc = 'placed extremely close to the subject, creating a rapid sharp drop-off into darkness';
        else if (prox < 4.0) distanceDesc = 'placed at a standard studio distance from the subject';
        else if (prox < 8.0) distanceDesc = 'positioned far away from the subject, casting long and consistent rays';
        else distanceDesc = 'acting as a distant environmental light source (like the sun)';

        let directionDesc = '';
        if (prox >= 1.0) {
          if (az >= 337.5 || az < 22.5) directionDesc = 'placed dead behind the subject (backlighting/rim lighting), casting shadows straight forward towards the viewer';
          else if (az >= 22.5 && az < 67.5) directionDesc = 'placed far to the back-right of the subject, illuminating the right rim and casting shadows to the front-left';
          else if (az >= 67.5 && az < 112.5) directionDesc = 'placed directly on the right side. This perfectly illuminates the right side of the subject, casting deep horizontal shadows to the left';
          else if (az >= 112.5 && az < 157.5) directionDesc = 'placed in the front-right, illuminating the front and right, casting shadows nicely to the back-left';
          else if (az >= 157.5 && az < 202.5) directionDesc = 'placed dead-center in front of the subject (co-linear with the camera), flattening shadows directly behind the subject';
          else if (az >= 202.5 && az < 247.5) directionDesc = 'placed in the front-left, illuminating the front and left, casting shadows nicely to the back-right';
          else if (az >= 247.5 && az < 292.5) directionDesc = 'placed directly on the left side. This perfectly illuminates the left side of the subject, casting deep horizontal shadows to the right';
          else if (az >= 292.5 && az < 337.5) directionDesc = 'placed far to the back-left of the subject, illuminating the left rim and casting shadows to the front-right';
        } else {
          directionDesc = 'radiating from the exact center of the subject/image outward in all directions';
        }

        let altitudeDesc = '';
        if (alt >= 75) altitudeDesc = 'placed directly overhead (zenith), shining straight down, casting shadows directly underneath';
        else if (alt >= 40) altitudeDesc = 'elevated at a high top-down 45-degree angle, typical of classic portrait lighting';
        else if (alt >= 15) altitudeDesc = 'positioned at a low angle near the ground, casting incredibly long stretched cinematic shadows';
        else altitudeDesc = 'placed physically on the floor level, highlighting every surface bump and casting infinite horizontal shadows';

        let colorDesc = '';
        if (colorK < 3200) colorDesc = `extremely warm, orange/amber light (${colorK}K)`;
        else if (colorK < 4500) colorDesc = `warm golden light (${colorK}K)`;
        else if (colorK < 5500) colorDesc = `neutral white daylight (${colorK}K)`;
        else if (colorK < 7500) colorDesc = `cool, slightly blue daylight (${colorK}K)`;
        else colorDesc = `icy, deep blue light (${colorK}K)`;

        let intensityDesc = '';
        if (intensityPct >= 90) intensityDesc = `blindingly intense at ${intensityPct}% power (approx ${lum} lumens), blowing out highlights`;
        else if (intensityPct >= 60) intensityDesc = `very strong and clear at ${intensityPct}% power, producing high-contrast exposure`;
        else if (intensityPct >= 30) intensityDesc = `moody and subdued at ${intensityPct}% power, pushing the scene towards low-key`;
        else intensityDesc = `extremely dim and barely visible at ${intensityPct}% power, relying on absolute darkness`;

        let beamDesc = '';
        if (beam <= 30) beamDesc = `focused through a very tight, narrow snoot/laser spotlight (${beam}° spread), isolating only a tiny circular spotlight on the subject while the rest of the room is pitch black`;
        else if (beam <= 90) beamDesc = `shaped into a directional cone (${beam}° spread), illuminating the subject deliberately like a flashlight or theater spot`;
        else if (beam <= 180) beamDesc = `acting as a broad wash of light (${beam}°), smoothly lighting the main area without hard edges`;
        else beamDesc = `an unshielded omnidirectional source (full ${beam}°), scattering light evenly everywhere`;

        let modifierDesc = '';
        if (lightProps.modifiers && lightProps.modifiers.length > 0) {
          modifierDesc = `The aesthetic style of this light explicitly uses these modifiers: ${lightProps.modifiers.join(', ')}.`;
        }

        setIsDigestingLight(true);
        setLightingDigest(null);
        try {
          const digestPrompt = `You are a Master Prompt Engineer for an Image Generation model (like Imagen 3 or Midjourney).
The user has configured a custom lighting setup. Image models respond terribly to math and physics, but respond brilliantly to explicit positional descriptions and photography terms.

Your job is to translate the following configuration into an aggressive, brilliantly described 2-sentence lighting prompt. 
It must explicitly forbid the model from adding unwanted extra light sources (like a sunny window, unless requested).

Base Request: "${finalPromptText}"
Lighting Location & Direction: The light is ${distanceDesc}. It is ${directionDesc}.
Height/Angle: The light is ${altitudeDesc}.
Color/Temperature: The light is ${colorDesc}.
Intensity & Spread: The light is ${intensityDesc}, and is ${beamDesc}.
Modifiers: ${modifierDesc || 'No specific modifiers.'}

TASK: Return ONLY the photographic lighting instructions. DO NOT talk about "math", "azimuth", "lumens". Just describe the final visual outcome, telling the image generator EXACTLY where the dominant light source is located in the 3D space of the picture, where the shadows point, how strong it is, and what color temperature it burns at. Use language like "A single extreme warm spotlight placed on the floor to the left, casting huge shadows to the right. The rest of the scene is plunged into darkness..."
Ensure the prompt commands the model to make this the ONLY or PRIMARY light source.`;
          
          const digestRes = await ai.models.generateContent({
             model: 'gemini-3.5-flash',
             contents: digestPrompt
          });
          const translatedPhysics = digestRes.text || "Cinematic lighting strictly aligned to the configured setup.";
          setLightingDigest(translatedPhysics);
          
          finalPrompt += ` \n\n[CRITICAL LIGHTING AND SHADING OVERRIDE: ${translatedPhysics.trim()} Do not add generic windows or ambient daylight unless explicitly asked. The shadows and highlights MUST obey this lighting placement exactly.]`;
        } catch(e) {
          console.error("Digest error", e);
          finalPrompt += ` \n\n[CRITICAL LIGHTING OVERRIDE: The lighting must be described as follows: Distance: ${distanceDesc}. Direction: ${directionDesc}. Altitude: ${altitudeDesc}. Color: ${colorDesc}. Intensity: ${intensityDesc}. Spread: ${beamDesc}. Modifiers: ${modifierDesc}. This must be the only lighting source.]`;
        } finally {
          setIsDigestingLight(false);
        }
      }

      if (referenceImage) {
        let roleGuidance = '';
        if (referenceRole === 'character') {
          roleGuidance = 'Carefully preserve and translate the character likeness, identity, facial features, and subject silhouette from the visual reference image into the generated artwork.';
        } else if (referenceRole === 'theme') {
          roleGuidance = 'Adopt the thematic world-building, emotional atmosphere, visual motifs, and scenery cues from the visual reference image into this generation.';
        } else if (referenceRole === 'style') {
          roleGuidance = 'Adopt the overall artistic style, brushstrokes, texture, lighting mood, and visual aesthetic of the visual reference image.';
        } else if (referenceRole === 'palette') {
          roleGuidance = 'STRICT COLOR PALETTE EXTRACTION: Carefully analyze and extract the distinct color palette (dominant tones, primary hues, secondary accents, shades, and overall chromatic harmony) from the uploaded visual reference image. The generated image MUST strictly adopt and apply this exact color palette across the subjects, background, lighting, and materials of the composition.';
        } else {
          roleGuidance = 'Use the visual reference image as the primary inspiration for character identity, theme, stylistic mood, color scheme, and composition.';
        }
        finalPrompt += ` \n\n[VISUAL REFERENCE INSPIRATION & GUIDANCE]: A visual reference image is provided. ${roleGuidance} Seamlessly harmonize and render it within the requested "${finalMode}" engine style and prompt concept.`;
      }

      if (activeBackgroundless) {
        let edgeStylePrompt = '';
        if (transparentCutoutStyle === 'sticker') {
          edgeStylePrompt = 'Render a clean, crisp, solid white die-cut vinyl sticker decal contour around the entire outer silhouette boundary of the subject, exactly like a physical sticker.';
        } else if (transparentCutoutStyle === 'feather') {
          edgeStylePrompt = 'Render the subject with smooth, naturally anti-aliased studio edges that cleanly separate from the background without harsh clipping.';
        } else {
          edgeStylePrompt = 'Render the outer silhouette perimeter of the subject razor-sharp, distinct, high-contrast, and pristine, ensuring crisp separation for alpha cutout extraction.';
        }

        finalPrompt += ` \n\n[CRITICAL UNIVERSAL BACKGROUNDLESS ENGINE DIRECTIVE:
- TARGET SUBJECT ISOLATION: The prompt describes: "${finalPromptText}". Even if the prompt mentions backgrounds, locations, rooms, environments, skies, landscapes, surfaces, floors, walls, or scenic surroundings, you MUST DISCARD all background scenery and isolate ONLY the core subject(s), characters, creatures, actions, or focal items described.
- ART STYLE PRESERVATION: Fully preserve and amplify the signature aesthetic of the active mode (${finalMode}) on the subject itself, but keep the subject strictly isolated as an independent studio cutout asset.
- BACKDROP VOID REQUIREMENT: The background behind the subject MUST be 100% pure, solid, flat, seamless white (#FFFFFF) with zero texture, zero gradient, and zero environmental clutter. Even if a background color was specified elsewhere, OVERRIDE IT with pure solid white (#FFFFFF) void.
- ABSOLUTE ZERO DROP SHADOWS: NO ground cast shadows, NO floor contact shadows, NO ambient occlusion puddles, and NO surface reflections. The subject must appear cleanly suspended or floating in front of the pure white void.
- EDGE SILHOUETTE DEFINITION: ${edgeStylePrompt}
- TRANSPARENCY READINESS: This image will undergo immediate automated alpha-channel extraction to produce a transparent PNG asset. Any background clutter, floor shadows, or scenery will ruin the cutout; therefore, maintain an absolute pure white studio key void.]`;
      }

      const requestPromises = Array.from({ length: finalCount }).map(async (_, idx) => {
        try {
          const parts: any[] = [{ text: finalPrompt }];
          if (referenceImage) {
            parts.push({
              inlineData: {
                mimeType: referenceImage.mimeType || 'image/png',
                data: referenceImage.base64
              }
            });
          }

          const response = await ai.models.generateContent({
            model: imageModel,
            contents: {
              parts: parts,
            },
            config: {
              imageConfig: {
                aspectRatio: (payload && payload.count === 2) ? '3:4' : aspectRatio,
                imageSize: finalSize
              }
            },
          });
          
          let newImageStr = '';
          response.candidates?.forEach(candidate => {
            candidate.content?.parts?.forEach(part => {
              if (part.inlineData) {
                newImageStr = `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
              }
            });
          });
          
          if (newImageStr) {
            if (activeBackgroundless) {
              try {
                newImageStr = await removeBackgroundFromDataUrl(newImageStr, {
                  style: transparentCutoutStyle,
                  tolerance: transparentTolerance,
                  feather: 2.5,
                  clearCavities: true
                });
              } catch (bgErr) {
                console.error("Auto background removal failed, falling back to base image", bgErr);
              }
            }
            return newImageStr;
          } else if (idx === 0) {
              throw new Error("No image data returned from the model.");
          }
          return null;
        } catch (e: any) {
          console.error(`Generation error:`, e);
          if (idx === 0) throw e;
          return null;
        }
      });

      const generatedImages = (await Promise.all(requestPromises)).filter(img => img !== null) as string[];
      if (generatedImages.length > 0) {
        setResultImages(generatedImages);
        setHistory(prev => {
          const newHistory = [{
            id: Date.now().toString(),
            prompt: finalPromptText,
            images: generatedImages,
            timestamp: Date.now()
          }, ...prev];
          const trimmedHistory = newHistory.slice(0, 10);
          set('generation_history', trimmedHistory).catch(console.error);
          return trimmedHistory;
        });
      }

    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred during generation.');
    } finally {
      setIsGenerating(false);
    }
  };

  const dataUrlToBlob = (dataUrl: string): Blob | null => {
    if (!dataUrl) return null;
    try {
      const parts = dataUrl.split(',');
      if (parts.length < 2) return null;
      const mimeMatch = parts[0].match(/:(.*?);/);
      const mime = mimeMatch ? mimeMatch[1] : 'image/png';
      const bstr = atob(parts[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    } catch (e) {
      return null;
    }
  };

  const handleImageDragStart = (e: React.DragEvent<HTMLImageElement>, src: string, filename: string) => {
    try {
      if (e.dataTransfer) {
        e.dataTransfer.clearData();
        const blob = dataUrlToBlob(src);
        if (blob) {
          const file = new File([blob], filename, { type: blob.type });
          if (e.dataTransfer.items && e.dataTransfer.items.add) {
            try {
              e.dataTransfer.items.add(file);
            } catch (_) {}
          }
        }
        e.dataTransfer.setData('text/plain', filename);
      }
    } catch (err) {
      console.error("Drag start error:", err);
    }
  };

  const handleRemoveBackgroundOnImage = async (index: number) => {
    const targetImg = resultImages[index];
    if (!targetImg) return;
    try {
      setIsRemovingBgIndex(index);
      const transparentImg = await removeBackgroundFromDataUrl(targetImg, {
        style: transparentCutoutStyle,
        tolerance: transparentTolerance,
        feather: 2.5,
        clearCavities: true
      });
      setResultImages(prev => {
        const next = [...prev];
        next[index] = transparentImg;
        return next;
      });
      setHistory(prev => {
        if (prev.length === 0) return prev;
        const nextHist = [...prev];
        const currentEntry = { ...nextHist[0] };
        if (currentEntry.images && currentEntry.images[index]) {
          const nextImages = [...currentEntry.images];
          nextImages[index] = transparentImg;
          currentEntry.images = nextImages;
          nextHist[0] = currentEntry;
          set('generation_history', nextHist).catch(console.error);
        }
        return nextHist;
      });
    } catch (err: any) {
      console.error("Failed to remove background:", err);
      setError(`Could not remove background: ${err.message || 'Unknown error'}`);
    } finally {
      setIsRemovingBgIndex(null);
    }
  };

  const copyToClipboard = async (imgUrl: string, index: number) => {
    try {
      const getBlobPromise = async (): Promise<Blob> => {
        const response = await fetch(imgUrl);
        let blob = await response.blob();
        if (blob.type === 'image/png') return blob;
        
        const img = new Image();
        img.src = imgUrl; // data URL
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0);
        return new Promise<Blob>((resolve, reject) => {
          canvas.toBlob((b) => {
            if (b) resolve(b);
            else reject(new Error('Canvas to blob failed'));
          }, 'image/png');
        });
      };

      await navigator.clipboard.write([
        new ClipboardItem({
          'image/png': getBlobPromise() as Promise<Blob>
        })
      ]);
      setCopySuccessStates(prev => ({ ...prev, [index]: true }));
      setTimeout(() => setCopySuccessStates(prev => ({ ...prev, [index]: false })), 2000);
    } catch (err: any) {
      console.error('Failed to copy', err);
      setError(`Failed to copy to clipboard: ${err.message || 'Browser permission denied'}`);
    }
  };

  const renderAspectRatioIcon = (ratio: string) => {
    switch (ratio) {
      case '1:1': return <Square className="w-4 h-4 opacity-70" />;
      case '16:9': return <RectangleHorizontal className="w-4 h-4 opacity-70 scale-x-110" />;
      case '9:16': return <RectangleVertical className="w-4 h-4 opacity-70 scale-y-110" />;
      case '4:3': return <RectangleHorizontal className="w-4 h-4 opacity-70" />;
      case '3:4': return <RectangleVertical className="w-4 h-4 opacity-70" />;
      default: return <Square className="w-4 h-4 opacity-70" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-200 selection:bg-cyan-500/30 font-sans flex flex-col">
      <header className="bg-[#0c1220] border-b border-[#1b253b] sticky top-0 z-50 shadow-md">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 h-12 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-8 h-8 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">
              <circle cx="50" cy="50" r="48" fill="#f8fafc" />
              <path d="M50 2 a48 48 0 0 1 0 96 a24 24 0 0 1 0 -48 a24 24 0 0 0 0 -48 z" fill="#0b0f19" />
              <circle cx="50" cy="26" r="7" fill="#0b0f19" />
              <circle cx="50" cy="74" r="7" fill="#f8fafc" />
              <circle cx="50" cy="50" r="48" fill="none" stroke="#1e293b" strokeWidth="2" />
            </svg>
            <h1 className="text-[17px] font-black tracking-tight m-0 leading-none flex gap-[0.5px]">
              {"DIG'S ESL STUDIO".split('').map((char, i) => {
                const colors = ['#ef4444', '#f97316', '#f59e0b', '#10b981', '#06b6d4', '#3b82f6', '#8b5cf6', '#d946ef', '#f43f5e'];
                const color = colors[i % colors.length];
                return (
                  <span 
                    key={i} 
                    style={{ 
                      color: char === ' ' ? 'transparent' : color,
                    }}
                    className={char === ' ' ? 'w-1' : ''}
                  >
                    {char}
                  </span>
                )
              })}
            </h1>
          </div>
          <div className="flex items-center gap-2 group relative">
            <button
              onClick={downloadExtension}
              title="Download Chrome Extension (Auto-generate from clipboard)"
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-1.5 text-[9px] font-bold text-cyan-200 bg-cyan-900/60 px-2 py-1 rounded border border-cyan-500/50 hover:bg-cyan-600 hover:text-white uppercase tracking-wider shadow-[0_0_10px_rgba(6,182,212,0.3)] absolute right-full mr-2 whitespace-nowrap"
            >
              <Download className="w-3 h-3" /> Get Extension
            </button>
            <div className="flex items-center gap-1 bg-slate-950/60 border border-slate-800 p-0.5 rounded-full shadow-inner mr-1 select-none">
              <button
                onClick={() => setImageModel('gemini-3.1-flash-image')}
                className={`px-2.5 py-0.5 text-[9px] font-extrabold rounded-full uppercase tracking-wider transition-all duration-200 ${
                  imageModel === 'gemini-3.1-flash-image'
                    ? 'bg-cyan-500 text-slate-950 shadow-[0_0_6px_rgba(6,182,212,0.3)]'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
                title="Standard Model (gemini-3.1-flash-image)"
              >
                Standard
              </button>
              <button
                onClick={() => setImageModel('gemini-3.1-flash-lite-image')}
                className={`px-2.5 py-0.5 text-[9px] font-extrabold rounded-full uppercase tracking-wider transition-all duration-200 ${
                  imageModel === 'gemini-3.1-flash-lite-image'
                    ? 'bg-amber-500 text-slate-950 shadow-[0_0_6px_rgba(245,158,11,0.3)]'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
                title="Lite Model (gemini-3.1-flash-lite-image)"
              >
                Nano Banana Lite
              </button>
            </div>
            <div className="text-[10px] font-bold text-cyan-300 bg-cyan-900/40 border border-cyan-800/60 px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-inner uppercase tracking-wider relative z-10 cursor-default">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_5px_rgba(34,211,238,1)]"></span>
              SYSTEM ONLINE
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-[1800px] mx-auto px-3 sm:px-4 lg:px-6 py-4 grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Controls (Compact & Sleek) */}
        <div className="lg:col-span-3 space-y-2 flex flex-col">
          
          <div className="flex-1 overflow-y-auto pr-1 stylish-scrollbar space-y-2 pb-2">
            <AnimatePresence mode="wait">
              <motion.div
                key="generate"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.15 }}
                className="space-y-2"
              >
                  <div className="flex flex-col gap-2">
                    <div className="bg-[#111827] rounded-xl p-2 border border-[#1e293b] shadow-lg flex flex-col gap-2">
                      <div>
                        <div
                          className="flex items-center justify-between cursor-pointer"
                          onClick={() => setShowEslCategory(!showEslCategory)}
                        >
                          <label className="text-[9px] font-bold text-cyan-400/80 uppercase tracking-widest mb-1.5 block cursor-pointer">ESL & Educational Engines</label>
                          {showEslCategory ? <ChevronUp className="w-3 h-3 text-cyan-500" /> : <ChevronDown className="w-3 h-3 text-cyan-500" />}
                        </div>
                        <AnimatePresence>
                          {showEslCategory && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="space-y-1 overflow-hidden"
                            >
                              {eslModes.map((mode) => (
                                <button
                                  key={mode.id}
                                  onClick={() => setGenerationMode(mode.id as any)}
                                  onMouseEnter={() => setHoveredMode({ label: mode.label, description: mode.description })}
                                  onMouseLeave={() => setHoveredMode(null)}
                                  onMouseMove={handleMouseMove}
                                  className={`w-full flex items-center gap-2 p-1.5 rounded-lg border text-left transition-all ${
                                    generationMode === mode.id ? 'bg-cyan-900/20 border-cyan-500 shadow-[inset_0_0_15px_rgba(6,182,212,0.15)] text-cyan-100' : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:border-slate-600'
                                  }`}
                                >
                                  <mode.icon className={`w-3.5 h-3.5 shrink-0 ${generationMode === mode.id ? 'text-cyan-400' : 'text-slate-500'}`} />
                                  <div>
                                    <div className="font-semibold text-[11px]">{mode.label}</div>
                                  </div>
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <div className="border-t border-[#1e293b] pt-2">
                        <div
                          className="flex items-center justify-between cursor-pointer"
                          onClick={() => setShowCreativeCategory(!showCreativeCategory)}
                        >
                          <label className="text-[9px] font-bold text-fuchsia-400/80 uppercase tracking-widest mb-1.5 block cursor-pointer">Creative & Artistic Engines</label>
                          {showCreativeCategory ? <ChevronUp className="w-3 h-3 text-fuchsia-500" /> : <ChevronDown className="w-3 h-3 text-fuchsia-500" />}
                        </div>
                        <AnimatePresence>
                          {showCreativeCategory && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="space-y-1 overflow-hidden"
                            >
                              {creativeModes.map((mode) => (
                                <button
                                  key={mode.id}
                                  onClick={() => setGenerationMode(mode.id as any)}
                                  onMouseEnter={() => setHoveredMode({ label: mode.label, description: mode.description })}
                                  onMouseLeave={() => setHoveredMode(null)}
                                  onMouseMove={handleMouseMove}
                                  className={`w-full flex items-center gap-2 p-1.5 rounded-lg border text-left transition-all ${
                                    generationMode === mode.id ? 'bg-fuchsia-900/20 border-fuchsia-500 shadow-[inset_0_0_15px_rgba(217,70,239,0.15)] text-fuchsia-100' : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:border-slate-600'
                                  }`}
                                >
                                  <mode.icon className={`w-3.5 h-3.5 shrink-0 ${generationMode === mode.id ? 'text-fuchsia-400' : 'text-slate-500'}`} />
                                  <div>
                                    <div className="font-semibold text-[11px]">{mode.label}</div>
                                  </div>
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    <ActiveEngineOptionsPanel
                      generationMode={generationMode}
                      backgroundColor={backgroundColor} setBackgroundColor={setBackgroundColor}
                      useCustomBackground={useCustomBackground} setUseCustomBackground={setUseCustomBackground}
                      isBackgroundless={isBackgroundless} setIsBackgroundless={setIsBackgroundless}
                      isEslExplainer={isEslExplainer} setIsEslExplainer={setIsEslExplainer}
                      eslExplainerFocus={eslExplainerFocus} setEslExplainerFocus={setEslExplainerFocus}
                      macroStyleVariant={macroStyleVariant} setMacroStyleVariant={setMacroStyleVariant}
                      silhouetteStyleVariant={silhouetteStyleVariant} setSilhouetteStyleVariant={setSilhouetteStyleVariant}
                      origamiStyleVariant={origamiStyleVariant} setOrigamiStyleVariant={setOrigamiStyleVariant}
                      claymationStyleVariant={claymationStyleVariant} setClaymationStyleVariant={setClaymationStyleVariant}
                      neonStyleVariant={neonStyleVariant} setNeonStyleVariant={setNeonStyleVariant}
                      photoStyleVariant={photoStyleVariant} setPhotoStyleVariant={setPhotoStyleVariant}
                      photoTextAmount={photoTextAmount} setPhotoTextAmount={setPhotoTextAmount}
                      eslIllustrationStyle={eslIllustrationStyle} setEslIllustrationStyle={setEslIllustrationStyle}
                      eslTextAmount={eslTextAmount} setEslTextAmount={setEslTextAmount}
                      docPageStyle={docPageStyle} setDocPageStyle={setDocPageStyle}
                      docTextAmount={docTextAmount} setDocTextAmount={setDocTextAmount}
                      embroideryStitch={embroideryStitch} setEmbroideryStitch={setEmbroideryStitch}
                      embroideryTextAmount={embroideryTextAmount} setEmbroideryTextAmount={setEmbroideryTextAmount}
                      comicStyleVariant={comicStyleVariant as any} setComicStyleVariant={setComicStyleVariant as any}
                      comicTextAmount={comicTextAmount} setComicTextAmount={setComicTextAmount}
                      collageStyleVariant={collageStyleVariant} setCollageStyleVariant={setCollageStyleVariant}
                      collageTextAmount={collageTextAmount} setCollageTextAmount={setCollageTextAmount}
                      splitLayoutType={splitLayoutType} setSplitLayoutType={setSplitLayoutType}
                      splitTextAmount={splitTextAmount} setSplitTextAmount={setSplitTextAmount}
                      infographicStyle={infographicStyle} setInfographicStyle={setInfographicStyle}
                      infographicTextAmount={infographicTextAmount} setInfographicTextAmount={setInfographicTextAmount}
                      flashcardStyle={flashcardStyle as any} setFlashcardStyle={setFlashcardStyle as any}
                      flashcardTextAmount={flashcardTextAmount} setFlashcardTextAmount={setFlashcardTextAmount}
                      iconStyle={iconStyle} setIconStyle={setIconStyle}
                      iconTextAmount={iconTextAmount} setIconTextAmount={setIconTextAmount}
                      mnemonicStyle={mnemonicStyle} setMnemonicStyle={setMnemonicStyle}
                      mnemonicTextAmount={mnemonicTextAmount} setMnemonicTextAmount={setMnemonicTextAmount}
                      storybookStyle={storybookStyle} setStorybookStyle={setStorybookStyle}
                      storybookTextAmount={storybookTextAmount} setStorybookTextAmount={setStorybookTextAmount}
                      cinematicLightingStyle={cinematicLightingStyle} setCinematicLightingStyle={setCinematicLightingStyle}
                      cinematicTextAmount={cinematicTextAmount} setCinematicTextAmount={setCinematicTextAmount}
                      papercraftDepth={papercraftDepth} setPapercraftDepth={setPapercraftDepth}
                      papercraftTextAmount={papercraftTextAmount} setPapercraftTextAmount={setPapercraftTextAmount}
                      pixelartStyle={pixelartStyle} setPixelartStyle={setPixelartStyle}
                      pixelartTextAmount={pixelartTextAmount} setPixelartTextAmount={setPixelartTextAmount}
                      stitchedBannerStyle={stitchedBannerStyle} setStitchedBannerStyle={setStitchedBannerStyle}
                      stitchedTextAmount={stitchedTextAmount} setStitchedTextAmount={setStitchedTextAmount}
                      vanGoghStroke={vanGoghStroke} setVanGoghStroke={setVanGoghStroke}
                      vanGoghPalette={vanGoghPalette} setVanGoghPalette={setVanGoghPalette}
                      vangoghTextAmount={vangoghTextAmount} setVangoghTextAmount={setVangoghTextAmount}
                      rembrandtLighting={rembrandtLighting} setRembrandtLighting={setRembrandtLighting}
                      rembrandtTexture={rembrandtTexture} setRembrandtTexture={setRembrandtTexture}
                      rembrandtTextAmount={rembrandtTextAmount} setRembrandtTextAmount={setRembrandtTextAmount}
                      wesAndersonStyle={wesAndersonStyle} setWesAndersonStyle={setWesAndersonStyle}
                      wesAndersonTextAmount={wesAndersonTextAmount} setWesAndersonTextAmount={setWesAndersonTextAmount}
                      visualIdentityStyle={visualIdentityStyle} setVisualIdentityStyle={setVisualIdentityStyle}
                      visualIdentityMockup={visualIdentityMockup} setVisualIdentityMockup={setVisualIdentityMockup}
                      visualIdentityLighting={visualIdentityLighting} setVisualIdentityLighting={setVisualIdentityLighting}
                      visualIdentityTextAmount={visualIdentityTextAmount} setVisualIdentityTextAmount={setVisualIdentityTextAmount}
                      transparentCutoutStyle={transparentCutoutStyle} setTransparentCutoutStyle={setTransparentCutoutStyle}
                      transparentSubjectType={transparentSubjectType} setTransparentSubjectType={setTransparentSubjectType}
                      transparentTolerance={transparentTolerance} setTransparentTolerance={setTransparentTolerance}
                      dixitRandomMode={dixitRandomMode} setDixitRandomMode={setDixitRandomMode}
                      dixitArtistStyle={dixitArtistStyle} setDixitArtistStyle={setDixitArtistStyle}
                      dixitMetaphorMode={dixitMetaphorMode} setDixitMetaphorMode={setDixitMetaphorMode}
                      chalkboardPalette={chalkboardPalette as any} setChalkboardPalette={setChalkboardPalette as any}
                      chalkboardStyle={chalkboardStyle as any} setChalkboardStyle={setChalkboardStyle as any}
                      chalkboardTextAmount={chalkboardTextAmount} setChalkboardTextAmount={setChalkboardTextAmount}
                      mouthGuideStyle={mouthGuideStyle as any} setMouthGuideStyle={setMouthGuideStyle as any}
                      mouthGuideColorStyle={mouthGuideColorStyle as any} setMouthGuideColorStyle={setMouthGuideColorStyle as any}
                      mouthGuideTextAmount={mouthGuideTextAmount} setMouthGuideTextAmount={setMouthGuideTextAmount}
                      synonymScaleSteps={synonymScaleSteps as any} setSynonymScaleSteps={setSynonymScaleSteps as any}
                      synonymScaleStyle={synonymScaleStyle as any} setSynonymScaleStyle={setSynonymScaleStyle as any}
                      synonymScaleTextAmount={synonymScaleTextAmount} setSynonymScaleTextAmount={setSynonymScaleTextAmount}
                      cutawayStyle={cutawayStyle as any} setCutawayStyle={setCutawayStyle as any}
                      cutawaySubjectType={cutawaySubjectType as any} setCutawaySubjectType={setCutawaySubjectType as any}
                      cutawayTextAmount={cutawayTextAmount} setCutawayTextAmount={setCutawayTextAmount}
                      actionSequenceLayout={actionSequenceLayout as any} setActionSequenceLayout={setActionSequenceLayout as any}
                      actionSequenceStyle={actionSequenceStyle as any} setActionSequenceStyle={setActionSequenceStyle as any}
                      actionSequenceTextAmount={actionSequenceTextAmount} setActionSequenceTextAmount={setActionSequenceTextAmount}
                      etymologyStyle={etymologyStyle as any} setEtymologyStyle={setEtymologyStyle as any}
                      etymologyBranchLayout={etymologyBranchLayout as any} setEtymologyBranchLayout={setEtymologyBranchLayout as any}
                      etymologyTextAmount={etymologyTextAmount} setEtymologyTextAmount={setEtymologyTextAmount}
                      prepositionStyle={prepositionStyle as any} setPrepositionStyle={setPrepositionStyle as any}
                      prepositionTextAmount={prepositionTextAmount as any} setPrepositionTextAmount={setPrepositionTextAmount as any}
                      morphologyStyle={morphologyStyle as any} setMorphologyStyle={setMorphologyStyle as any}
                      morphologyTextAmount={morphologyTextAmount as any} setMorphologyTextAmount={setMorphologyTextAmount as any}
                      collocationStyle={collocationStyle as any} setCollocationStyle={setCollocationStyle as any}
                      collocationTextAmount={collocationTextAmount as any} setCollocationTextAmount={setCollocationTextAmount as any}
                    />

                    {/* CEFR Level Slider */}
                    <div className="bg-[#111827] rounded-xl px-4 py-2 border border-[#1e293b] shadow-lg flex flex-col justify-center">
                      <input
                        type="range"
                        min="0"
                        max="11"
                        step="1"
                        value={cefrLevel}
                        onChange={(e) => setCefrLevel(parseInt(e.target.value))}
                        className="w-full h-1.5 rounded-full appearance-none cursor-pointer outline-none slider-thumb my-1"
                        style={{
                          background: 'linear-gradient(to right, #8b5cf6, #3b82f6, #06b6d4, #10b981, #f59e0b, #f97316, #ef4444)',
                        }}
                      />
                      <div className="mt-1 text-center text-[10px] font-black tracking-widest text-[#cbd5e1] drop-shadow-md">
                        {cefrLevels[cefrLevel]}
                      </div>
                    </div>

                    {/* Light Valve Button */}
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setIsLightModalOpen(true)}
                          className={`w-full flex justify-between items-center bg-[#111827] rounded-xl px-4 py-2 border shadow-lg transition-all ${lightProps ? 'border-amber-500/50 hover:bg-amber-900/10' : 'border-[#1e293b] hover:border-slate-600 hover:bg-[#1e293b]/50'}`}
                        >
                          <div className="flex items-center gap-2">
                            <Sun className={`w-4 h-4 ${lightProps ? 'text-amber-400' : 'text-slate-400'}`} />
                            <span className={`text-[10px] font-bold uppercase tracking-widest ${lightProps ? 'text-amber-100' : 'text-slate-300'}`}>Light Target Point</span>
                          </div>
                          {lightProps && (
                            <div className="text-[9px] font-mono text-amber-500/70">
                              {lightProps.azimuth}°, {lightProps.altitude}°
                            </div>
                          )}
                        </button>
                        {lightProps && (
                           <button onClick={() => setLightProps(null)} className="p-2 shrink-0 rounded-xl bg-red-950/30 text-red-400 hover:bg-red-900/50 hover:text-red-300 border border-red-900/30 transition-colors">
                              <X className="w-4 h-4" />
                           </button>
                        )}
                      </div>

                      {/* Photo Light Modal Button */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setIsPhotoLightModalOpen(true)}
                          className={`w-full flex justify-between items-center bg-[#111827] rounded-xl px-4 py-2 border shadow-lg transition-all ${photoLightData ? 'border-blue-500/50 hover:bg-blue-900/10' : 'border-[#1e293b] hover:border-slate-600 hover:bg-[#1e293b]/50'}`}
                        >
                          <div className="flex items-center gap-2">
                            <Camera className={`w-4 h-4 ${photoLightData ? 'text-blue-400' : 'text-slate-400'}`} />
                            <span className={`text-[10px] font-bold uppercase tracking-widest ${photoLightData ? 'text-blue-100' : 'text-slate-300'}`}>Photography Light Direction</span>
                          </div>
                          {photoLightData && (
                            <div className="text-[9px] font-mono text-blue-500/70 capitalize">
                              {photoLightData.state.type} - {Math.round(photoLightData.state.az)}°
                            </div>
                          )}
                        </button>
                        {photoLightData && (
                           <button onClick={() => setPhotoLightData(null)} className="p-2 shrink-0 rounded-xl bg-red-950/30 text-red-400 hover:bg-red-900/50 hover:text-red-300 border border-red-900/30 transition-colors">
                              <X className="w-4 h-4" />
                           </button>
                        )}
                      </div>

                      {/* Reference / Inspiration / Character Image Upload (Small & Flat) */}
                      <div className="flex flex-col gap-1">
                        <input
                          type="file"
                          ref={referenceImageInputRef}
                          accept="image/*"
                          className="hidden"
                          onChange={handleReferenceImageChange}
                        />
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => referenceImageInputRef.current?.click()}
                            onDragOver={(e) => {
                              e.preventDefault();
                              setRefImageDragOver(true);
                            }}
                            onDragLeave={() => setRefImageDragOver(false)}
                            onDrop={(e) => {
                              e.preventDefault();
                              setRefImageDragOver(false);
                              if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                                handleProcessReferenceFile(e.dataTransfer.files[0]);
                              }
                            }}
                            className={`w-full flex justify-between items-center bg-[#111827] rounded-xl px-4 py-2 border shadow-lg transition-all ${
                              refImageDragOver
                                ? 'border-emerald-400 bg-emerald-950/40 ring-1 ring-emerald-400/50'
                                : referenceImage
                                ? 'border-emerald-500/60 hover:bg-emerald-950/20 shadow-[0_0_12px_rgba(16,185,129,0.15)]'
                                : 'border-[#1e293b] hover:border-slate-600 hover:bg-[#1e293b]/50'
                            }`}
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              {referenceImage ? (
                                <img
                                  src={referenceImage.dataUrl}
                                  alt="Ref"
                                  className="w-5 h-5 rounded object-cover border border-emerald-400/60 shrink-0"
                                />
                              ) : (
                                <ImageIcon className="w-4 h-4 text-emerald-400 shrink-0" />
                              )}
                              <div className="flex flex-col text-left truncate min-w-0">
                                <span className={`text-[10px] font-bold uppercase tracking-widest truncate ${referenceImage ? 'text-emerald-200' : 'text-slate-300'}`}>
                                  {referenceImage ? referenceImage.name : 'Image Reference / Inspiration'}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0 ml-2">
                              {referenceImage ? (
                                <span className="text-[8.5px] font-bold uppercase px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                                  Loaded
                                </span>
                              ) : (
                                <span className="text-[8.5px] font-medium text-slate-400 flex items-center gap-1">
                                  <Upload className="w-3 h-3 text-emerald-400" /> Upload
                                </span>
                              )}
                            </div>
                          </button>

                          {referenceImage && (
                            <button
                              type="button"
                              onClick={() => {
                                setReferenceImage(null);
                                if (referenceImageInputRef.current) referenceImageInputRef.current.value = '';
                              }}
                              title="Remove Reference Image"
                              className="p-2 shrink-0 rounded-xl bg-red-950/30 text-red-400 hover:bg-red-900/50 hover:text-red-300 border border-red-900/30 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>

                        {/* Flat nuance selector when reference image is active */}
                        {referenceImage && (
                          <div className="flex items-center justify-between bg-[#0b0f19] border border-emerald-900/40 rounded-lg px-2 py-1">
                            <span className="text-[8px] text-emerald-400/90 font-bold uppercase tracking-wider">Role:</span>
                            <div className="flex items-center gap-1">
                              {([
                                { id: 'all', label: 'All' },
                                { id: 'theme', label: 'Theme' },
                                { id: 'character', label: 'Char' },
                                { id: 'style', label: 'Style' },
                                { id: 'palette', label: 'Palette' }
                              ] as const).map(role => (
                                <button
                                  key={role.id}
                                  type="button"
                                  onClick={() => setReferenceRole(role.id)}
                                  className={`text-[8px] font-bold uppercase px-1.5 py-0.5 rounded transition-all ${
                                    referenceRole === role.id
                                      ? 'bg-emerald-500/30 text-emerald-200 border border-emerald-400/40 shadow-sm'
                                      : 'text-slate-400 hover:text-slate-200'
                                  }`}
                                >
                                  {role.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                        {referenceImage && referenceRole === 'palette' && (
                          <div className="flex items-center gap-1.5 text-[8px] text-emerald-300/90 px-1 py-0.5 bg-emerald-950/20 border border-emerald-900/30 rounded-md">
                            <Palette className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
                            <span className="truncate">AI will extract & apply color palette from reference</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Theme Prompt Box */}
                    <div className="bg-[#111827] rounded-xl p-2.5 border border-[#1e293b] shadow-lg">
                      <label className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                        <Camera className="w-3 h-3 text-fuchsia-400" /> Visual Theme (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Cyberpunk, 1980s Anime, Watercolor..."
                        value={visualTheme}
                        onChange={(e) => setVisualTheme(e.target.value)}
                        className="w-full bg-[#0b0f19] border border-[#1e293b] text-slate-200 p-2 rounded-lg text-[11px] focus:outline-none focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/50 transition-colors placeholder:text-slate-600"
                      />
                    </div>

                    {/* Subject Prompt Box */}
                    <div className="bg-[#111827] rounded-xl p-3 border border-[#1e293b] shadow-lg">
                      <div className="flex items-center justify-between mb-2">
                        <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          <MessageSquare className="w-3 h-3 text-cyan-400" /> Core Subject / Prompt
                        </label>
                        <button
                          type="button"
                          onClick={() => setIsBackgroundless(!isBackgroundless)}
                          className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold border transition-all ${
                            isBackgroundless || generationMode === 'no_background'
                              ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.25)]'
                              : 'bg-[#0b0f19] border-[#1e293b] text-slate-400 hover:text-slate-200 hover:border-slate-600'
                          }`}
                          title="Generate without background (transparent PNG cutout with smart prompt understanding)"
                        >
                          <Sparkles className="w-2.5 h-2.5 text-emerald-400" />
                          <span>Backgroundless {isBackgroundless || generationMode === 'no_background' ? 'ON' : 'OFF'}</span>
                        </button>
                      </div>
                      <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            if (prompt) handleGenerate();
                          }
                        }}
                        placeholder="Describe the visual or target phrase..."
                        className="w-full rounded-lg border border-[#1e293b] focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 bg-[#0b0f19] text-slate-200 placeholder-slate-600 resize-none h-20 p-2.5 text-xs transition-all shadow-inner"
                      />
                      {(isBackgroundless || generationMode === 'no_background') && (
                        <div className="mt-2 flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-emerald-950/30 border border-emerald-500/20 text-[10px] text-emerald-300/90">
                          <span className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Smart Engine: Isolates core subject and renders backgroundless transparent .PNG
                          </span>
                          <span className="text-[9px] uppercase tracking-wider font-mono text-emerald-400/70">
                            {transparentCutoutStyle} edge
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Canvas Specs */}
                    <div className="bg-[#111827] rounded-xl p-3 border border-[#1e293b] shadow-lg">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                            <Layers className="w-3 h-3 text-blue-400" /> Count
                          </label>
                          <div className="grid grid-cols-2 gap-1.5">
                            {[1, 2].map(count => (
                              <button
                                key={count}
                                onClick={() => setNumImages(count as any)}
                                className={`py-1.5 rounded-lg border text-xs font-bold transition-all flex items-center justify-center ${
                                  numImages === count ? 'bg-blue-600/20 border-blue-500 text-blue-300 shadow-[inset_0_0_10px_rgba(59,130,246,0.2)]' : 'bg-[#0b0f19] border-[#1e293b] text-slate-500 hover:bg-[#162032]'
                                }`}
                              >
                                {count}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                            <Settings2 className="w-3 h-3 text-cyan-400" /> Fidelity
                          </label>
                          <select
                            value={imageSize}
                            onChange={(e) => setImageSize(e.target.value as any)}
                            className="w-full rounded-lg border border-[#1e293b] focus:border-cyan-500 bg-[#0b0f19] text-slate-300 p-1.5 text-xs font-semibold outline-none py-[7px]"
                          >
                            <option value="512px">512px</option>
                            <option value="1K">1K STD</option>
                            <option value="2K">2K HI</option>
                            <option value="4K">4K UHD</option>
                          </select>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-[#1e293b]">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Aspect Ratio</label>
                        <div className="grid grid-cols-5 gap-1">
                          {['1:1', '16:9', '9:16', '4:3', '3:4'].map(ratio => (
                            <button
                              key={ratio}
                              onClick={() => setAspectRatio(ratio as any)}
                              className={`flex flex-col items-center justify-center gap-1 py-1.5 rounded-lg border transition-all ${
                                aspectRatio === ratio ? 'bg-cyan-900/20 border-cyan-500 text-cyan-300 shadow-[inset_0_0_10px_rgba(6,182,212,0.2)]' : 'bg-[#0b0f19] border-[#1e293b] text-slate-500 hover:bg-[#162032]'
                              }`}
                            >
                              {renderAspectRatioIcon(ratio)}
                              <span className="text-[9px] font-bold mt-0.5">{ratio}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                {error && (
                  <div className="bg-red-950/40 text-red-400 p-3 rounded-lg text-xs font-bold border border-red-900/50 flex items-start gap-2 backdrop-blur-sm">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <p>{error}</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt}
            className="w-full shrink-0 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:from-[#1e293b] disabled:to-[#1e293b] disabled:text-slate-500 disabled:cursor-not-allowed text-white py-3 px-4 rounded-xl font-bold text-[11px] uppercase tracking-widest shadow-lg shadow-cyan-900/30 disabled:shadow-none transition-all flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                SYNTHESIZING...
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4" />
                EXECUTE GENERATION
              </>
            )}
          </button>
        </div>

        {/* Right Column: Output Canvas Area */}
        <div className="lg:col-span-9 lg:sticky lg:top-20 self-start h-[calc(100vh-6.5rem)] min-h-[500px]">
          <div className="bg-[#111827] rounded-xl border border-[#1e293b] h-full flex flex-col overflow-hidden relative shadow-2xl">
            
            {/* Ambient Background Effect */}
            <div className="absolute inset-0 z-0 bg-[#070b14] overflow-hidden pointer-events-none">
               {resultImages.length > 0 && (
                  <img src={resultImages[0]} alt="" draggable={false} className="w-full h-full object-cover blur-[100px] scale-125 opacity-20 animate-in fade-in duration-1000 saturate-200 pointer-events-none select-none" />
               )}
               <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.8)_100%)]" />
            </div>

            <div className="absolute top-0 inset-x-0 h-10 border-b border-[#1e293b]/50 px-4 flex items-center justify-between shrink-0 bg-[#111827]/80 backdrop-blur-xl z-20">
              <h2 className="text-[10px] font-black tracking-widest text-slate-500 flex items-center gap-2 uppercase">
                {isHistoryOpen ? <History className="w-3.5 h-3.5 text-cyan-500" /> : <ImageIcon className="w-3.5 h-3.5 text-cyan-500" />} 
                {isHistoryOpen ? 'GENERATION HISTORY' : 'Studio Canvas'}
              </h2>
              <div className="flex items-center gap-4">
                {!isHistoryOpen && resultImages.length > 0 && (
                  <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                     {resultImages.length} Frame{resultImages.length > 1 ? 's' : ''} Rendered
                  </div>
                )}
                <button 
                  onClick={() => setIsHistoryOpen(!isHistoryOpen)}
                  className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md transition-colors ${isHistoryOpen ? 'bg-cyan-900/40 text-cyan-400' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
                >
                  {isHistoryOpen ? <X className="w-3 h-3" /> : <History className="w-3 h-3" />}
                  {isHistoryOpen ? 'Close History' : 'History'}
                </button>
              </div>
            </div>
            
            {isHistoryOpen ? (
              <div className="flex-1 w-full h-full p-4 relative z-10 pt-14 pb-6 overflow-y-auto">
                {history.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-500 opacity-50">
                    <History className="w-12 h-12 mb-3" />
                    <p className="text-sm font-medium">No history yet</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {history.map((entry) => (
                      <div key={entry.id} className="bg-[#0f172a] rounded-xl border border-[#1e293b] p-4">
                        <div className="flex items-start justify-between mb-3 border-b border-[#1e293b]/50 pb-3">
                          <div>
                            <p className="text-xs font-semibold text-slate-300 line-clamp-2 mb-1">{entry.prompt}</p>
                            <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">
                              {new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                        <div className={`grid gap-4 ${entry.images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                          {entry.images.map((img, idx) => (
                            <div key={idx} className="relative group">
                              <img 
                                src={img} 
                                className="w-full rounded-lg object-contain bg-black/20" 
                                alt={`History ${idx}`} 
                                onDragStart={(e) => handleImageDragStart(e, img, `digs-history-${idx}.png`)}
                              />
                              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1.5">
                                <a 
                                  href={img} 
                                  download={`hist-${idx}.png`}
                                  className="bg-cyan-600 hover:bg-cyan-500 text-white p-1.5 rounded-md transition-colors shadow-lg flex items-center justify-center"
                                  title="Download"
                                >
                                  <Download className="w-3.5 h-3.5" />
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
            <div className={`flex-1 w-full h-full p-4 relative z-10 min-h-0 pt-14 pb-6 grid gap-6 items-center justify-items-center ${numImages > 1 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
              <AnimatePresence>
                {isGenerating && resultImages.length === 0 && (
                  <motion.div
                    key="generating-initial"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center text-center max-w-sm col-span-full"
                  >
                    <div className="w-14 h-14 bg-[#1e293b]/80 backdrop-blur-md rounded-xl shadow-[0_0_30px_rgba(6,182,212,0.15)] border border-[#334155] flex items-center justify-center mb-5 relative">
                      <div className="absolute inset-0 bg-cyan-500 rounded-xl animate-ping opacity-20"></div>
                      <Loader2 className="w-6 h-6 text-cyan-400 animate-spin" />
                    </div>
                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-200 mb-1.5 shadow-sm">
                      {isDigestingLight ? 'Interpreting Physics...' : 'Synthesizing Visuals'}
                    </h3>
                    <p className="text-slate-500 text-[10px] uppercase tracking-wider font-bold max-w-sm px-4">
                      {isDigestingLight ? 'Neural Engine transforming ray-tracing vectors into semantic prompt...' : lightingDigest ? `Light Prompt Active: "${lightingDigest.substring(0, 80)}..."` : 'Deploying AI Model Core...'}
                    </p>
                  </motion.div>
                )}

                {isGenerating && resultImages.length > 0 && (
                  <motion.div
                    key="generating-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-50 flex items-center justify-center bg-[#0b0f19]/80 backdrop-blur-sm"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="w-14 h-14 bg-[#1e293b]/80 backdrop-blur-md rounded-xl border border-[#334155] flex items-center justify-center mb-3">
                        <Loader2 className="w-6 h-6 text-cyan-400 animate-spin" />
                      </div>
                      <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-200 shadow-sm">
                        {isDigestingLight ? 'Interpreting Physics...' : 'Synthesizing'}
                      </h3>
                      {lightingDigest && !isDigestingLight && (
                         <p className="text-cyan-400/80 text-[10px] mt-2 max-w-[200px] truncate">
                            {lightingDigest}
                         </p>
                      )}
                    </div>
                  </motion.div>
                )}

                {resultImages.map((img, idx) => {
                  const rawPostfix = activeGenerationPrompt 
                    ? activeGenerationPrompt.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')
                    : 'digs-asset';
                  
                  const suffix = numImages > 1 ? `-${idx + 1}.png` : `.png`;
                  const maxPostfixLength = 15 - suffix.length;
                  const filenamePostfix = rawPostfix.substring(0, maxPostfixLength).replace(/-$/, '');
                  const filename = `${filenamePostfix}${suffix}`;

                  return (
                  <motion.div
                    key={`result-${idx}`}
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ type: 'spring', damping: 25, delay: idx * 0.1 }}
                      className="group relative w-full h-full min-h-0 min-w-0 flex items-center justify-center"
                    >
                      <div className="relative max-w-full max-h-full rounded-lg overflow-hidden flex items-center justify-center bg-[radial-gradient(#334155_1.2px,transparent_1.2px)] [background-size:12px_12px] bg-[#070b14] shadow-[0_0_50px_rgba(0,0,0,0.6)] ring-1 ring-white/10">
                        <img 
                          src={img} 
                          alt={`Generated Model Output ${idx + 1}`} 
                          className="max-w-full max-h-full object-contain"
                          onDragStart={(e) => handleImageDragStart(e, img, filename)}
                        />
                      </div>

                      {/* Transparent Badge if in no_background mode or isBackgroundless */}
                      {(generationMode === 'no_background' || isBackgroundless) && (
                        <div className="absolute top-3 left-3 bg-emerald-950/90 backdrop-blur-md px-2 py-0.5 rounded-md border border-emerald-500/40 text-[9px] font-bold text-emerald-300 flex items-center gap-1 shadow-lg pointer-events-none">
                          <Eraser className="w-3 h-3 text-emerald-400" />
                          <span>Transparent .PNG</span>
                        </div>
                      )}
                      
                      {/* Action Overlays per image */}
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-[#0f172a]/80 backdrop-blur-md p-1.5 rounded-lg border border-white/10 flex flex-col gap-1.5 shadow-2xl">
                         <button
                            onClick={() => handleRemoveBackgroundOnImage(idx)}
                            disabled={isRemovingBgIndex === idx}
                            className="bg-slate-800 hover:bg-emerald-950 hover:text-emerald-300 text-slate-200 p-2 rounded-md transition-colors flex items-center justify-center tooltip-trigger"
                            title="Make Transparent (Remove Background to .PNG)"
                         >
                            {isRemovingBgIndex === idx ? (
                              <Loader2 className="w-4 h-4 text-emerald-400 animate-spin" />
                            ) : (
                              <Eraser className="w-4 h-4" />
                            )}
                         </button>
                         <button
                            onClick={() => copyToClipboard(img, idx)}
                            className="bg-slate-800 hover:bg-slate-700 text-slate-200 p-2 rounded-md transition-colors flex items-center justify-center tooltip-trigger"
                            title="Copy to Clipboard"
                         >
                            {copySuccessStates[idx] ? <CopyCheck className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                         </button>
                         <a
                            href={img}
                            download={filename}
                            className="bg-cyan-600 hover:bg-cyan-500 text-white p-2 rounded-md transition-colors flex items-center justify-center shadow-[0_0_10px_rgba(6,182,212,0.3)]"
                            title="Download Asset"
                         >
                            <Download className="w-4 h-4" />
                         </a>
                      </div>
                  </motion.div>
                );})}

                {isGenerating && resultImages.length > 0 && resultImages.length < numImages && (
                  <motion.div
                    key="generating-next"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center w-full h-full min-h-[250px] border-2 border-dashed border-[#1e293b] rounded-lg bg-[#0b0f19]/50"
                  >
                    <Loader2 className="w-6 h-6 text-cyan-400 animate-spin mb-3" />
                     <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Awaiting Next Frame...</p>
                  </motion.div>
                )}

                {!isGenerating && resultImages.length === 0 && (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-slate-600 col-span-full"
                  >
                    <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-30 stroke-[1.5]" />
                    <p className="font-bold text-[11px] uppercase tracking-widest text-slate-500">Awaiting Telemetry</p>
                    <p className="text-[9px] uppercase tracking-widest opacity-60 mt-1">Standby for input</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            )}
          </div>
        </div>
      </main>
      <LightValveModal 
        isOpen={isLightModalOpen} 
        onClose={() => setIsLightModalOpen(false)} 
        onSave={(azimuth, altitude, tension, lumens, beamAngle, intensity, colorTemp, modifiers) => setLightProps({azimuth, altitude, tension, lumens, beamAngle, intensity, colorTemp, modifiers})} 
        initialAzimuth={lightProps?.azimuth || '180'}
        initialAltitude={lightProps?.altitude || '45'}
        initialTension={lightProps?.tension || '0.82'}
        initialLumens={lightProps?.lumens || '1200'}
        initialBeamAngle={lightProps?.beamAngle || '360'}
        initialIntensity={lightProps?.intensity || '75'}
        initialColorTemp={lightProps?.colorTemp || '5600'}
        initialModifiers={lightProps?.modifiers || []}
      />
      <PhotoLightModal
        isOpen={isPhotoLightModalOpen}
        onClose={() => setIsPhotoLightModalOpen(false)}
        onSave={(prompt, state) => setPhotoLightData({ prompt, state })}
        initialState={photoLightData?.state}
      />

      <AnimatePresence>
        {hoveredMode && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1 }}
            className="fixed z-[9999] pointer-events-none bg-[#1e293b] text-slate-200 text-xs px-3 py-2.5 rounded-lg shadow-2xl border border-slate-700/80 max-w-[220px]"
            style={{ left: mousePos.x + 20, top: mousePos.y + 20 }}
          >
            <div className="font-bold text-[10px] uppercase tracking-wider text-cyan-400 mb-1">{hoveredMode.label}</div>
            <div className="leading-tight opacity-90">{hoveredMode.description}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
