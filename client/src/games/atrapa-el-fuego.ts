/**
 * "Atrapa el fuego": mueve la lámpara para recoger las llamas que caen. Las doradas valen 5,
 * las gotas de aceite devuelven una vida y las nubes de humo quitan una. Cada 20 puntos
 * sube el nivel (caen más rápido). Juego original del ministerio, dibujado en código.
 */
import type { GameApi, GameInput, GameScene } from "./engine";

type Kind = "flame" | "gold" | "oil" | "smoke";
type Item = { kind: Kind; x: number; y: number; vy: number; r: number; wobble: number };
type Particle = { x: number; y: number; vx: number; vy: number; life: number; max: number; color: string; size: number };
type Floater = { x: number; y: number; text: string; life: number; color: string };

const FLAME = typeof Path2D !== "undefined"
  ? new Path2D("M20,3 C22.5,8 31,15 31,25 C31,36.5 26,45 20,48 C14,45 9,36.5 9,25 C9,15 17.5,8 20,3 Z")
  : null;
const FLAME_INNER = typeof Path2D !== "undefined"
  ? new Path2D("M20,15 C21.5,19.5 25.5,23 25.5,29.5 C25.5,35.5 23,40 20,42 C17,40 14.5,35.5 14.5,29.5 C14.5,23 18.5,19.5 20,15 Z")
  : null;

const rand = (a: number, b: number) => a + Math.random() * (b - a);
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

export class AtrapaElFuego implements GameScene {
  readonly width = 360;
  readonly height = 600;
  private api!: GameApi;
  private lampX = 180;
  private readonly lampY = 540;
  private readonly lampW = 74;
  private items: Item[] = [];
  private particles: Particle[] = [];
  private floaters: Floater[] = [];
  private stars: { x: number; y: number; r: number; p: number }[] = [];
  private score = 0;
  private lives = 3;
  private level = 1;
  private combo = 0;
  private spawnIn = 0.6;
  private shake = 0;
  private flash = 0;
  private dead = false;
  private t = 0;

  init(api: GameApi) {
    this.api = api;
    this.lampX = this.width / 2;
    this.items = [];
    this.particles = [];
    this.floaters = [];
    this.score = 0;
    this.lives = 3;
    this.level = 1;
    this.combo = 0;
    this.spawnIn = 0.6;
    this.shake = 0;
    this.flash = 0;
    this.dead = false;
    this.t = 0;
    this.stars = Array.from({ length: 46 }, () => ({ x: rand(0, this.width), y: rand(0, this.height * 0.75), r: rand(0.4, 1.6), p: rand(0, Math.PI * 2) }));
    api.setScore(0);
    api.setLives(3);
    api.setLevel(1);
  }

  private get multiplier() {
    return this.combo >= 25 ? 3 : this.combo >= 10 ? 2 : 1;
  }

  private spawn() {
    const smokeChance = Math.min(0.12 + this.level * 0.025, 0.36);
    const oilChance = this.lives < 3 ? 0.05 : 0.015;
    const roll = Math.random();
    const kind: Kind = roll < smokeChance ? "smoke" : roll < smokeChance + 0.06 ? "gold" : roll < smokeChance + 0.06 + oilChance ? "oil" : "flame";
    const r = kind === "smoke" ? 19 : kind === "oil" ? 12 : 14;
    this.items.push({ kind, x: rand(r + 8, this.width - r - 8), y: -r * 2, vy: 115 + this.level * 17 + rand(0, 45), r, wobble: rand(0, Math.PI * 2) });
  }

