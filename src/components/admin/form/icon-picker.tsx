"use client";

import * as React from "react";
import {
  Search,
  X,
  ChevronDown,
  Code,
  Code2,
  CodeXml,
  Terminal,
  Braces,
  Brackets,
  Binary,
  Bug,
  GitBranch,
  GitFork,
  GitMerge,
  GitPullRequest,
  Server,
  ServerCog,
  Database,
  HardDrive,
  Cloud,
  CloudCog,
  CloudUpload,
  Cpu,
  MemoryStick,
  Network,
  Router,
  Wifi,
  Globe,
  Container,
  Boxes,
  Box,
  Package,
  PackageOpen,
  Layers,
  Component,
  Blocks,
  LayoutGrid,
  LayoutDashboard,
  PanelsTopLeft,
  Rocket,
  Zap,
  Sparkles,
  Flame,
  Star,
  Wand2,
  WandSparkles,
  Bot,
  BrainCircuit,
  Brain,
  Atom,
  FlaskConical,
  Beaker,
  Palette,
  Brush,
  PenTool,
  Shapes,
  Frame,
  Image as ImageIcon,
  Images,
  Camera,
  Video,
  Film,
  Music,
  Headphones,
  Mic,
  Smartphone,
  Tablet,
  Monitor,
  Laptop,
  MousePointer,
  Keyboard,
  Lock,
  LockKeyhole,
  Shield,
  ShieldCheck,
  KeyRound,
  Key,
  Fingerprint,
  ScanFace,
  Eye,
  Mail,
  MailOpen,
  Send,
  MessageSquare,
  MessagesSquare,
  Bell,
  Inbox,
  Users,
  User,
  UserPlus,
  UserCheck,
  Contact,
  Briefcase,
  Building2,
  Store,
  ShoppingCart,
  ShoppingBag,
  CreditCard,
  Wallet,
  DollarSign,
  Euro,
  BadgeCheck,
  Award,
  Trophy,
  Medal,
  GraduationCap,
  BookOpen,
  Book,
  Library,
  Newspaper,
  FileText,
  FileCode,
  Files,
  Folder,
  FolderGit2,
  FolderOpen,
  Settings,
  Settings2,
  SlidersHorizontal,
  Wrench,
  Hammer,
  Cog,
  PlugZap,
  Power,
  Activity,
  BarChart3,
  LineChart,
  PieChart,
  TrendingUp,
  Gauge,
  Target,
  Crosshair,
  Radar,
  Calendar,
  Clock,
  Timer,
  Hourglass,
  MapPin,
  Map,
  Navigation,
  Compass,
  Route,
  Milestone,
  Flag,
  Link,
  Link2,
  ExternalLink,
  Share2,
  Rss,
  Bookmark,
  Hash,
  AtSign,
  Heart,
  ThumbsUp,
  Handshake,
  Play,
  RefreshCw,
  Download,
  Upload,
  Save,
  Copy,
  Sun,
  Moon,
  Feather,
  Leaf,
  Sprout,
  TreePine,
  Mountain,
  Waves,
  Lightbulb,
  Puzzle,
  Workflow,
  Webhook,
  Cable,
  Usb,
  Bluetooth,
  QrCode,
  Barcode,
  ScanLine,
  Accessibility,
  Languages,
  Table,
  Kanban,
  ListChecks,
  Infinity as InfinityIcon,
  type LucideIcon,
} from "lucide-react";

