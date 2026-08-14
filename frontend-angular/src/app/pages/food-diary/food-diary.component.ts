import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AiService } from '../../services/ai.service';
import { MealEntryItem } from '../../models/user.model';

@Component({
  selector: 'app-food-diary',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
      <!-- Header -->
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FF9466]/20 text-[#E0663B] flex items-center justify-center font-bold text-lg">
            🥗
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">Daily Food Diary</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Track 100g (solids) & 100ml (liquids), edit custom nutrients, and estimate facts using Smart AI.
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3 py-1.5 rounded-full text-xs font-semibold">
          <span>✅ Daily Streak: 4 Days (+10 Coins)</span>
        </div>
      </div>

      <!-- Summary Totals Bar -->
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-5 grid grid-cols-2 sm:grid-cols-4 gap-4 shadow-xs">
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Calories</span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-slate-900 dark:text-white">{{ totalCalories }}</span>
            <span className="text-xs text-slate-400">/ {{ targets.daily_calories }} kcal</span>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Protein</span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-rose-500">{{ totalProtein }}g</span>
            <span className="text-xs text-slate-400">/ {{ targets.protein_g }}g</span>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Carbohydrates</span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-amber-500">{{ totalCarbs }}g</span>
            <span className="text-xs text-slate-400">/ {{ targets.carbs_g }}g</span>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Fats</span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-[#38BDF8]">{{ totalFat }}g</span>
            <span className="text-xs text-slate-400">/ {{ targets.fat_g }}g</span>
          </div>
        </div>
      </div>

      <!-- Meal Types Sections -->
      <div className="flex flex-col gap-4">
        <div *ngFor="let meal of mealTypeConfig" className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-5 flex flex-col gap-3 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700/80">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
                {{ meal.icon }}
              </div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">{{ meal.label }}</h2>
              <span className="text-xs text-slate-500 dark:text-slate-400">({{ getMealCalories(meal.type) }} kcal)</span>
            </div>

            <button
              (click)="openAddModal(meal.type)"
              className="px-3 py-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold hover:bg-[#FF9466]/10"
            >
              + Add Food
            </button>
          </div>

          <div *ngIf="getMealItems(meal.type).length === 0" className="text-xs text-slate-400 py-3 italic">
            No items logged yet for {{ meal.label.toLowerCase() }}.
          </div>

          <div *ngIf="getMealItems(meal.type).length > 0" className="flex flex-col gap-2">
            <div
              *ngFor="let item of getMealItems(meal.type)"
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 text-xs"
            >
              <div className="flex flex-col gap-0.5">
                <span className="font-bold text-slate-900 dark:text-white text-sm">{{ item.name }}</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  Portion: <strong className="text-slate-700 dark:text-slate-300">{{ item.portionQuantity }}{{ item.unit }}</strong> • ({{ item.basePer100.calories }} kcal / 100{{ item.unit }})
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="font-black text-slate-900 dark:text-white">{{ item.calories }} kcal</span>
                  <p className="text-[10px] text-slate-400 font-medium">
                    {{ item.proteinG }}g P | {{ item.carbsG }}g C | {{ item.fatG }}g F
                  </p>
                </div>

                <button (click)="openEditModal(meal.type, item)" className="p-1 text-slate-400 hover:text-[#FF9466]">✏️</button>
                <button (click)="handleDeleteItem(meal.type, item.id)" className="p-1 text-slate-400 hover:text-rose-500">🗑️</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Add / Edit Modal -->
      <div *ngIf="showAddModal" className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl w-full max-w-lg p-6 flex flex-col gap-4 shadow-2xl">
          <h3 className="text-lg font-black text-slate-900 dark:text-white capitalize">
            {{ editingItemId ? 'Edit Food Item & Nutrition' : 'Add Food to ' + activeMealType }}
          </h3>

          <!-- Food Name & AI Estimate -->
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Food Item Name</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. Bread Butter, Whole Milk, Oatmeal..."
                [(ngModel)]="foodName"
                className="flex-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-bold"
              />
              <button
                (click)="handleAiEstimate()"
                [disabled]="!foodName.trim() || isAiLoading"
                className="px-3 py-2 rounded-xl bg-[#38BDF8] text-slate-950 font-bold text-xs hover:bg-[#0284C7] hover:text-white transition-all shrink-0"
              >
                {{ isAiLoading ? 'Estimating...' : '✨ AI Estimate' }}
              </button>
            </div>
          </div>

          <!-- Unit Toggle & Portion -->
          <div className="grid grid-cols-2 gap-3 bg-slate-50 dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Serving Type</label>
              <div className="flex gap-1.5">
                <button
                  type="button"
                  (click)="portionUnit = 'g'"
                  [className]="'flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all ' + (portionUnit === 'g' ? 'bg-[#FF9466] text-slate-950' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300')"
                >
                  Solid (100g)
                </button>
                <button
                  type="button"
                  (click)="portionUnit = 'ml'"
                  [className]="'flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all ' + (portionUnit === 'ml' ? 'bg-[#38BDF8] text-slate-950' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300')"
                >
                  Liquid (100ml)
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Your Portion ({{ portionUnit }})</label>
              <input
                type="number"
                min="1"
                max="2000"
                [(ngModel)]="portionQuantity"
                className="w-full px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-sm"
              />
            </div>
          </div>

          <!-- Base Nutrients per 100g/ml -->
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Base Nutrition per 100{{ portionUnit }} (Editable)</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div className="flex flex-col gap-1 bg-slate-50 dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] font-bold uppercase text-slate-400">Calories</span>
                <input type="number" [(ngModel)]="baseCal" className="w-full bg-transparent font-black text-sm text-slate-900 dark:text-white focus:outline-none" />
              </div>
              <div className="flex flex-col gap-1 bg-slate-50 dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] font-bold uppercase text-rose-400">Protein</span>
                <input type="number" [(ngModel)]="baseProtein" className="w-full bg-transparent font-black text-sm text-rose-500 focus:outline-none" />
              </div>
              <div className="flex flex-col gap-1 bg-slate-50 dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] font-bold uppercase text-amber-400">Carbs</span>
                <input type="number" [(ngModel)]="baseCarbs" className="w-full bg-transparent font-black text-sm text-amber-500 focus:outline-none" />
              </div>
              <div className="flex flex-col gap-1 bg-slate-50 dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] font-bold uppercase text-sky-400">Fat</span>
                <input type="number" [(ngModel)]="baseFat" className="w-full bg-transparent font-black text-sm text-[#38BDF8] focus:outline-none" />
              </div>
            </div>
          </div>

          <!-- Preview -->
          <div className="bg-amber-500/10 border border-amber-500/30 p-3.5 rounded-2xl flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-xs text-amber-700 dark:text-amber-300 font-bold">
              <span>Calculated Totals for {{ portionQuantity }}{{ portionUnit }}:</span>
              <span className="text-slate-900 dark:text-white font-black">{{ previewCal }} kcal</span>
            </div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-300">
              <span>Protein: {{ previewP }}g</span>
              <span>Carbs: {{ previewC }}g</span>
              <span>Fat: {{ previewF }}g</span>
            </div>
          </div>

          <!-- Actions -->
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <button (click)="closeModal()" className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-700">Cancel</button>
            <button (click)="handleSaveItem()" [disabled]="!foodName.trim()" className="px-6 py-2 rounded-xl bg-[#FF9466] text-slate-950 font-bold text-xs hover:bg-[#E0663B] hover:text-white transition-all">
              {{ editingItemId ? 'Update Item' : 'Log Food Item' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class FoodDiaryComponent implements OnInit {
  activeMealType: 'breakfast' | 'lunch' | 'dinner' | 'snack' = 'breakfast';
  showAddModal = false;
  editingItemId: string | null = null;

  foodName = '';
  portionUnit: 'g' | 'ml' = 'g';
  portionQuantity = 100;
  baseCal = 150;
  baseProtein = 10;
  baseCarbs = 18;
  baseFat = 5;
  isAiLoading = false;

  targets = { daily_calories: 2000, protein_g: 150, carbs_g: 200, fat_g: 65 };

  mealTypeConfig = [
    { type: 'breakfast', label: 'Breakfast', icon: '🌅' },
    { type: 'lunch', label: 'Lunch', icon: '☀️' },
    { type: 'dinner', label: 'Dinner', icon: '🌙' },
    { type: 'snack', label: 'Snacks', icon: '☕' },
  ] as const;

  diaryItems: Record<string, MealEntryItem[]> = {
    breakfast: [
      {
        id: '1',
        name: 'Scrambled Eggs',
        unit: 'g',
        portionQuantity: 100,
        basePer100: { calories: 140, proteinG: 12, carbsG: 1, fatG: 10 },
        calories: 140,
        proteinG: 12,
        carbsG: 1,
        fatG: 10,
        source: 'Smart AI DB',
      },
      {
        id: '2',
        name: 'Whole Milk',
        unit: 'ml',
        portionQuantity: 200,
        basePer100: { calories: 60, proteinG: 3.2, carbsG: 4.8, fatG: 3.2 },
        calories: 120,
        proteinG: 6.4,
        carbsG: 9.6,
        fatG: 6.4,
        source: 'USDA Liquid',
      },
    ],
    lunch: [
      {
        id: '3',
        name: 'Grilled Chicken Breast',
        unit: 'g',
        portionQuantity: 150,
        basePer100: { calories: 165, proteinG: 31, carbsG: 0, fatG: 3.6 },
        calories: 248,
        proteinG: 46.5,
        carbsG: 0,
        fatG: 5.4,
        source: 'Smart AI DB',
      },
    ],
    dinner: [
      {
        id: '4',
        name: 'Baked Salmon Fillet',
        unit: 'g',
        portionQuantity: 180,
        basePer100: { calories: 200, proteinG: 22, carbsG: 0, fatG: 12 },
        calories: 360,
        proteinG: 39.6,
        carbsG: 0,
        fatG: 21.6,
        source: 'Smart AI DB',
      },
    ],
    snack: [],
  };

  constructor(
    private authService: AuthService,
    private aiService: AiService
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((u) => {
      if (u?.macroTargets) {
        this.targets = u.macroTargets;
      }
    });
  }

  get allItems(): MealEntryItem[] {
    return Object.values(this.diaryItems).flat();
  }

  get totalCalories(): number {
    return Math.round(this.allItems.reduce((acc, c) => acc + c.calories, 0));
  }

  get totalProtein(): number {
    return Math.round(this.allItems.reduce((acc, c) => acc + c.proteinG, 0) * 10) / 10;
  }

  get totalCarbs(): number {
    return Math.round(this.allItems.reduce((acc, c) => acc + c.carbsG, 0) * 10) / 10;
  }

  get totalFat(): number {
    return Math.round(this.allItems.reduce((acc, c) => acc + c.fatG, 0) * 10) / 10;
  }

  get previewCal(): number {
    return Math.round(this.baseCal * (this.portionQuantity / 100));
  }

  get previewP(): number {
    return Math.round(this.baseProtein * (this.portionQuantity / 100) * 10) / 10;
  }

  get previewC(): number {
    return Math.round(this.baseCarbs * (this.portionQuantity / 100) * 10) / 10;
  }

  get previewF(): number {
    return Math.round(this.baseFat * (this.portionQuantity / 100) * 10) / 10;
  }

  getMealItems(type: string): MealEntryItem[] {
    return this.diaryItems[type] || [];
  }

  getMealCalories(type: string): number {
    return Math.round(this.getMealItems(type).reduce((acc, c) => acc + c.calories, 0));
  }

  async handleAiEstimate(): Promise<void> {
    if (!this.foodName.trim()) return;
    this.isAiLoading = true;

    const lower = this.foodName.toLowerCase();
    const liquidKeywords = ['milk', 'juice', 'water', 'soda', 'coffee', 'tea', 'smoothie', 'soup', 'shake', 'beverage', 'drink', 'oil'];
    const isLiquid = liquidKeywords.some((kw) => lower.includes(kw)) && !lower.includes('bread') && !lower.includes('butter');
    this.portionUnit = isLiquid ? 'ml' : 'g';

    try {
      const data = await this.aiService.estimateNutrition(this.foodName);
      if (data.success && data.data?.message?.content) {
        const text = data.data.message.content;
        const calMatch = text.match(/calories:?\s*(\d+)/i) || text.match(/(\d+)\s*kcal/i);
        const pMatch = text.match(/protein:?\s*(\d+(\.\d+)?)/i);
        const cMatch = text.match(/carbs:?\s*(\d+(\.\d+)?)/i);
        const fMatch = text.match(/fat:?\s*(\d+(\.\d+)?)/i);

        if (calMatch) this.baseCal = parseInt(calMatch[1], 10);
        if (pMatch) this.baseProtein = parseFloat(pMatch[1]);
        if (cMatch) this.baseCarbs = parseFloat(cMatch[1]);
        if (fMatch) this.baseFat = parseFloat(fMatch[1]);
      }
    } catch {
      if (lower.includes('bread') && lower.includes('butter')) {
        this.baseCal = 340;
        this.baseProtein = 8;
        this.baseCarbs = 42;
        this.baseFat = 16;
      }
    } finally {
      this.isAiLoading = false;
    }
  }

  openAddModal(type: 'breakfast' | 'lunch' | 'dinner' | 'snack'): void {
    this.activeMealType = type;
    this.editingItemId = null;
    this.foodName = '';
    this.portionUnit = 'g';
    this.portionQuantity = 100;
    this.baseCal = 150;
    this.baseProtein = 10;
    this.baseCarbs = 18;
    this.baseFat = 5;
    this.showAddModal = true;
  }

  openEditModal(type: string, item: MealEntryItem): void {
    this.activeMealType = type as any;
    this.editingItemId = item.id;
    this.foodName = item.name;
    this.portionUnit = item.unit;
    this.portionQuantity = item.portionQuantity;
    this.baseCal = item.basePer100.calories;
    this.baseProtein = item.basePer100.proteinG;
    this.baseCarbs = item.basePer100.carbsG;
    this.baseFat = item.basePer100.fatG;
    this.showAddModal = true;
  }

  closeModal(): void {
    this.showAddModal = false;
    this.editingItemId = null;
  }

  handleSaveItem(): void {
    if (!this.foodName.trim()) return;

    const mult = this.portionQuantity / 100;
    const itemData: MealEntryItem = {
      id: this.editingItemId || `item-${Date.now()}`,
      name: this.foodName,
      unit: this.portionUnit,
      portionQuantity: this.portionQuantity,
      basePer100: { calories: this.baseCal, proteinG: this.baseProtein, carbsG: this.baseCarbs, fatG: this.baseFat },
      calories: Math.round(this.baseCal * mult),
      proteinG: Math.round(this.baseProtein * mult * 10) / 10,
      carbsG: Math.round(this.baseCarbs * mult * 10) / 10,
      fatG: Math.round(this.baseFat * mult * 10) / 10,
      source: 'Smart AI DB',
    };

    const current = this.diaryItems[this.activeMealType] || [];
    if (this.editingItemId) {
      this.diaryItems[this.activeMealType] = current.map((i) => (i.id === this.editingItemId ? itemData : i));
    } else {
      this.diaryItems[this.activeMealType] = [...current, itemData];
    }

    this.closeModal();
  }

  handleDeleteItem(type: string, id: string): void {
    this.diaryItems[type] = (this.diaryItems[type] || []).filter((i) => i.id !== id);
  }
}