  private burst(x: number, y: number, color: string, n = 14) {
    for (let i = 0; i < n; i++) {
      const a = rand(0, Math.PI * 2);
      const s = rand(40, 170);
      this.particles.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 60, life: 0, max: rand(0.35, 0.8), color, size: rand(1.5, 3.5) });
    }
  }

  private float(x: number, y: number, text: string, color: string) {
    this.floaters.push({ x, y, text, life: 0, color });
  }

  private collect(item: Item) {
    const api = this.api;
    switch (item.kind) {
      case "flame": {
        this.combo++;
        const m = this.multiplier;
        this.score += m;
        api.sound("catch");
        this.burst(item.x, item.y, "#fb923c", 10);
        this.float(item.x, item.y - 10, `+${m}`, "#fde68a");
        if (this.combo === 10 || this.combo === 25) this.float(this.lampX, this.lampY - 60, `¡Racha x${this.multiplier}!`, "#fbbf24");
        break;
      }
      case "gold": {
        this.combo++;
        const pts = 5 * this.multiplier;
        this.score += pts;
        api.sound("bonus");
        this.burst(item.x, item.y, "#fde047", 22);
        this.float(item.x, item.y - 10, `+${pts}`, "#fef08a");
        break;
      }
      case "oil":
        if (this.lives < 3) {
          this.lives++;
          api.sound("life");
          this.float(item.x, item.y - 10, "+1 ♥", "#fca5a5");
        } else {
          this.score += 3;
          api.sound("catch");
          this.float(item.x, item.y - 10, "+3", "#fde68a");
        }
        this.burst(item.x, item.y, "#f59e0b", 12);
        break;
      case "smoke":
        this.lives--;
        this.combo = 0;
        this.shake = 0.35;
        this.flash = 0.25;
        api.sound("hit");
        api.vibrate(120);
        this.burst(item.x, item.y, "#6b7280", 18);
        this.float(item.x, item.y - 10, "-1 ♥", "#9ca3af");
        break;
    }
    const newLevel = Math.min(1 + Math.floor(this.score / 20), 15);
    if (newLevel > this.level) {
      this.level = newLevel;
      api.sound("level");
      api.setLevel(this.level);
      this.float(this.width / 2, this.height * 0.38, `¡Nivel ${this.level}!`, "#fdba74");
    }
    api.setScore(this.score);
    api.setLives(this.lives);
    if (this.lives <= 0 && !this.dead) {
      this.dead = true;
      api.gameOver(this.score);
    }
  }

  update(dt: number, input: GameInput) {
    if (this.dead) return;
    this.t += dt;
    // La lámpara sigue el dedo (o el ratón al hacer clic); con teclado, flechas o A/D.
    if (input.pointerX !== null && (input.pointerDown || input.tapped)) {
      const target = clamp(input.pointerX, this.lampW / 2, this.width - this.lampW / 2);
      this.lampX += (target - this.lampX) * Math.min(1, dt * 16);
    } else {
      const dir = (input.right ? 1 : 0) - (input.left ? 1 : 0);
      this.lampX = clamp(this.lampX + dir * (330 + this.level * 8) * dt, this.lampW / 2, this.width - this.lampW / 2);
    }

    this.spawnIn -= dt;
    if (this.spawnIn <= 0) {
      this.spawn();
      this.spawnIn = Math.max(0.32, 0.95 - this.level * 0.05) * rand(0.75, 1.2);
    }

    for (const it of this.items) {
      it.y += it.vy * dt;
      it.x = clamp(it.x + Math.sin(this.t * 2.6 + it.wobble) * 14 * dt, it.r, this.width - it.r);
    }
    const caught: Item[] = [];
    this.items = this.items.filter((it) => {
      const near = it.y + it.r >= this.lampY - 14 && it.y - it.r <= this.lampY + 12;
      if (near && Math.abs(it.x - this.lampX) <= this.lampW / 2 + it.r * 0.5) {
        caught.push(it);
        return false;
      }
      if (it.y - it.r > this.height) {
        if (it.kind === "flame" || it.kind === "gold") this.combo = 0; // se escapó: se corta la racha
        return false;
      }
      return true;
    });
    for (const it of caught) this.collect(it);

    for (const p of this.particles) {
      p.life += dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vy += 260 * dt;
    }
    this.particles = this.particles.filter((p) => p.life < p.max);
    for (const f of this.floaters) {
      f.life += dt;
      f.y -= 38 * dt;
    }
    this.floaters = this.floaters.filter((f) => f.life < 1);
    this.shake = Math.max(0, this.shake - dt);
    this.flash = Math.max(0, this.flash - dt);
  }

  private drawFlame(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, gold: boolean, time: number) {
    if (!FLAME || !FLAME_INNER) return;
    const s = size / 26;
    const flick = 1 + Math.sin(time * 0.012 + x) * 0.06;
    ctx.save();
    ctx.translate(x - 20 * s, y - 28 * s * flick);
    ctx.scale(s, s * flick);
    ctx.shadowColor = gold ? "rgba(253, 224, 71, 0.9)" : "rgba(249, 115, 22, 0.85)";
    ctx.shadowBlur = 18;
    const g = ctx.createLinearGradient(20, 48, 20, 3);
    if (gold) {
      g.addColorStop(0, "#ca8a04");
      g.addColorStop(0.5, "#facc15");
      g.addColorStop(1, "#fefce8");
    } else {
      g.addColorStop(0, "#b91c1c");
      g.addColorStop(0.35, "#ea580c");
      g.addColorStop(0.7, "#f97316");
      g.addColorStop(1, "#fbbf24");
    }
    ctx.fillStyle = g;
    ctx.fill(FLAME);
    ctx.shadowBlur = 0;
    const gi = ctx.createLinearGradient(20, 42, 20, 15);
    gi.addColorStop(0, gold ? "#fde047" : "#fb923c");
    gi.addColorStop(1, "#fffbeb");
    ctx.fillStyle = gi;
    ctx.globalAlpha = 0.85;
    ctx.fill(FLAME_INNER);
    ctx.restore();
  }

  private drawOil(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
    ctx.save();
    ctx.shadowColor = "rgba(245, 158, 11, 0.7)";
    ctx.shadowBlur = 12;
    const g = ctx.createRadialGradient(x - r * 0.3, y, r * 0.2, x, y + r * 0.2, r * 1.3);
    g.addColorStop(0, "#fde68a");
    g.addColorStop(1, "#b45309");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.moveTo(x, y - r * 1.5);
    ctx.bezierCurveTo(x + r * 0.4, y - r * 0.6, x + r, y - r * 0.1, x + r, y + r * 0.4);
    ctx.arc(x, y + r * 0.4, r, 0, Math.PI);
    ctx.bezierCurveTo(x - r, y - r * 0.1, x - r * 0.4, y - r * 0.6, x, y - r * 1.5);
    ctx.fill();
    ctx.restore();
  }

  private drawSmoke(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, time: number) {
    ctx.save();
    const puff = (dx: number, dy: number, rr: number, c: string) => {
      ctx.fillStyle = c;
      ctx.beginPath();
      ctx.arc(x + dx, y + dy, rr, 0, Math.PI * 2);
      ctx.fill();
    };
    const wob = Math.sin(time * 0.006 + x) * 1.5;
    puff(-r * 0.55, r * 0.15, r * 0.62, "rgba(55, 55, 66, 0.95)");
    puff(r * 0.55, r * 0.2, r * 0.58, "rgba(55, 55, 66, 0.95)");
    puff(0, -r * 0.2 + wob, r * 0.78, "rgba(75, 75, 88, 0.97)");
    puff(-r * 0.15, -r * 0.35 + wob, r * 0.35, "rgba(110, 110, 125, 0.6)");
    ctx.restore();
  }

  private drawLamp(ctx: CanvasRenderingContext2D, time: number) {
    const x = this.lampX;
    const y = this.lampY;
    const w = this.lampW;
    ctx.save();
    // resplandor en el piso
    const glow = ctx.createRadialGradient(x, y + 20, 4, x, y + 20, 90);
    glow.addColorStop(0, `rgba(249, 115, 22, ${0.22 + Math.min(this.combo, 25) * 0.008})`);
    glow.addColorStop(1, "rgba(249, 115, 22, 0)");
    ctx.fillStyle = glow;
    ctx.fillRect(x - 100, y - 70, 200, 150);
    // asa
    ctx.strokeStyle = "#92400e";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(x - w * 0.52, y + 4, 9, Math.PI * 0.5, Math.PI * 1.5);
    ctx.stroke();
    // cuerpo de barro
    const body = ctx.createLinearGradient(x, y - 14, x, y + 22);
    body.addColorStop(0, "#d97706");
    body.addColorStop(0.5, "#b45309");
    body.addColorStop(1, "#78350f");
    ctx.fillStyle = body;
    ctx.beginPath();
    ctx.ellipse(x, y + 6, w / 2, 17, 0, 0, Math.PI * 2);
    ctx.fill();
    // pico
    ctx.beginPath();
    ctx.moveTo(x + w * 0.3, y - 2);
    ctx.quadraticCurveTo(x + w * 0.62, y - 4, x + w * 0.68, y - 12);
    ctx.lineTo(x + w * 0.62, y + 8);
    ctx.quadraticCurveTo(x + w * 0.45, y + 10, x + w * 0.3, y + 10);
    ctx.fill();
    // boca de la lámpara (donde caen las llamas)
    ctx.fillStyle = "#451a03";
    ctx.beginPath();
    ctx.ellipse(x, y - 8, w * 0.32, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(253, 230, 138, 0.55)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.ellipse(x, y + 6, w / 2 - 3, 14, 0, Math.PI * 1.1, Math.PI * 1.9);
    ctx.stroke();
    ctx.restore();
    // la llamita del pico crece con la racha
    this.drawFlame(ctx, x + w * 0.66, y - 12, 13 + Math.min(this.combo, 25) * 0.45, false, time);
  }

  render(ctx: CanvasRenderingContext2D, time: number) {
    const W = this.width;
    const H = this.height;
    ctx.save();
    if (this.shake > 0) ctx.translate(rand(-5, 5) * this.shake * 3, rand(-5, 5) * this.shake * 3);
    const sky = ctx.createLinearGradient(0, 0, 0, H);
    sky.addColorStop(0, "#0b0a1f");
    sky.addColorStop(0.65, "#1c1030");
    sky.addColorStop(1, "#3a1406");
    ctx.fillStyle = sky;
    ctx.fillRect(-10, -10, W + 20, H + 20);
    for (const s of this.stars) {
      ctx.globalAlpha = 0.35 + Math.sin(time * 0.002 + s.p) * 0.3;
      ctx.fillStyle = "#fef3c7";
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    // cerros
    ctx.fillStyle = "#120a12";
    ctx.beginPath();
    ctx.moveTo(0, H);
    ctx.lineTo(0, H - 70);
    ctx.quadraticCurveTo(W * 0.25, H - 120, W * 0.5, H - 78);
    ctx.quadraticCurveTo(W * 0.78, H - 40, W, H - 96);
    ctx.lineTo(W, H);
    ctx.fill();

    for (const it of this.items) {
      if (it.kind === "flame") this.drawFlame(ctx, it.x, it.y, it.r * 2, false, time);
      else if (it.kind === "gold") this.drawFlame(ctx, it.x, it.y, it.r * 2.2, true, time);
      else if (it.kind === "oil") this.drawOil(ctx, it.x, it.y, it.r);
      else this.drawSmoke(ctx, it.x, it.y, it.r, time);
    }
    this.drawLamp(ctx, time);

    for (const p of this.particles) {
      ctx.globalAlpha = 1 - p.life / p.max;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.textAlign = "center";
    for (const f of this.floaters) {
      ctx.globalAlpha = 1 - f.life;
      ctx.fillStyle = f.color;
      ctx.font = "bold 18px system-ui, sans-serif";
      ctx.fillText(f.text, f.x, f.y);
    }
    ctx.globalAlpha = 1;
    if (this.multiplier > 1) {
      ctx.fillStyle = "rgba(251, 191, 36, 0.95)";
      ctx.font = "bold 15px system-ui, sans-serif";
      ctx.fillText(`Racha x${this.multiplier}`, this.lampX, this.lampY + 44);
    }
    if (this.flash > 0) {
      ctx.fillStyle = `rgba(80, 80, 95, ${this.flash})`;
      ctx.fillRect(0, 0, W, H);
    }
    ctx.restore();
  }
}
