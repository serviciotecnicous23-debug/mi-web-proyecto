import React, { useState, useEffect, useRef } from "react";
import { Layout } from "@/components/layout";
import { useAuth } from "@/hooks/use-auth";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import {
  BookOpen, Highlighter, StickyNote, BookMarked, Users, FileText,
  Plus, Trash2, Heart, Search, ChevronLeft, ChevronRight, MessageCircle,
  Upload, Download, Check, Send, Library, Loader2,
} from "lucide-react";
import {
  useBibleHighlights, useCreateBibleHighlight, useDeleteBibleHighlight,
  useBibleNotes, useCreateBibleNote, useDeleteBibleNote,
  useReadingPlans, useReadingPlan, useCreateReadingPlan, useDeleteReadingPlan,
  useToggleReadingPlanItem, useBulkAddReadingPlanItems,
  useLibraryResources, useCreateLibraryResource, useDeleteLibraryResource, useToggleLibraryResourceLike,
  useWhatsappLink,
} from "@/hooks/use-users";
import { SiWhatsapp } from "react-icons/si";
import { HIGHLIGHT_COLORS, RESOURCE_CATEGORIES, BIBLE_BOOKS } from "@shared/schema";

const BIBLE_BOOK_SLUG_MAP: Record<string, string> = {
  "Genesis": "gn", "Exodo": "ex", "Levitico": "lv", "Numeros": "nm", "Deuteronomio": "dt",
  "Josue": "js", "Jueces": "jue", "Rut": "rt", "1 Samuel": "1s", "2 Samuel": "2s",
  "1 Reyes": "1r", "2 Reyes": "2r", "1 Cronicas": "1cr", "2 Cronicas": "2cr",
  "Esdras": "esd", "Nehemias": "ne", "Ester": "est", "Job": "job", "Salmos": "sal",
  "Proverbios": "pr", "Eclesiastes": "ec", "Cantares": "cnt", "Isaias": "is", "Jeremias": "jr",
  "Lamentaciones": "lm", "Ezequiel": "ez", "Daniel": "dn", "Oseas": "os", "Joel": "jl",
  "Amos": "am", "Abdias": "abd", "Jonas": "jon", "Miqueas": "mi", "Nahum": "nah",
  "Habacuc": "hab", "Sofonias": "sof", "Hageo": "hag", "Zacarias": "zac", "Malaquias": "mal",
  "Mateo": "mt", "Marcos": "mr", "Lucas": "lc", "Juan": "jn", "Hechos": "hch",
  "Romanos": "ro", "1 Corintios": "1co", "2 Corintios": "2co", "Galatas": "ga", "Efesios": "ef",
  "Filipenses": "fil", "Colosenses": "col", "1 Tesalonicenses": "1ts", "2 Tesalonicenses": "2ts",
  "1 Timoteo": "1ti", "2 Timoteo": "2ti", "Tito": "tit", "Filemon": "flm", "Hebreos": "he",
  "Santiago": "stg", "1 Pedro": "1p", "2 Pedro": "2p", "1 Juan": "1jn", "2 Juan": "2jn",
  "3 Juan": "3jn", "Judas": "jud", "Apocalipsis": "ap",
};

const BOOK_CHAPTERS: Record<string, number> = {
  "Genesis": 50, "Exodo": 40, "Levitico": 27, "Numeros": 36, "Deuteronomio": 34,
  "Josue": 24, "Jueces": 21, "Rut": 4, "1 Samuel": 31, "2 Samuel": 24,
  "1 Reyes": 22, "2 Reyes": 25, "1 Cronicas": 29, "2 Cronicas": 36,
  "Esdras": 10, "Nehemias": 13, "Ester": 10, "Job": 42, "Salmos": 150,
  "Proverbios": 31, "Eclesiastes": 12, "Cantares": 8, "Isaias": 66, "Jeremias": 52,
  "Lamentaciones": 5, "Ezequiel": 48, "Daniel": 12, "Oseas": 14, "Joel": 3,
  "Amos": 9, "Abdias": 1, "Jonas": 4, "Miqueas": 7, "Nahum": 3,
  "Habacuc": 3, "Sofonias": 3, "Hageo": 2, "Zacarias": 14, "Malaquias": 4,
  "Mateo": 28, "Marcos": 16, "Lucas": 24, "Juan": 21, "Hechos": 28,
  "Romanos": 16, "1 Corintios": 16, "2 Corintios": 13, "Galatas": 6, "Efesios": 6,
  "Filipenses": 4, "Colosenses": 4, "1 Tesalonicenses": 5, "2 Tesalonicenses": 3,
  "1 Timoteo": 6, "2 Timoteo": 4, "Tito": 3, "Filemon": 1, "Hebreos": 13,
  "Santiago": 5, "1 Pedro": 5, "2 Pedro": 3, "1 Juan": 5, "2 Juan": 1,
  "3 Juan": 1, "Judas": 1, "Apocalipsis": 22,
};

interface BibleVerse {
  verse: number;
  text: string;
  study?: string;
}

const BIBLE_VERSIONS: Record<string, { label: string; desc: string }> = {
  rv1960: { label: "RV1960", desc: "Reina Valera 1960 - Clásica" },
  nvi: { label: "NVI", desc: "Nueva Version Internacional - Moderna" },
  rv1995: { label: "RV1995", desc: "Reina Valera 1995 - Actualizada" },
};

const DAILY_VERSES = [
  { ref: "Josue 1:9", text: "Mira que te mando que te esfuerces y seas valiente; no temas ni desmayes, porque Jehova tu Dios estara contigo en dondequiera que vayas." },
  { ref: "Salmos 23:1", text: "Jehova es mi pastor; nada me faltara." },
  { ref: "Proverbios 3:5-6", text: "Fiate de Jehova de todo tu corazon, y no te apoyes en tu propia prudencia. Reconocelo en todos tus caminos, y el enderezara tus veredas." },
  { ref: "Isaias 41:10", text: "No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios que te esfuerzo; siempre te ayudare, siempre te sustentare con la diestra de mi justicia." },
  { ref: "Jeremias 29:11", text: "Porque yo se los pensamientos que tengo acerca de vosotros, dice Jehova, pensamientos de paz, y no de mal, para daros el fin que esperais." },
  { ref: "Filipenses 4:13", text: "Todo lo puedo en Cristo que me fortalece." },
  { ref: "Romanos 8:28", text: "Y sabemos que a los que aman a Dios, todas las cosas les ayudan a bien, esto es, a los que conforme a su proposito son llamados." },
  { ref: "Salmos 119:105", text: "Lampara es a mis pies tu palabra, y lumbrera a mi camino." },
  { ref: "Mateo 11:28", text: "Venid a mi todos los que estais trabajados y cargados, y yo os hare descansar." },
  { ref: "2 Timoteo 1:7", text: "Porque no nos ha dado Dios espiritu de cobardía, sino de poder, de amor y de dominio propio." },
  { ref: "Salmos 46:1", text: "Dios es nuestro amparo y fortaleza, nuestro pronto auxilio en las tribulaciones." },
  { ref: "Hebreos 11:1", text: "Es, pues, la fe la certeza de lo que se espera, la conviccion de lo que no se ve." },
  { ref: "Juan 3:16", text: "Porque de tal manera amo Dios al mundo, que ha dado a su Hijo unigenito, para que todo aquel que en el cree, no se pierda, mas tenga vida eterna." },
  { ref: "Salmos 37:4", text: "Deléitate asimismo en Jehova, y el te concedera las peticiones de tu corazon." },
  { ref: "Isaias 40:31", text: "Pero los que esperan a Jehova tendran nuevas fuerzas; levantaran alas como las aguilas; correran, y no se cansaran; caminaran, y no se fatigaran." },
  { ref: "Romanos 12:2", text: "No os conformeis a este siglo, sino transformaos por medio de la renovacion de vuestro entendimiento." },
  { ref: "Salmos 91:1-2", text: "El que habita al abrigo del Altisimo morara bajo la sombra del Omnipotente. Dire yo a Jehova: Esperanza mia, y castillo mio; mi Dios, en quien confiare." },
  { ref: "Galatas 5:22-23", text: "Mas el fruto del Espiritu es amor, gozo, paz, paciencia, benignidad, bondad, fe, mansedumbre, templanza." },
  { ref: "1 Corintios 13:4-5", text: "El amor es sufrido, es benigno; el amor no tiene envidia, el amor no es jactancioso, no se envanece." },
  { ref: "Efesios 2:8-9", text: "Porque por gracia sois salvos por medio de la fe; y esto no de vosotros, pues es don de Dios; no por obras, para que nadie se glorie." },
  { ref: "Salmos 34:8", text: "Gustad, y ved que es bueno Jehova; dichoso el hombre que confia en el." },
  { ref: "Miqueas 6:8", text: "Oh hombre, el te ha declarado lo que es bueno, y que pide Jehova de ti: solamente hacer justicia, y amar misericordia, y humillarte ante tu Dios." },
  { ref: "Santiago 1:5", text: "Y si alguno de vosotros tiene falta de sabiduria, pidala a Dios, el cual da a todos abundantemente y sin reproche, y le sera dada." },
  { ref: "Deuteronomio 31:6", text: "Esforzaos y cobrad animo; no temais, ni tengais miedo de ellos, porque Jehova tu Dios es el que va contigo; no te dejara, ni te desamparara." },
  { ref: "Salmos 27:1", text: "Jehova es mi luz y mi salvacion; de quien temere? Jehova es la fortaleza de mi vida; de quien he de atemorizarme?" },
  { ref: "1 Pedro 5:7", text: "Echando toda vuestra ansiedad sobre el, porque el tiene cuidado de vosotros." },
  { ref: "Apocalipsis 21:4", text: "Enjugara Dios toda lagrima de los ojos de ellos; y ya no habra muerte, ni habra mas llanto, ni clamor, ni dolor." },
  { ref: "Salmos 139:14", text: "Te alabare; porque formidables, maravillosas son tus obras; estoy maravillado, y mi alma lo sabe muy bien." },
  { ref: "Proverbios 16:3", text: "Encomienda a Jehova tus obras, y tus pensamientos seran afirmados." },
  { ref: "Habacuc 3:19", text: "Jehova el Senor es mi fortaleza, el cual hace mis pies como de ciervas, y en mis alturas me hace andar." },
  { ref: "Salmos 121:1-2", text: "Alzare mis ojos a los montes; de donde vendra mi socorro? Mi socorro viene de Jehova, que hizo los cielos y la tierra." },
];