export const ICON_LIBRARY: Record<string, LucideIcon> = {
  Code, Code2, CodeXml, Terminal, Braces, Brackets, Binary, Bug,
  GitBranch, GitFork, GitMerge, GitPullRequest,
  Server, ServerCog, Database, HardDrive, Cloud, CloudCog, CloudUpload,
  Cpu, MemoryStick, Network, Router, Wifi, Globe, Container,
  Boxes, Box, Package, PackageOpen, Layers, Component, Blocks,
  LayoutGrid, LayoutDashboard, PanelsTopLeft,
  Rocket, Zap, Sparkles, Flame, Star, Wand2, WandSparkles,
  Bot, BrainCircuit, Brain, Atom, FlaskConical, Beaker,
  Palette, Brush, PenTool, Shapes, Frame, Image: ImageIcon, Images,
  Camera, Video, Film, Music, Headphones, Mic,
  Smartphone, Tablet, Monitor, Laptop, MousePointer, Keyboard,
  Lock, LockKeyhole, Shield, ShieldCheck, KeyRound, Key, Fingerprint, ScanFace, Eye,
  Mail, MailOpen, Send, MessageSquare, MessagesSquare, Bell, Inbox,
  Users, User, UserPlus, UserCheck, Contact,
  Briefcase, Building2, Store, ShoppingCart, ShoppingBag, CreditCard, Wallet, DollarSign, Euro,
  BadgeCheck, Award, Trophy, Medal, GraduationCap, BookOpen, Book, Library, Newspaper,
  FileText, FileCode, Files, Folder, FolderGit2, FolderOpen,
  Settings, Settings2, SlidersHorizontal, Wrench, Hammer, Cog, PlugZap, Power,
  Activity, BarChart3, LineChart, PieChart, TrendingUp, Gauge, Target, Crosshair, Radar,
  Calendar, Clock, Timer, Hourglass,
  MapPin, Map, Navigation, Compass, Route, Milestone, Flag,
  Link, Link2, ExternalLink, Share2, Rss, Bookmark, Hash, AtSign,
  Heart, ThumbsUp, Handshake, Play, RefreshCw, Download, Upload, Save, Copy,
  Sun, Moon, Feather, Leaf, Sprout, TreePine, Mountain, Waves,
  Lightbulb, Puzzle, Workflow, Webhook, Cable, Usb, Bluetooth, QrCode, Barcode, ScanLine,
  Accessibility, Languages, Table, Kanban, ListChecks, Infinity: InfinityIcon,
};

const ICON_NAMES = Object.keys(ICON_LIBRARY);

export function IconPicker({
  label,
  name,
  defaultValue,
  hint,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  hint?: string;
}) {
  const [value, setValue] = React.useState(defaultValue ?? "");
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const rootRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const results = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ICON_NAMES;
    return ICON_NAMES.filter((n) => n.toLowerCase().includes(q));
  }, [query]);

  const Selected = value ? ICON_LIBRARY[value] : null;

  return (
    <div className="space-y-1.5" ref={rootRef}>
      <label className="font-mono text-[13px] font-medium">{label}</label>
      <input type="hidden" name={name} value={value} />

      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="border-input bg-background/60 hover:border-accent/50 flex w-full items-center gap-2 rounded-md border px-3 py-2 text-left text-sm transition-colors"
        >
          <span className="border-border bg-muted/40 text-accent flex size-7 items-center justify-center rounded-md border">
            {Selected ? <Selected className="size-4" /> : <Search className="size-4 opacity-40" />}
          </span>
          <span className={value ? "font-mono" : "text-muted-foreground"}>
            {value || "Choisir une icône…"}
          </span>
          <span className="ml-auto flex items-center gap-1">
            {value && (
              <X
                className="text-muted-foreground hover:text-destructive size-4"
                onClick={(e) => {
                  e.stopPropagation();
                  setValue("");
                }}
              />
            )}
            <ChevronDown className="text-muted-foreground size-4" />
          </span>
        </button>

        {open && (
          <div className="border-border bg-popover absolute z-20 mt-1 w-full rounded-md border p-2 shadow-xl">
            <div className="border-input bg-background/60 mb-2 flex items-center gap-2 rounded-md border px-2">
              <Search className="text-muted-foreground size-4" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher…"
                className="w-full bg-transparent py-2 text-sm outline-none"
              />
            </div>
            <div className="grid max-h-56 grid-cols-8 gap-1 overflow-y-auto">
              {results.map((n) => {
                const Icon = ICON_LIBRARY[n];
                return (
                  <button
                    key={n}
                    type="button"
                    title={n}
                    onClick={() => {
                      setValue(n);
                      setOpen(false);
                      setQuery("");
                    }}
                    className={`hover:bg-accent/15 hover:text-accent flex aspect-square items-center justify-center rounded-md transition-colors ${
                      value === n ? "bg-accent/15 text-accent" : "text-muted-foreground"
                    }`}
                  >
                    <Icon className="size-4" />
                  </button>
                );
              })}
              {results.length === 0 && (
                <p className="text-muted-foreground col-span-8 py-4 text-center text-xs">
                  Aucune icône
                </p>
              )}
            </div>
          </div>
        )}
      </div>
      {hint && <p className="text-muted-foreground text-xs">{hint}</p>}
    </div>
  );
}