function VerseOfTheDay() {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  const verse = DAILY_VERSES[dayOfYear % DAILY_VERSES.length];

  return (
    <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-primary/20">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <BookOpen className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-medium text-primary uppercase tracking-wide mb-1">Versiculo del Dia</p>
            <p className="text-sm italic leading-relaxed">&ldquo;{verse.text}&rdquo;</p>
            <p className="text-xs text-muted-foreground mt-1 font-medium">{verse.ref}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function BibleTab() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedBook, setSelectedBook] = useState("Genesis");
  const [chapter, setChapter] = useState(1);
  const [verses, setVerses] = useState<BibleVerse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedVerse, setSelectedVerse] = useState<number | null>(null);
  const [highlightColor, setHighlightColor] = useState("#FFA500");
  const [noteText, setNoteText] = useState("");
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [showBookSelector, setShowBookSelector] = useState(false);
  const [bibleVersion, setBibleVersion] = useState("rv1960");

  const maxChapters = BOOK_CHAPTERS[selectedBook] || 1;
  const { data: highlights = [] } = useBibleHighlights(selectedBook, chapter);
  const { data: notes = [] } = useBibleNotes(selectedBook, chapter);
  const createHighlight = useCreateBibleHighlight();
  const deleteHighlight = useDeleteBibleHighlight();
  const createNote = useCreateBibleNote();
  const deleteNote = useDeleteBibleNote();

  useEffect(() => {
    const fetchVerses = async () => {
      setLoading(true);
      setError(null);
      try {
        const slug = BIBLE_BOOK_SLUG_MAP[selectedBook] || selectedBook.toLowerCase();
        const res = await fetch(`https://bible-api.deno.dev/api/read/${bibleVersion}/${slug}/${chapter}`);
        if (!res.ok) throw new Error("Error al cargar texto biblico");
        const data = await res.json();
        if (data.vers && Array.isArray(data.vers)) {
          setVerses(data.vers.map((v: any) => ({
            verse: v.number || v.verse,
            text: v.verse || v.text || "",
            study: v.study || undefined,
          })));
        } else if (Array.isArray(data)) {
          setVerses(data.map((v: any) => ({
            verse: v.number || v.verse || 0,
            text: v.text || v.verse || "",
            study: v.study || undefined,
          })));
        } else {
          setVerses([]);
        }
      } catch (err: any) {
        setError("No se pudo cargar el texto. Intente de nuevo.");
        setVerses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchVerses();
  }, [selectedBook, chapter, bibleVersion]);

  const getVerseHighlight = (verse: number) => {
    return highlights.find((h: any) => verse >= h.verseStart && verse <= h.verseEnd);
  };

  const getVerseNotes = (verse: number) => {
    return notes.filter((n: any) => n.verse === verse);
  };

  const handleHighlight = (verse: number) => {
    if (!user?.isActive) return;
    const existing = getVerseHighlight(verse);
    if (existing) {
      deleteHighlight.mutate(existing.id);
    } else {
      createHighlight.mutate({
        book: selectedBook, chapter, verseStart: verse, verseEnd: verse, color: highlightColor,
      });
    }
  };

  const handleAddNote = () => {
    if (!selectedVerse || !noteText.trim() || !user?.isActive) return;
    createNote.mutate({
      book: selectedBook, chapter, verse: selectedVerse, content: noteText.trim(),
    });
    setNoteText("");
    setShowNoteForm(false);
    setSelectedVerse(null);
  };

  const goToPrevChapter = () => {
    if (chapter > 1) { setChapter(chapter - 1); setSelectedVerse(null); }
  };
  const goToNextChapter = () => {
    if (chapter < maxChapters) { setChapter(chapter + 1); setSelectedVerse(null); }
  };

  return (
    <div className="space-y-4">
      <VerseOfTheDay />

      {/* Bible Version Selector */}
      <div className="flex items-center gap-2 flex-wrap bg-muted/30 rounded-lg p-2">
        <span className="text-xs font-medium text-muted-foreground mr-1">Version:</span>
        {Object.entries(BIBLE_VERSIONS).map(([key, val]) => (
          <Button
            key={key}
            variant={bibleVersion === key ? "default" : "ghost"}
            size="sm"
            className={`text-xs h-7 ${bibleVersion === key ? "" : "text-muted-foreground"}`}
            onClick={() => setBibleVersion(key)}
            title={val.desc}
            data-testid={`button-version-${key}`}
          >
            {val.label}
          </Button>
        ))}
        <span className="text-xs text-muted-foreground ml-auto hidden sm:inline">
          {BIBLE_VERSIONS[bibleVersion]?.desc}
        </span>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <Dialog open={showBookSelector} onOpenChange={setShowBookSelector}>
          <DialogTrigger asChild>
            <Button variant="outline" data-testid="button-select-book">
              <BookOpen className="w-4 h-4 mr-2" />
              {selectedBook}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Seleccionar Libro</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-1">
              {BIBLE_BOOKS.map((book) => (
                <Button
                  key={book}
                  variant={selectedBook === book ? "default" : "ghost"}
                  size="sm"
                  className="justify-start"
                  onClick={() => { setSelectedBook(book); setChapter(1); setShowBookSelector(false); setSelectedVerse(null); }}
                  data-testid={`button-book-${book}`}
                >
                  {book}
                </Button>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={goToPrevChapter} disabled={chapter <= 1} data-testid="button-prev-chapter">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Select value={String(chapter)} onValueChange={(v) => { setChapter(parseInt(v)); setSelectedVerse(null); }}>
            <SelectTrigger className="w-20" data-testid="select-chapter">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              {Array.from({ length: maxChapters }, (_, i) => (
                <SelectItem key={i + 1} value={String(i + 1)}>{i + 1}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="ghost" size="icon" onClick={goToNextChapter} disabled={chapter >= maxChapters} data-testid="button-next-chapter">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {user?.isActive && (
          <div className="flex items-center gap-1 ml-auto">
            {Object.entries(HIGHLIGHT_COLORS).map(([color, name]) => (
              <button
                key={color}
                className={`w-6 h-6 rounded-full border-2 transition-transform ${highlightColor === color ? "border-foreground scale-110" : "border-transparent"}`}
                style={{ backgroundColor: color }}
                onClick={() => setHighlightColor(color)}
                title={name}
                data-testid={`button-color-${name.toLowerCase()}`}
              />
            ))}
          </div>
        )}
      </div>

      <Card>
        <CardContent className="p-4 md:p-6">
          <div className="flex items-center justify-between gap-2 mb-4">
            <h2 className="text-xl font-bold" data-testid="text-bible-heading">
              {selectedBook} {chapter}
            </h2>
            <Badge variant="outline" className="text-xs">{BIBLE_VERSIONS[bibleVersion]?.label}</Badge>
          </div>

          {/* Study section header for NVI */}
          {bibleVersion === "nvi" && verses.length > 0 && verses[0].study && (
            <div className="mb-3 p-2 rounded-md bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
              <p className="text-sm font-semibold text-blue-700 dark:text-blue-300 flex items-center gap-1">
                <BookOpen className="w-4 h-4" /> {verses[0].study}
              </p>
            </div>
          )}

          {loading ? (
            <div className="space-y-2">
              {Array.from({ length: 10 }, (_, i) => <Skeleton key={i} className="h-5 w-full" />)}
            </div>
          ) : error ? (
            <p className="text-muted-foreground text-center py-8">{error}</p>
          ) : verses.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No se encontro texto para este capitulo. Intente seleccionar otro libro o capitulo.
            </p>
          ) : (
            <div className="space-y-1 leading-relaxed text-base">
              {verses.map((v, idx) => {
                const hl = getVerseHighlight(v.verse);
                const vNotes = getVerseNotes(v.verse);
                const isSelected = selectedVerse === v.verse;
                const prevStudy = idx > 0 ? verses[idx - 1].study : verses[0].study;
                const showStudyHeader = bibleVersion === "nvi" && v.study && idx > 0 && v.study !== prevStudy;
                return (
                  <React.Fragment key={v.verse}>
                    {showStudyHeader && (
                      <div className="block my-3 p-2 rounded-md bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
                        <p className="text-sm font-semibold text-blue-700 dark:text-blue-300 flex items-center gap-1">
                          <BookOpen className="w-4 h-4" /> {v.study}
                        </p>
                      </div>
                    )}
                    <span
                      className={`inline cursor-pointer transition-colors rounded-sm px-0.5 ${isSelected ? "ring-2 ring-primary" : ""}`}
                      style={hl ? { backgroundColor: hl.color + "40" } : undefined}
                      onClick={() => {
                        setSelectedVerse(isSelected ? null : v.verse);
                        setShowNoteForm(false);
                      }}
                      data-testid={`verse-${v.verse}`}
                    >
                      <sup className="text-xs font-bold text-muted-foreground mr-0.5">{v.verse}</sup>
                      {v.text}{" "}
                      {vNotes.length > 0 && (
                        <StickyNote className="inline w-3 h-3 text-primary" />
                      )}
                    </span>
                  </React.Fragment>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {selectedVerse !== null && user?.isActive && (
        <Card>
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <p className="font-medium text-sm">
                {selectedBook} {chapter}:{selectedVerse}
              </p>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleHighlight(selectedVerse)}
                  data-testid="button-toggle-highlight"
                >
                  <Highlighter className="w-4 h-4 mr-1" />
                  {getVerseHighlight(selectedVerse) ? "Quitar resaltado" : "Resaltar"}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowNoteForm(!showNoteForm)}
                  data-testid="button-add-note"
                >
                  <StickyNote className="w-4 h-4 mr-1" />
                  Nota
                </Button>
              </div>
            </div>

            {showNoteForm && (
              <div className="space-y-2">
                <Textarea
                  placeholder="Escribe tu nota..."
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  data-testid="input-note-text"
                />
                <Button size="sm" onClick={handleAddNote} disabled={!noteText.trim()} data-testid="button-save-note">
                  Guardar Nota
                </Button>
              </div>
            )}

            {getVerseNotes(selectedVerse).map((note: any) => (
              <div key={note.id} className="flex items-start justify-between gap-2 p-2 rounded-md bg-muted/50">
                <p className="text-sm">{note.content}</p>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteNote.mutate(note.id)}
                  data-testid={`button-delete-note-${note.id}`}
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ========== PLANES DE LECTURA SUGERIDOS ==========
const SUGGESTED_PLANS = [
  {
    id: "nuevo-testamento-30",
    name: "Nuevo Testamento en 30 dias",
    description: "Lee todo el Nuevo Testamento en un mes con lecturas diarias guiadas.",
    books: ["Mateo", "Marcos", "Lucas", "Juan", "Hechos", "Romanos", "1 Corintios", "2 Corintios", "Galatas", "Efesios", "Filipenses", "Colosenses", "1 Tesalonicenses", "2 Tesalonicenses", "1 Timoteo", "2 Timoteo", "Tito", "Filemon", "Hebreos", "Santiago", "1 Pedro", "2 Pedro", "1 Juan", "2 Juan", "3 Juan", "Judas", "Apocalipsis"],
    period: "mensual" as const,
    icon: "📖",
    color: "from-blue-500/20 to-blue-600/10",
  },
  {
    id: "evangelios-7",
    name: "Los 4 Evangelios en 1 semana",
    description: "Sumérgete en la vida de Jesús leyendo los cuatro Evangelios en una semana intensa.",
    books: ["Mateo", "Marcos", "Lucas", "Juan"],
    period: "semanal" as const,
    icon: "✝️",
    color: "from-purple-500/20 to-purple-600/10",
  },
  {
    id: "sabiduria-30",
    name: "Libros de Sabiduria (30 dias)",
    description: "Job, Salmos, Proverbios, Eclesiastés y Cantares para crecer en sabiduria.",
    books: ["Job", "Salmos", "Proverbios", "Eclesiastes", "Cantares"],
    period: "mensual" as const,
    icon: "🕊️",
    color: "from-amber-500/20 to-amber-600/10",
  },
  {
    id: "biblia-completa-365",
    name: "Biblia Completa en 1 año",
    description: "El plan clásico para leer toda la Biblia en 365 días, de Génesis a Apocalipsis.",
    books: [...BIBLE_BOOKS],
    period: "anual" as const,
    icon: "📚",
    color: "from-green-500/20 to-green-600/10",
  },
  {
    id: "cartas-pablo-14",
    name: "Cartas de Pablo (14 dias)",
    description: "Las 13 epístolas del apóstol Pablo en dos semanas de estudio enfocado.",
    books: ["Romanos", "1 Corintios", "2 Corintios", "Galatas", "Efesios", "Filipenses", "Colosenses", "1 Tesalonicenses", "2 Tesalonicenses", "1 Timoteo", "2 Timoteo", "Tito", "Filemon"],
    period: "personalizado" as const,
    icon: "✉️",
    color: "from-red-500/20 to-red-600/10",
  },
  {
    id: "profetas-90",
    name: "Profetas Mayores (90 dias)",
    description: "Isaías, Jeremías, Lamentaciones, Ezequiel y Daniel en un trimestre.",
    books: ["Isaias", "Jeremias", "Lamentaciones", "Ezequiel", "Daniel"],
    period: "trimestral" as const,
    icon: "🔥",
    color: "from-orange-500/20 to-orange-600/10",
  },
];

function ReadingPlansTab({ prefillBooks, prefillPeriod }: { prefillBooks?: string[]; prefillPeriod?: string }) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [viewPublic, setViewPublic] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);
  
  // Generator wizard states
  const [showGenerator, setShowGenerator] = useState(false);
  const [generatorStep, setGeneratorStep] = useState<1 | 2 | 3>(1);
  const [selectedBooks, setSelectedBooks] = useState<string[]>([]);
  const [periodType, setPeriodType] = useState<"semanal" | "mensual" | "trimestral" | "anual" | "personalizado">("mensual");
  const [customDays, setCustomDays] = useState("30");
  const [planName, setPlanName] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [bookSearch, setBookSearch] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // Handle pre-fill from Club suggestions
  const prefillApplied = useRef(false);
  useEffect(() => {
    if (prefillBooks && prefillBooks.length > 0 && !prefillApplied.current) {
      prefillApplied.current = true;
      setSelectedBooks(prefillBooks);
      if (prefillPeriod && ["semanal", "mensual", "trimestral", "anual", "personalizado"].includes(prefillPeriod)) {
        setPeriodType(prefillPeriod as any);
      }
      setShowGenerator(true);
      setGeneratorStep(2); // Go directly to period selection since books are pre-filled
    }
  }, [prefillBooks, prefillPeriod]);

  const { data: plans = [], isLoading } = useReadingPlans(viewPublic);
  const { data: selectedPlan } = useReadingPlan(selectedPlanId || 0);
  const createPlan = useCreateReadingPlan();
  const deletePlan = useDeleteReadingPlan();
  const toggleItem = useToggleReadingPlanItem();
  const bulkAdd = useBulkAddReadingPlanItems();

  const getDays = () => {
    switch (periodType) {
      case "semanal": return 7;
      case "mensual": return 30;
      case "trimestral": return 90;
      case "anual": return 365;
      case "personalizado": return Math.max(1, parseInt(customDays) || 30);
    }
  };

  const getTotalChapters = () => {
    return selectedBooks.reduce((sum, book) => sum + (BOOK_CHAPTERS[book] || 0), 0);
  };

  const getChaptersPerDay = () => {
    const total = getTotalChapters();
    const days = getDays();
    if (days === 0) return 0;
    return Math.ceil(total / days);
  };

  const getEstimatedMinutesPerDay = () => {
    // Roughly 3-5 min per chapter average
    return getChaptersPerDay() * 4;
  };

  const generateSchedule = () => {
    const allChapters: { book: string; chapter: number }[] = [];
    for (const book of selectedBooks) {
      const max = BOOK_CHAPTERS[book] || 1;
      for (let ch = 1; ch <= max; ch++) {
        allChapters.push({ book, chapter: ch });
      }
    }
    const days = getDays();
    const chaptersPerDay = Math.max(1, Math.ceil(allChapters.length / days));
    const schedule: { day: number; chapters: { book: string; chapter: number }[] }[] = [];
    for (let d = 0; d < days; d++) {
      const start = d * chaptersPerDay;
      const end = Math.min(start + chaptersPerDay, allChapters.length);
      if (start >= allChapters.length) break;
      schedule.push({ day: d + 1, chapters: allChapters.slice(start, end) });
    }
    return schedule;
  };

  const toggleBook = (book: string) => {
    setSelectedBooks((prev) => prev.includes(book) ? prev.filter((b) => b !== book) : [...prev, book]);
  };

  const handleCreatePlan = async () => {
    if (!planName.trim() || selectedBooks.length === 0) return;
    setIsGenerating(true);
    const periodLabels: Record<string, string> = {
      semanal: "Semanal (7 dias)",
      mensual: "Mensual (30 dias)",
      trimestral: "Trimestral (90 dias)",
      anual: "Anual (365 dias)",
      personalizado: `Personalizado (${getDays()} dias)`,
    };
    const description = `${periodLabels[periodType]} | ${selectedBooks.join(", ")} | ${getTotalChapters()} capitulos | ~${getChaptersPerDay()} cap/dia`;
    createPlan.mutate({ title: planName.trim(), description, isPublic }, {
      onSuccess: (data: any) => {
        const allChapters: { book: string; chapter: number; sortOrder: number }[] = [];
        let idx = 0;
        for (const book of selectedBooks) {
          const max = BOOK_CHAPTERS[book] || 1;
          for (let ch = 1; ch <= max; ch++) {
            allChapters.push({ book, chapter: ch, sortOrder: idx++ });
          }
        }
        bulkAdd.mutate({ planId: data.id, items: allChapters }, {
          onSuccess: () => {
            setSelectedPlanId(data.id);
            resetGenerator();
            setIsGenerating(false);
          },
          onError: () => setIsGenerating(false),
        });
      },
      onError: () => setIsGenerating(false),
    });
  };

  const resetGenerator = () => {
    setShowGenerator(false);
    setGeneratorStep(1);
    setSelectedBooks([]);
    setPeriodType("mensual");
    setCustomDays("30");
    setPlanName("");
    setIsPublic(false);
    setBookSearch("");
  };

  const applySuggestion = (suggestion: typeof SUGGESTED_PLANS[0]) => {
    setSelectedBooks([...suggestion.books]);
    setPeriodType(suggestion.period);
    if (suggestion.period === "personalizado") {
      const totalChapters = suggestion.books.reduce((sum, book) => sum + (BOOK_CHAPTERS[book] || 0), 0);
      setCustomDays("14");
    }
    setPlanName(suggestion.name);
    setShowGenerator(true);
    setGeneratorStep(2);
    toast({
      title: "Plan sugerido aplicado",
      description: `Se cargó "${suggestion.name}". Puedes ajustar los detalles.`,
    });
  };

  // ===== VIEW: Selected plan detail =====
  if (selectedPlanId && selectedPlan) {
    const completedCount = selectedPlan.items?.filter((i: any) => i.isCompleted).length || 0;
    const totalItems = selectedPlan.items?.length || 0;
    const progressPct = totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;

    // Parse the description to extract period info for daily grouping
    const descMatch = selectedPlan.description?.match(/(\d+)\s*cap\/dia/);
    const chaptersPerDayFromDesc = descMatch ? parseInt(descMatch[1]) : Math.max(1, Math.ceil(totalItems / 30));

    // Group items by day
    const dailyGroups: { day: number; items: any[] }[] = [];
    const items = selectedPlan.items || [];
    for (let i = 0; i < items.length; i += chaptersPerDayFromDesc) {
      const dayItems = items.slice(i, i + chaptersPerDayFromDesc);
      dailyGroups.push({ day: Math.floor(i / chaptersPerDayFromDesc) + 1, items: dayItems });
    }

    // Find current day (first day with incomplete items)
    const currentDayIdx = dailyGroups.findIndex(g => g.items.some((it: any) => !it.isCompleted));

    return (
      <div className="space-y-4">
        <Button variant="ghost" onClick={() => setSelectedPlanId(null)} data-testid="button-back-plans">
          <ChevronLeft className="w-4 h-4 mr-1" /> Volver a Planes
        </Button>

        <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-primary/20">
          <CardContent className="p-5">
            <h2 className="text-xl font-bold">{selectedPlan.title}</h2>
            {selectedPlan.description && (
              <p className="text-sm text-muted-foreground mt-1">{selectedPlan.description}</p>
            )}
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <BookMarked className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Progreso: {completedCount} de {totalItems} capitulos</span>
                </div>
                <span className="text-lg font-bold text-primary">{progressPct}%</span>
              </div>
              <Progress value={progressPct} className="h-3" data-testid="progress-reading-plan" />
              {progressPct === 100 && (
                <p className="text-center text-sm font-medium text-green-600 dark:text-green-400 mt-2">
                  🎉 ¡Felicidades! Has completado todo el plan de lectura.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-2">
          {dailyGroups.map((group, gIdx) => {
            const allCompleted = group.items.every((it: any) => it.isCompleted);
            const someCompleted = group.items.some((it: any) => it.isCompleted);
            const isCurrent = gIdx === currentDayIdx;
            const firstBook = group.items[0]?.book || "";
            const lastBook = group.items[group.items.length - 1]?.book || "";
            const rangeLabel = firstBook === lastBook
              ? `${firstBook} ${group.items[0]?.chapter}${group.items.length > 1 ? `-${group.items[group.items.length - 1]?.chapter}` : ""}`
              : `${firstBook} ${group.items[0]?.chapter} - ${lastBook} ${group.items[group.items.length - 1]?.chapter}`;

            return (
              <Card
                key={gIdx}
                className={`transition-all ${isCurrent ? "ring-2 ring-primary shadow-md" : ""} ${allCompleted ? "opacity-70" : ""}`}
                data-testid={`day-group-${group.day}`}
              >
                <CardContent className="p-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                      allCompleted ? "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400" :
                      isCurrent ? "bg-primary text-primary-foreground" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      {allCompleted ? <Check className="w-5 h-5" /> : group.day}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <p className={`text-sm font-medium ${allCompleted ? "line-through text-muted-foreground" : ""}`}>
                            Dia {group.day}
                          </p>
                          <p className="text-xs text-muted-foreground">{rangeLabel}</p>
                        </div>
                        {isCurrent && !allCompleted && (
                          <Badge className="bg-primary/10 text-primary text-xs">Hoy</Badge>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {group.items.map((item: any) => (
                          <button
                            key={item.id}
                            className={`text-xs px-2 py-1 rounded-md border transition-all ${
                              item.isCompleted
                                ? "bg-green-100 dark:bg-green-900/50 border-green-300 dark:border-green-700 text-green-700 dark:text-green-300 line-through"
                                : "bg-background hover:bg-primary/10 border-border hover:border-primary"
                            }`}
                            onClick={() => {
                              if (selectedPlan.userId === user?.id) {
                                toggleItem.mutate({ id: item.id, planId: selectedPlanId! });
                              }
                            }}
                            title={item.isCompleted ? "Marcar como pendiente" : "Marcar como leido"}
                            data-testid={`toggle-item-${item.id}`}
                          >
                            {item.isCompleted && <Check className="w-3 h-3 inline mr-0.5" />}
                            {item.book} {item.chapter}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  // ===== VIEW: Generator wizard =====
  if (showGenerator) {
    const schedule = generatorStep === 3 ? generateSchedule() : [];
    const filteredBooks = bookSearch
      ? BIBLE_BOOKS.filter((b) => b.toLowerCase().includes(bookSearch.toLowerCase()))
      : BIBLE_BOOKS;
    const atBooks = BIBLE_BOOKS.filter((b) => b === "Genesis");
    const ntStart = BIBLE_BOOKS.indexOf("Mateo");

    return (
      <div className="space-y-4">
        <Button variant="ghost" onClick={resetGenerator} data-testid="button-cancel-generator">
          <ChevronLeft className="w-4 h-4 mr-1" /> Cancelar
        </Button>

        {/* Step indicator */}
        <div className="flex items-center gap-2 justify-center">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                generatorStep === step ? "bg-primary text-primary-foreground" :
                generatorStep > step ? "bg-green-500 text-white" : "bg-muted text-muted-foreground"
              }`}>
                {generatorStep > step ? <Check className="w-4 h-4" /> : step}
              </div>
              {step < 3 && <div className={`w-8 h-0.5 ${generatorStep > step ? "bg-green-500" : "bg-muted"}`} />}
            </div>
          ))}
        </div>

        {/* Step 1: Select books */}
        {generatorStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Paso 1: Selecciona los libros</CardTitle>
              <CardDescription>Elige que libros de la Biblia quieres incluir en tu plan de lectura.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <Button size="sm" variant="outline" onClick={() => setSelectedBooks([...BIBLE_BOOKS])}>
                  Toda la Biblia
                </Button>
                <Button size="sm" variant="outline" onClick={() => setSelectedBooks(BIBLE_BOOKS.slice(0, ntStart) as unknown as string[])}>
                  Antiguo Testamento
                </Button>
                <Button size="sm" variant="outline" onClick={() => setSelectedBooks(BIBLE_BOOKS.slice(ntStart) as unknown as string[])}>
                  Nuevo Testamento
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setSelectedBooks([])}>
                  Limpiar
                </Button>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  className="pl-9"
                  placeholder="Buscar libro..."
                  value={bookSearch}
                  onChange={(e) => setBookSearch(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 max-h-64 overflow-y-auto pr-1">
                {filteredBooks.map((book) => {
                  const isSelected = selectedBooks.includes(book);
                  return (
                    <button
                      key={book}
                      className={`text-left text-sm px-3 py-2 rounded-md border transition-all ${
                        isSelected ? "bg-primary/10 border-primary text-primary font-medium" : "hover:bg-muted border-transparent"
                      }`}
                      onClick={() => toggleBook(book)}
                    >
                      <span className="flex items-center gap-2">
                        {isSelected && <Check className="w-3 h-3" />}
                        {book}
                        <span className="text-xs text-muted-foreground">({BOOK_CHAPTERS[book]})</span>
                      </span>
                    </button>
                  );
                })}
              </div>

              {selectedBooks.length > 0 && (
                <p className="text-sm text-muted-foreground">
                  {selectedBooks.length} libros seleccionados - {getTotalChapters()} capitulos en total
                </p>
              )}

              <div className="flex justify-end">
                <Button onClick={() => setGeneratorStep(2)} disabled={selectedBooks.length === 0}>
                  Siguiente <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Select period */}
        {generatorStep === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Paso 2: Elige tu ritmo de lectura</CardTitle>
              <CardDescription>¿En cuanto tiempo quieres completar tu plan? El sistema organizara los capitulos automaticamente.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {([
                  { value: "semanal" as const, label: "Semanal", days: 7, icon: "⚡", desc: "Lectura intensiva" },
                  { value: "mensual" as const, label: "Mensual", days: 30, icon: "📅", desc: "Ritmo moderado" },
                  { value: "trimestral" as const, label: "Trimestral", days: 90, icon: "📚", desc: "Lectura constante" },
                  { value: "anual" as const, label: "Anual", days: 365, icon: "🌟", desc: "Lectura tranquila" },
                ]).map((opt) => {
                  const chapPerDay = Math.ceil(getTotalChapters() / opt.days);
                  const minsPerDay = chapPerDay * 4;
                  return (
                    <button
                      key={opt.value}
                      className={`text-left p-4 rounded-lg border-2 transition-all ${
                        periodType === opt.value ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => setPeriodType(opt.value)}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{opt.icon}</span>
                        <div>
                          <p className="font-semibold">{opt.label}</p>
                          <p className="text-xs text-muted-foreground">{opt.desc} - {opt.days} dias</p>
                        </div>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium text-primary">{chapPerDay} cap/dia</span>
                        <span className="text-muted-foreground"> · ~{minsPerDay} min/dia</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className={`p-3 rounded-lg border-2 transition-all ${
                periodType === "personalizado" ? "border-primary bg-primary/5" : "border-border"
              }`}>
                <button
                  className="w-full text-left"
                  onClick={() => setPeriodType("personalizado")}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">⚙️</span>
                    <div>
                      <p className="font-semibold">Personalizado</p>
                      <p className="text-xs text-muted-foreground">Define tu propio numero de dias</p>
                    </div>
                  </div>
                </button>
                {periodType === "personalizado" && (
                  <div className="flex items-center gap-2 mt-2">
                    <Input
                      type="number"
                      className="w-24"
                      value={customDays}
                      onChange={(e) => setCustomDays(e.target.value)}
                      min={1}
                      max={1095}
                    />
                    <span className="text-sm text-muted-foreground">dias</span>
                    <span className="text-sm ml-auto">
                      <span className="font-medium text-primary">{getChaptersPerDay()} cap/dia</span>
                      <span className="text-muted-foreground"> · ~{getEstimatedMinutesPerDay()} min/dia</span>
                    </span>
                  </div>
                )}
              </div>

              <Card className="bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                <CardContent className="p-3">
                  <div className="flex items-start gap-2">
                    <BookOpen className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-blue-700 dark:text-blue-300">Recomendacion:</p>
                      <p className="text-blue-600 dark:text-blue-400">
                        {getTotalChapters() <= 30
                          ? "Para pocos capitulos, un plan semanal o mensual es ideal."
                          : getTotalChapters() <= 100
                          ? "Un plan mensual o trimestral te permitira estudiar con calma."
                          : getTotalChapters() <= 500
                          ? "Para esta cantidad, un plan trimestral o anual es lo mas recomendable."
                          : "Para la Biblia completa, un plan anual con ~3-4 capitulos diarios es perfecto."}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setGeneratorStep(1)}>
                  <ChevronLeft className="w-4 h-4 mr-1" /> Atras
                </Button>
                <Button onClick={() => setGeneratorStep(3)}>
                  Siguiente <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Preview & Create */}
        {generatorStep === 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Paso 3: Nombre y Vista Previa</CardTitle>
              <CardDescription>Dale un nombre a tu plan y revisa el calendario de lectura.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Nombre del plan (ej: Mi lectura biblica mensual)"
                value={planName}
                onChange={(e) => setPlanName(e.target.value)}
                data-testid="input-plan-name"
              />
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={isPublic}
                  onCheckedChange={(v) => setIsPublic(!!v)}
                />
                <Label className="text-sm">Compartir este plan con la comunidad</Label>
              </div>

              {/* Summary card */}
              <Card className="bg-gradient-to-r from-primary/10 to-transparent border-primary/20">
                <CardContent className="p-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                    <div>
                      <p className="text-2xl font-bold text-primary">{selectedBooks.length}</p>
                      <p className="text-xs text-muted-foreground">Libros</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-primary">{getTotalChapters()}</p>
                      <p className="text-xs text-muted-foreground">Capitulos</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-primary">{getDays()}</p>
                      <p className="text-xs text-muted-foreground">Dias</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-primary">~{getEstimatedMinutesPerDay()}</p>
                      <p className="text-xs text-muted-foreground">Min/dia</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Schedule preview (first 7 days) */}
              <div>
                <p className="text-sm font-medium mb-2">Vista previa del calendario (primeros dias):</p>
                <div className="space-y-1 max-h-48 overflow-y-auto">
                  {schedule.slice(0, 10).map((day) => (
                    <div key={day.day} className="flex items-center gap-3 p-2 rounded-md bg-muted/30">
                      <span className="w-16 text-xs font-medium text-muted-foreground">Dia {day.day}</span>
                      <span className="text-sm flex-1">
                        {day.chapters.map((c) => `${c.book} ${c.chapter}`).join(", ")}
                      </span>
                    </div>
                  ))}
                  {schedule.length > 10 && (
                    <p className="text-xs text-muted-foreground text-center py-2">
                      ... y {schedule.length - 10} dias mas
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setGeneratorStep(2)}>
                  <ChevronLeft className="w-4 h-4 mr-1" /> Atras
                </Button>
                <Button
                  onClick={handleCreatePlan}
                  disabled={!planName.trim() || isGenerating}
                  data-testid="button-create-plan-final"
                >
                  {isGenerating ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generando...</>
                  ) : (
                    <><BookMarked className="w-4 h-4 mr-2" /> Crear Mi Plan</>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  // ===== VIEW: Plans list =====
  return (
    <div className="space-y-4">
      {/* Header with motivational message */}
      <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <BookMarked className="w-6 h-6 text-primary flex-shrink-0" />
            <div>
              <h3 className="font-semibold">Plan de Lectura Inteligente</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Crea un plan personalizado que organiza tu lectura biblica automaticamente.
                Elige los libros, el tiempo disponible y el sistema dividira los capitulos por dia.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Planes Sugeridos */}
      {user?.isActive && !viewPublic && (
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3 flex items-center gap-2">
            <BookMarked className="w-4 h-4" /> Planes Sugeridos
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {SUGGESTED_PLANS.map((suggestion) => {
              const totalChapters = suggestion.books.reduce((sum, book) => sum + (BOOK_CHAPTERS[book] || 0), 0);
              return (
                <Card
                  key={suggestion.id}
                  className={`cursor-pointer transition-all hover:shadow-md hover:-translate-y-0.5 bg-gradient-to-br ${suggestion.color} border-primary/10`}
                  onClick={() => applySuggestion(suggestion)}
                  data-testid={`card-suggestion-${suggestion.id}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{suggestion.icon}</span>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm leading-tight">{suggestion.name}</h4>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{suggestion.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="secondary" className="text-xs">{suggestion.books.length} libros</Badge>
                          <Badge variant="outline" className="text-xs">{totalChapters} cap.</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <Button
            variant={!viewPublic ? "default" : "outline"}
            size="sm"
            onClick={() => setViewPublic(false)}
            data-testid="button-my-plans"
          >
            Mis Planes
          </Button>
          <Button
            variant={viewPublic ? "default" : "outline"}
            size="sm"
            onClick={() => setViewPublic(true)}
            data-testid="button-public-plans"
          >
            Planes Compartidos
          </Button>
        </div>
        {user?.isActive && (
          <Button onClick={() => setShowGenerator(true)} data-testid="button-create-plan">
            <Plus className="w-4 h-4 mr-1" /> Crear Plan de Lectura
          </Button>
        )}
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 3 }, (_, i) => <Skeleton key={i} className="h-20 w-full" />)}
        </div>
      ) : plans.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <BookMarked className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
            <h3 className="font-medium mb-1">
              {viewPublic ? "No hay planes compartidos aun" : "Aun no tienes planes de lectura"}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {viewPublic
                ? "Se el primero en compartir tu plan con la comunidad."
                : "Crea tu primer plan y organiza tu lectura biblica de forma inteligente."}
            </p>
            {!viewPublic && user?.isActive && (
              <Button onClick={() => setShowGenerator(true)} data-testid="button-empty-create-plan">
                <Plus className="w-4 h-4 mr-1" /> Crear Mi Primer Plan
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3">
          {plans.map((plan: any) => {
            const completedCount = plan.completedCount || 0;
            const totalCount = plan.totalCount || 0;
            const progressPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
            return (
              <Card
                key={plan.id}
                className="hover-elevate cursor-pointer transition-all hover:shadow-md"
                onClick={() => setSelectedPlanId(plan.id)}
                data-testid={`card-plan-${plan.id}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium truncate">{plan.title}</h3>
                        {plan.isPublic && <Badge variant="secondary" className="text-xs">Compartido</Badge>}
                      </div>
                      {plan.description && (
                        <p className="text-xs text-muted-foreground line-clamp-1">{plan.description}</p>
                      )}
                      {plan.user && (
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Por {plan.user.displayName || plan.user.username}
                        </p>
                      )}
                      {totalCount > 0 && (
                        <div className="mt-2 space-y-1">
                          <Progress value={progressPct} className="h-2" />
                          <p className="text-xs text-muted-foreground">{completedCount}/{totalCount} capitulos · {progressPct}%</p>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      {progressPct === 100 && <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">Completado</Badge>}
                      {plan.userId === user?.id && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => { e.stopPropagation(); deletePlan.mutate(plan.id); }}
                          data-testid={`button-delete-plan-${plan.id}`}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ReadingClubTab({ onNavigateToPlan }: { onNavigateToPlan?: (books: string[], period: string) => void }) {
  const { user } = useAuth();
  const { data: whatsappData } = useWhatsappLink();
  const { data: allNotes = [] } = useBibleNotes();

  // Challenge completion tracking via localStorage
  const getChallengeKey = (idx: number) => `club_challenge_${new Date().toISOString().slice(0, 10)}_${idx}`;
  const [completedChallenges, setCompletedChallenges] = useState<Record<string, boolean>>(() => {
    try {
      return JSON.parse(localStorage.getItem("club_completed_challenges") || "{}");
    } catch { return {}; }
  });
  const toggleChallenge = (idx: number) => {
    const key = getChallengeKey(idx);
    const updated = { ...completedChallenges, [key]: !completedChallenges[key] };
    setCompletedChallenges(updated);
    localStorage.setItem("club_completed_challenges", JSON.stringify(updated));
  };

  // Motivational daily content
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  const dailyVerse = DAILY_VERSES[dayOfYear % DAILY_VERSES.length];

  const READING_CHALLENGES = [
    { icon: "📖", title: "Lectura Diaria", desc: "Lee al menos un capitulo de la Biblia cada dia. La constancia es la clave.", tip: "Comienza con un libro corto como Filipenses o Santiago.", action: "bible" as const },
    { icon: "✍️", title: "Diario Espiritual", desc: "Anota lo que Dios te habla cada dia a traves de su Palabra.", tip: "Usa la seccion de notas en la Biblia para guardar tus reflexiones.", action: "journal" as const },
    { icon: "🙏", title: "Lectura + Oracion", desc: "Lee un pasaje y luego ora sobre lo que leiste.", tip: "Convierte los versiculos en oraciones personales.", action: "bible" as const },
    { icon: "👥", title: "Comparte con Alguien", desc: "Lee junto a un amigo o familiar y compartan lo aprendido.", tip: "Unete al grupo de WhatsApp para compartir con la comunidad.", action: "whatsapp" as const },
    { icon: "🎯", title: "Memoriza un Versiculo", desc: "Escoge un versiculo cada semana y memorizalo.", tip: "Escribirlo varias veces ayuda a memorizarlo mas rapido.", action: "bible" as const },
    { icon: "📚", title: "Lee un Libro Completo", desc: "Propon te leer un libro completo de la Biblia este mes.", tip: "El Evangelio de Juan es excelente para comenzar.", action: "plan" as const },
  ];
  const todayChallenge = READING_CHALLENGES[dayOfYear % READING_CHALLENGES.length];

  const READING_TIPS = [
    "Escoge un lugar tranquilo y un horario fijo para tu lectura diaria.",
    "No te preocupes por la cantidad, sino por la calidad de tu tiempo con Dios.",
    "Lee con un corazon abierto, pidiendo al Espiritu Santo que te guie.",
    "Subraya o resalta los versiculos que mas te impacten.",
    "Cuando un versiculo te hable, detente y medita en el.",
    "Relaciona lo que lees con tu vida diaria.",
    "Lee diferentes traducciones para entender mejor el texto.",
    "Comparte lo que aprendes con otros, esto fortalece tu fe.",
    "No te desanimes si pierdes un dia, simplemente reanuda al siguiente.",
    "Celebra cada capitulo y libro que termines de leer.",
  ];
  const todayTip = READING_TIPS[dayOfYear % READING_TIPS.length];

  const BIBLE_READING_PLANS_SUGGESTIONS = [
    { name: "Lectura del Nuevo Testamento", books: ["Mateo","Marcos","Lucas","Juan","Hechos","Romanos","1 Corintios","2 Corintios","Galatas","Efesios","Filipenses","Colosenses","1 Tesalonicenses","2 Tesalonicenses","1 Timoteo","2 Timoteo","Tito","Filemon","Hebreos","Santiago","1 Pedro","2 Pedro","1 Juan","2 Juan","3 Juan","Judas","Apocalipsis"], booksLabel: "Mateo a Apocalipsis", time: "~3 meses", period: "trimestral" },
    { name: "Evangelios en un Mes", books: ["Mateo","Marcos","Lucas","Juan"], booksLabel: "Mateo, Marcos, Lucas, Juan", time: "30 dias", period: "mensual" },
    { name: "Proverbios en un Mes", books: ["Proverbios"], booksLabel: "Proverbios", time: "31 dias", period: "mensual" },
    { name: "Salmos en 2 Meses", books: ["Salmos"], booksLabel: "Salmos", time: "60 dias", period: "personalizado" },
    { name: "Biblia Completa en un Año", books: Object.keys(BOOK_CHAPTERS), booksLabel: "Genesis a Apocalipsis", time: "365 dias", period: "anual" },
    { name: "Cartas de Pablo", books: ["Romanos","1 Corintios","2 Corintios","Galatas","Efesios","Filipenses","Colosenses","1 Tesalonicenses","2 Tesalonicenses","1 Timoteo","2 Timoteo","Tito","Filemon"], booksLabel: "Romanos a Filemon", time: "2 semanas", period: "semanal" },
  ];

  // Sort notes by most recent (by id desc as proxy for time)
  const recentNotes = [...allNotes]
    .sort((a: any, b: any) => (b.id || 0) - (a.id || 0))
    .slice(0, 10);

  const completedTodayCount = READING_CHALLENGES.filter((_, idx) => completedChallenges[getChallengeKey(idx)]).length;

  return (
    <div className="space-y-5">
      {/* Hero: WhatsApp Group - Most Prominent */}
      {whatsappData?.link ? (
        <Card className="border-green-300 dark:border-green-700 bg-gradient-to-r from-green-50 via-green-50/50 to-white dark:from-green-950/40 dark:via-green-950/20 dark:to-transparent shadow-md">
          <CardContent className="p-5">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                <SiWhatsapp className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-lg font-bold text-green-700 dark:text-green-300">Club de Lectura Biblica</h3>
                <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                  Unete a nuestro grupo de WhatsApp donde compartimos lecturas diarias, reflexiones y nos animamos mutuamente en el estudio de la Palabra de Dios.
                </p>
              </div>
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white shadow-lg flex-shrink-0"
                onClick={() => window.open(whatsappData.link, "_blank")}
                data-testid="button-join-whatsapp"
              >
                <SiWhatsapp className="w-5 h-5 mr-2" /> Unirse al Grupo
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-green-200 dark:border-green-800 bg-green-50/30 dark:bg-green-950/10">
          <CardContent className="p-5 text-center">
            <div className="w-14 h-14 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mx-auto mb-3">
              <SiWhatsapp className="h-7 w-7 text-green-500" />
            </div>
            <h3 className="font-semibold text-green-700 dark:text-green-300">Club de Lectura Biblica</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Pronto estara disponible el grupo de WhatsApp. ¡Estate pendiente!
            </p>
          </CardContent>
        </Card>
      )}

      {/* Daily Verse - Prominent */}
      <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-primary/20">
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-2">Versiculo del Dia</p>
              <p className="text-base italic leading-relaxed font-medium">&ldquo;{dailyVerse.text}&rdquo;</p>
              <p className="text-sm text-primary font-medium mt-2">{dailyVerse.ref}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Daily Challenges */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold flex items-center gap-2">
            🎯 Desafios del Dia
          </h3>
          <Badge variant={completedTodayCount === READING_CHALLENGES.length ? "default" : "secondary"} className="text-xs">
            {completedTodayCount}/{READING_CHALLENGES.length} completados
          </Badge>
        </div>
        {completedTodayCount === READING_CHALLENGES.length && (
          <Card className="mb-3 border-green-300 dark:border-green-700 bg-green-50/50 dark:bg-green-950/20">
            <CardContent className="p-3 text-center">
              <span className="text-2xl">🏆</span>
              <p className="text-sm font-bold text-green-700 dark:text-green-300">¡Felicidades! Has completado todos los desafios del dia.</p>
            </CardContent>
          </Card>
        )}
        <div className="grid gap-2 sm:grid-cols-2">
          {READING_CHALLENGES.map((challenge, idx) => {
            const isCompleted = !!completedChallenges[getChallengeKey(idx)];
            const isTodays = idx === (dayOfYear % READING_CHALLENGES.length);
            return (
              <Card
                key={idx}
                className={`transition-all cursor-pointer hover:shadow-md ${isCompleted ? "bg-green-50/40 dark:bg-green-950/10 border-green-200 dark:border-green-800" : ""} ${isTodays && !isCompleted ? "ring-2 ring-amber-400 dark:ring-amber-600" : ""}`}
                onClick={() => toggleChallenge(idx)}
              >
                <CardContent className="p-3">
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-xl">{challenge.icon}</span>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${isCompleted ? "bg-green-500 border-green-500" : "border-muted-foreground/30"}`}>
                        {isCompleted && <Check className="w-3 h-3 text-white" />}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className={`font-medium text-sm ${isCompleted ? "line-through text-muted-foreground" : ""}`}>{challenge.title}</h4>
                        {isTodays && <Badge variant="outline" className="text-xs border-amber-400 text-amber-600">Hoy</Badge>}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{challenge.desc}</p>
                      <p className="text-xs mt-1 flex items-start gap-1">
                        <span className="text-amber-500">💡</span>
                        <span className="text-amber-700 dark:text-amber-300">{challenge.tip}</span>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        {completedTodayCount > 0 && completedTodayCount < READING_CHALLENGES.length && (
          <Progress value={(completedTodayCount / READING_CHALLENGES.length) * 100} className="h-2 mt-3" />
        )}
      </div>

      {/* Reading Tips */}
      <Card>
        <CardContent className="p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
              <Highlighter className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-1">Consejo de Lectura</p>
              <p className="text-sm leading-relaxed">{todayTip}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Diario Espiritual - Real Notes */}
      <div>
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <StickyNote className="w-5 h-5 text-primary" />
          Diario Espiritual
        </h3>
        {recentNotes.length > 0 ? (
          <div className="space-y-2">
            {recentNotes.map((note: any) => (
              <Card key={note.id} className="hover:shadow-sm transition-shadow">
                <CardContent className="p-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <StickyNote className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs">
                          {note.book} {note.chapter}:{note.verse}
                        </Badge>
                        {note.createdAt && (
                          <span className="text-xs text-muted-foreground">
                            {new Date(note.createdAt).toLocaleDateString("es", { day: "numeric", month: "short" })}
                          </span>
                        )}
                      </div>
                      <p className="text-sm leading-relaxed">{note.content}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {allNotes.length > 10 && (
              <p className="text-xs text-muted-foreground text-center">
                Mostrando las 10 notas mas recientes de {allNotes.length} total.
              </p>
            )}
          </div>
        ) : (
          <Card className="border-dashed">
            <CardContent className="p-5 text-center">
              <StickyNote className="w-10 h-10 text-muted-foreground/30 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                Aun no tienes notas. Ve a la pestaña <strong>Biblia</strong>, selecciona un versiculo y agrega una reflexion.
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Tus notas espirituales aparecerán aqui como un diario de fe.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Suggested reading plans - Now clickable */}
      <div>
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <BookMarked className="w-5 h-5 text-primary" />
          Ideas para tu Proximo Plan de Lectura
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {BIBLE_READING_PLANS_SUGGESTIONS.map((plan, idx) => {
            const totalChapters = plan.books.reduce((sum, book) => sum + (BOOK_CHAPTERS[book] || 0), 0);
            return (
              <Card
                key={idx}
                className="hover:shadow-md transition-all cursor-pointer hover:border-primary/50 group"
                onClick={() => onNavigateToPlan?.(plan.books, plan.period)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-medium text-sm group-hover:text-primary transition-colors">{plan.name}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{plan.booksLabel}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs">
                        <Badge variant="outline" className="text-xs">{totalChapters} capitulos</Badge>
                        <span className="text-muted-foreground">{plan.time}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" tabIndex={-1}>
                      <Plus className="w-4 h-4 text-primary" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        <p className="text-sm text-muted-foreground text-center mt-3">
          Haz clic en cualquier idea para crear ese plan de lectura automaticamente.
        </p>
      </div>

      {/* Motivational section */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-purple-200 dark:border-purple-800">
        <CardContent className="p-5 text-center">
          <p className="text-3xl mb-3">✨</p>
          <h3 className="font-bold text-lg mb-2">¿Por que leer la Biblia?</h3>
          <div className="grid gap-3 sm:grid-cols-3 mt-4">
            <div className="text-center">
              <p className="text-2xl mb-1">🌱</p>
              <p className="text-sm font-medium">Crecimiento Espiritual</p>
              <p className="text-xs text-muted-foreground">La Palabra de Dios transforma tu vida dia a dia.</p>
            </div>
            <div className="text-center">
              <p className="text-2xl mb-1">💪</p>
              <p className="text-sm font-medium">Fortaleza</p>
              <p className="text-xs text-muted-foreground">Encuentra fuerzas en los momentos mas dificiles.</p>
            </div>
            <div className="text-center">
              <p className="text-2xl mb-1">🧭</p>
              <p className="text-sm font-medium">Direccion</p>
              <p className="text-xs text-muted-foreground">La Biblia es lampara a tus pies y lumbrera a tu camino.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ResourcesTab() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [category, setCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showUpload, setShowUpload] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [resourceCategory, setResourceCategory] = useState("general");
  const [fileUrl, setFileUrl] = useState("");
  const [fileDataBase64, setFileDataBase64] = useState<string | null>(null);
  const [uploadMode, setUploadMode] = useState<"enlace" | "archivo">("enlace");
  const [uploadingFile, setUploadingFile] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [uploadedFileSize, setUploadedFileSize] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: resources = [], isLoading } = useLibraryResources(category, searchTerm);
  const createResource = useCreateLibraryResource();
  const deleteResource = useDeleteLibraryResource();
  const toggleLike = useToggleLibraryResourceLike();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 20 * 1024 * 1024) {
      toast({ title: "Archivo muy grande", description: "El tamaño máximo es 20MB.", variant: "destructive" });
      return;
    }
    setUploadingFile(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload/library-file", { method: "POST", body: formData, credentials: "include" });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: "Error al subir archivo" }));
        throw new Error(err.message || "Error al subir archivo");
      }
      const data = await res.json();
      setFileDataBase64(data.fileData || null);
      setFileUrl(data.fileData ? "uploaded" : data.fileUrl);
      setUploadedFileName(file.name);
      setUploadedFileSize(file.size);
      toast({ title: "Archivo subido", description: file.name });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setUploadingFile(false);
    }
  };

  const handleShare = () => {
    if (!title.trim()) return;
    if (uploadMode === "enlace" && !fileUrl.trim()) return;
    if (uploadMode === "archivo" && !fileDataBase64) return;
    createResource.mutate({
      title: title.trim(),
      description: description.trim() || null,
      resourceType: uploadMode === "archivo" ? "documento" : "enlace",
      fileUrl: uploadMode === "enlace" ? fileUrl.trim() : null,
      fileName: uploadMode === "archivo" ? uploadedFileName : null,
      fileSize: uploadMode === "archivo" ? uploadedFileSize : null,
      fileData: uploadMode === "archivo" ? fileDataBase64 : null,
      category: resourceCategory,
    }, {
      onSuccess: () => {
        setTitle("");
        setDescription("");
        setFileUrl("");
        setFileDataBase64(null);
        setUploadedFileName("");
        setUploadedFileSize(null);
        setResourceCategory("general");
        setUploadMode("enlace");
        setShowUpload(false);
      },
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Buscar recursos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            data-testid="input-search-resources"
          />
        </div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-40" data-testid="select-resource-category">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            {Object.entries(RESOURCE_CATEGORIES).map(([k, v]) => (
              <SelectItem key={k} value={k}>{v}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {user?.isActive && (
          <Button size="sm" onClick={() => setShowUpload(!showUpload)} data-testid="button-share-resource">
            <Plus className="w-4 h-4 mr-1" /> Compartir Recurso
          </Button>
        )}
      </div>

      {showUpload && (
        <Card>
          <CardContent className="p-4 space-y-3">
            <Input
              placeholder="Titulo del recurso"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              data-testid="input-resource-title"
            />
            <Textarea
              placeholder="Descripción (opcional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              data-testid="input-resource-description"
            />

            {/* Toggle between URL and file upload */}
            <div className="flex gap-2">
              <Button
                type="button"
                size="sm"
                variant={uploadMode === "enlace" ? "default" : "outline"}
                onClick={() => { setUploadMode("enlace"); setFileUrl(""); setFileDataBase64(null); setUploadedFileName(""); setUploadedFileSize(null); }}
              >
                <FileText className="w-4 h-4 mr-1" /> Enlace / URL
              </Button>
              <Button
                type="button"
                size="sm"
                variant={uploadMode === "archivo" ? "default" : "outline"}
                onClick={() => { setUploadMode("archivo"); setFileUrl(""); setFileDataBase64(null); }}
              >
                <Upload className="w-4 h-4 mr-1" /> Subir Archivo
              </Button>
            </div>

            {uploadMode === "enlace" ? (
              <Input
                placeholder="URL del recurso (enlace a PDF, video, etc.)"
                value={fileUrl}
                onChange={(e) => setFileUrl(e.target.value)}
                data-testid="input-resource-url"
              />
            ) : (
              <div className="space-y-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.jpg,.jpeg,.png,.gif,.webp"
                  onChange={handleFileUpload}
                />
                {uploadedFileName ? (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 border">
                    <FileText className="w-5 h-5 text-primary flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">{uploadedFileName}</p>
                      {uploadedFileSize && <p className="text-xs text-muted-foreground">{formatFileSize(uploadedFileSize)}</p>}
                    </div>
                    <Button size="sm" variant="ghost" onClick={() => { setFileUrl(""); setFileDataBase64(null); setUploadedFileName(""); setUploadedFileSize(null); }}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-20 border-dashed"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingFile}
                  >
                    {uploadingFile ? (
                      <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Subiendo archivo...</>
                    ) : (
                      <><Upload className="w-5 h-5 mr-2" /> Seleccionar archivo (PDF, Word, Excel, PPT, max 20MB)</>
                    )}
                  </Button>
                )}
              </div>
            )}

            <Select value={resourceCategory} onValueChange={setResourceCategory}>
              <SelectTrigger data-testid="select-new-resource-category">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(RESOURCE_CATEGORIES).map(([k, v]) => (
                  <SelectItem key={k} value={k}>{v}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2">
              <Button size="sm" onClick={handleShare} disabled={!title.trim() || (uploadMode === "enlace" ? !fileUrl.trim() : !fileDataBase64) || createResource.isPending} data-testid="button-submit-resource">
                {createResource.isPending ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <Send className="w-4 h-4 mr-1" />}
                Compartir
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setShowUpload(false)} data-testid="button-cancel-resource">
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {isLoading ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {Array.from({ length: 4 }, (_, i) => <Skeleton key={i} className="h-32" />)}
        </div>
      ) : resources.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground">
              No se encontraron recursos. Se el primero en compartir material educativo.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {resources.map((r: any) => (
            <Card key={r.id} data-testid={`card-resource-${r.id}`}>
              <CardContent className="p-4 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="font-medium truncate">{r.title}</h3>
                    {r.description && <p className="text-sm text-muted-foreground line-clamp-2">{r.description}</p>}
                  </div>
                  <Badge variant="secondary">
                    {RESOURCE_CATEGORIES[r.category as keyof typeof RESOURCE_CATEGORIES] || r.category}
                  </Badge>
                </div>

                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-xs text-muted-foreground">
                    Por {r.user.displayName || r.user.username} - {new Date(r.createdAt).toLocaleDateString("es")}
                  </span>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleLike.mutate(r.id)}
                      data-testid={`button-like-${r.id}`}
                    >
                      <Heart className={`w-4 h-4 mr-1 ${r.isLiked ? "fill-red-500 text-red-500" : ""}`} />
                      {r.likeCount}
                    </Button>
                    {(r.fileUrl || r.fileData) && (
                      <Button variant="ghost" size="sm" asChild={!r.fileData}>
                        {r.fileData ? (
                          <span
                            className="cursor-pointer"
                            onClick={() => {
                              // Download from base64 data stored in DB
                              const link = document.createElement("a");
                              link.href = r.fileData;
                              link.download = r.fileName || "archivo";
                              link.click();
                            }}
                            data-testid={`link-resource-${r.id}`}
                          >
                            <Download className="w-4 h-4 mr-1" /> {r.resourceType === "documento" ? "Descargar" : "Ver"}
                          </span>
                        ) : (
                          <a href={r.fileUrl} target="_blank" rel="noopener noreferrer" data-testid={`link-resource-${r.id}`}>
                            <Download className="w-4 h-4 mr-1" /> {r.resourceType === "documento" ? "Descargar" : "Ver"}
                          </a>
                        )}
                      </Button>
                    )}
                    {(user?.role === "admin" || r.userId === user?.id) && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteResource.mutate(r.id)}
                        data-testid={`button-delete-resource-${r.id}`}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default function BibliotecaPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("biblia");
  const [prefillBooks, setPrefillBooks] = useState<string[] | undefined>();
  const [prefillPeriod, setPrefillPeriod] = useState<string | undefined>();

  const handleNavigateToPlan = (books: string[], period: string) => {
    setPrefillBooks(books);
    setPrefillPeriod(period);
    setActiveTab("planes");
  };

  // Reset prefill when leaving planes tab
  useEffect(() => {
    if (activeTab !== "planes") {
      setPrefillBooks(undefined);
      setPrefillPeriod(undefined);
    }
  }, [activeTab]);

  if (!user) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <Library className="w-16 h-16 mx-auto text-primary mb-4" />
          <h1 className="text-3xl font-bold mb-2">Biblioteca</h1>
          <p className="text-muted-foreground mb-6">
            Inicia sesion para acceder a la Biblia de estudio, planes de lectura, club de lectura y recursos compartidos.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link href="/login">
              <Button variant="outline" data-testid="link-login-biblioteca">Iniciar Sesion</Button>
            </Link>
            <Link href="/registro">
              <Button data-testid="link-register-biblioteca">Unirse</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  if (!user.isActive) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <Library className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-3xl font-bold mb-2">Biblioteca</h1>
          <p className="text-muted-foreground">
            Tu cuenta esta pendiente de aprobacion. Una vez aprobada, podras acceder a todos los recursos de la biblioteca.
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold flex items-center gap-3" data-testid="text-biblioteca-title">
            <Library className="w-8 h-8 text-primary" />
            Biblioteca
          </h1>
          <p className="text-muted-foreground mt-1">
            Estudia la Biblia, crea planes de lectura, comparte reflexiones y recursos con la comunidad.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="biblia" data-testid="tab-biblia">
              <BookOpen className="w-4 h-4 mr-1 hidden sm:inline" /> Biblia
            </TabsTrigger>
            <TabsTrigger value="planes" data-testid="tab-planes">
              <BookMarked className="w-4 h-4 mr-1 hidden sm:inline" /> Planes
            </TabsTrigger>
            <TabsTrigger value="club" data-testid="tab-club">
              <Users className="w-4 h-4 mr-1 hidden sm:inline" /> Club
            </TabsTrigger>
            <TabsTrigger value="recursos" data-testid="tab-recursos">
              <FileText className="w-4 h-4 mr-1 hidden sm:inline" /> Recursos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="biblia" className="mt-4">
            <BibleTab />
          </TabsContent>
          <TabsContent value="planes" className="mt-4">
            <ReadingPlansTab prefillBooks={prefillBooks} prefillPeriod={prefillPeriod} />
          </TabsContent>
          <TabsContent value="club" className="mt-4">
            <ReadingClubTab onNavigateToPlan={handleNavigateToPlan} />
          </TabsContent>
          <TabsContent value="recursos" className="mt-4">
            <ResourcesTab />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}