import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';
import {
  Utensils,
  Plus,
  Trash2,
  Edit2,
  Sun,
  Sunset,
  Moon,
  Coffee,
  CheckCircle2,
  Sparkles,
  Loader2,
  Scale,
  Droplet,
} from 'lucide-react';

interface MealEntryItem {
  id: string;
  name: string;
  unit: 'g' | 'ml';
  portionQuantity: number;
  basePer100: {
    calories: number;
    proteinG: number;
    carbsG: number;
    fatG: number;
  };
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  source: string;
}

export const FoodDiaryPage: React.FC = () => {
  const { user } = useAuth();
  const [activeMealType, setActiveMealType] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack'>('breakfast');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  // Form State for Add / Edit Modal
  const [foodName, setFoodName] = useState('');
  const [portionUnit, setPortionUnit] = useState<'g' | 'ml'>('g');
  const [portionQuantity, setPortionQuantity] = useState<number>(100);
  const [baseCal, setBaseCal] = useState<number>(150);
  const [baseProtein, setBaseProtein] = useState<number>(10);
  const [baseCarbs, setBaseCarbs] = useState<number>(18);
  const [baseFat, setBaseFat] = useState<number>(5);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const [diaryItems, setDiaryItems] = useState<Record<string, MealEntryItem[]>>({
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
    snack: [
      {
        id: '5',
        name: 'Greek Yogurt (Plain)',
        unit: 'g',
        portionQuantity: 150,
        basePer100: { calories: 87, proteinG: 10, carbsG: 4, fatG: 2.7 },
        calories: 130,
        proteinG: 15,
        carbsG: 6,
        fatG: 4,
        source: 'Open Food Facts',
      },
    ],
  });

  const mealTypeConfig = [
    { type: 'breakfast', label: 'Breakfast', icon: Sun, color: 'text-amber-500 bg-amber-500/10' },
    { type: 'lunch', label: 'Lunch', icon: Sunset, color: 'text-orange-500 bg-orange-500/10' },
    { type: 'dinner', label: 'Dinner', icon: Moon, color: 'text-indigo-500 bg-indigo-500/10' },
    { type: 'snack', label: 'Snacks', icon: Coffee, color: 'text-emerald-500 bg-emerald-500/10' },
  ] as const;

  // Smart AI Auto Estimate Function with accurate Solid (g) vs Liquid (ml) detection
  const handleAiEstimate = async () => {
    if (!foodName.trim()) return;
    setIsAiLoading(true);

    const nameLower = foodName.toLowerCase();

    // Determine unit based on food type
    const liquidKeywords = ['milk', 'juice', 'water', 'soda', 'coffee', 'tea', 'smoothie', 'soup', 'shake', 'beverage', 'drink', 'broth', 'oil', 'syrup'];
    const isLiquid = liquidKeywords.some((kw) => nameLower.includes(kw)) && !nameLower.includes('bread') && !nameLower.includes('butter');
    const detectedUnit: 'g' | 'ml' = isLiquid ? 'ml' : 'g';
    setPortionUnit(detectedUnit);

    try {
      const res = await fetch('http://localhost:5000/api/v1/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            {
              role: 'user',
              content: `Give accurate nutrition facts per 100g (or 100ml for liquids) for "${foodName}". Include: calories (kcal), protein (g), carbs (g), fat (g).`,
            },
          ],
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        const text = data.data.message?.content || '';
        const calMatch = text.match(/calories:?\s*(\d+)/i) || text.match(/(\d+)\s*kcal/i);
        const pMatch = text.match(/protein:?\s*(\d+(\.\d+)?)/i) || text.match(/(\d+(\.\d+)?)\s*g\s*protein/i);
        const cMatch = text.match(/carbs:?\s*(\d+(\.\d+)?)/i) || text.match(/(\d+(\.\d+)?)\s*g\s*carbs/i);
        const fMatch = text.match(/fat:?\s*(\d+(\.\d+)?)/i) || text.match(/(\d+(\.\d+)?)\s*g\s*fat/i);

        if (calMatch) setBaseCal(parseInt(calMatch[1], 10));
        if (pMatch) setBaseProtein(parseFloat(pMatch[1]));
        if (cMatch) setBaseCarbs(parseFloat(cMatch[1]));
        if (fMatch) setBaseFat(parseFloat(fMatch[1]));
      }
    } catch {
      // Heuristic fallback for common items
      if (nameLower.includes('bread') && nameLower.includes('butter')) {
        setPortionUnit('g');
        setBaseCal(340);
        setBaseProtein(8);
        setBaseCarbs(42);
        setBaseFat(16);
      } else if (nameLower.includes('bread')) {
        setPortionUnit('g');
        setBaseCal(265);
        setBaseProtein(9);
        setBaseCarbs(49);
        setBaseFat(3.2);
      } else if (nameLower.includes('butter')) {
        setPortionUnit('g');
        setBaseCal(717);
        setBaseProtein(0.9);
        setBaseCarbs(0.1);
        setBaseFat(81);
      } else if (isLiquid) {
        setPortionUnit('ml');
        setBaseCal(60);
        setBaseProtein(3.5);
        setBaseCarbs(5);
        setBaseFat(3);
      } else {
        setPortionUnit('g');
        setBaseCal(180);
        setBaseProtein(12);
        setBaseCarbs(18);
        setBaseFat(6);
      }
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleSaveItem = () => {
    if (!foodName.trim()) return;

    const multiplier = portionQuantity / 100;
    const calcCalories = Math.round(baseCal * multiplier);
    const calcProtein = Math.round(baseProtein * multiplier * 10) / 10;
    const calcCarbs = Math.round(baseCarbs * multiplier * 10) / 10;
    const calcFat = Math.round(baseFat * multiplier * 10) / 10;

    const itemData: MealEntryItem = {
      id: editingItemId || `item-${Date.now()}`,
      name: foodName,
      unit: portionUnit,
      portionQuantity,
      basePer100: {
        calories: baseCal,
        proteinG: baseProtein,
        carbsG: baseCarbs,
        fatG: baseFat,
      },
      calories: calcCalories,
      proteinG: calcProtein,
      carbsG: calcCarbs,
      fatG: calcFat,
      source: 'Smart AI DB',
    };

    setDiaryItems((prev) => {
      const currentMealItems = prev[activeMealType] || [];
      if (editingItemId) {
        return {
          ...prev,
          [activeMealType]: currentMealItems.map((i) => (i.id === editingItemId ? itemData : i)),
        };
      }
      return {
        ...prev,
        [activeMealType]: [...currentMealItems, itemData],
      };
    });

    closeModal();
  };

  const openAddModal = (mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack') => {
    setActiveMealType(mealType);
    setEditingItemId(null);
    setFoodName('');
    setPortionUnit('g');
    setPortionQuantity(100);
    setBaseCal(150);
    setBaseProtein(10);
    setBaseCarbs(18);
    setBaseFat(5);
    setShowAddModal(true);
  };

  const openEditModal = (mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack', item: MealEntryItem) => {
    setActiveMealType(mealType);
    setEditingItemId(item.id);
    setFoodName(item.name);
    setPortionUnit(item.unit);
    setPortionQuantity(item.portionQuantity);
    setBaseCal(item.basePer100.calories);
    setBaseProtein(item.basePer100.proteinG);
    setBaseCarbs(item.basePer100.carbsG);
    setBaseFat(item.basePer100.fatG);
    setShowAddModal(true);
  };

  const closeModal = () => {
    setShowAddModal(false);
    setEditingItemId(null);
  };

  const handleDeleteItem = (mealType: string, itemId: string) => {
    setDiaryItems((prev) => ({
      ...prev,
      [mealType]: prev[mealType].filter((item) => item.id !== itemId),
    }));
  };

  // Totals Calculation
  const allItems = Object.values(diaryItems).flat();
  const totalCalories = allItems.reduce((acc, curr) => acc + curr.calories, 0);
  const totalProtein = allItems.reduce((acc, curr) => acc + curr.proteinG, 0);
  const totalCarbs = allItems.reduce((acc, curr) => acc + curr.carbsG, 0);
  const totalFat = allItems.reduce((acc, curr) => acc + curr.fatG, 0);

  const targets = user?.macroTargets || { daily_calories: 2000, protein_g: 150, carbs_g: 200, fat_g: 65 };

  // Current Modal Calculated Preview
  const currentMultiplier = portionQuantity / 100;
  const previewCal = Math.round(baseCal * currentMultiplier);
  const previewP = Math.round(baseProtein * currentMultiplier * 10) / 10;
  const previewC = Math.round(baseCarbs * currentMultiplier * 10) / 10;
  const previewF = Math.round(baseFat * currentMultiplier * 10) / 10;

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FF9466]/20 text-[#E0663B] flex items-center justify-center font-bold">
            <Utensils className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">Daily Food Diary</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Track 100g (solids) & 100ml (liquids), edit custom nutrients, and estimate facts using Smart AI.
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3 py-1.5 rounded-full text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4" />
          <span>Daily Streak: 4 Days (+10 Coins)</span>
        </div>
      </div>

      {/* Summary Totals Bar */}
      <Card className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5">
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Calories</span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-slate-900 dark:text-white">{Math.round(totalCalories)}</span>
            <span className="text-xs text-slate-400">/ {targets.daily_calories} kcal</span>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Protein</span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-rose-500">{Math.round(totalProtein * 10) / 10}g</span>
            <span className="text-xs text-slate-400">/ {targets.protein_g}g</span>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Carbohydrates</span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-amber-500">{Math.round(totalCarbs * 10) / 10}g</span>
            <span className="text-xs text-slate-400">/ {targets.carbs_g}g</span>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Fats</span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-[#38BDF8]">{Math.round(totalFat * 10) / 10}g</span>
            <span className="text-xs text-slate-400">/ {targets.fat_g}g</span>
          </div>
        </div>
      </Card>

      {/* Meal Types Sections */}
      <div className="flex flex-col gap-4">
        {mealTypeConfig.map(({ type, label, icon: Icon, color }) => {
          const items = diaryItems[type] || [];
          const mealCalories = items.reduce((acc, c) => acc + c.calories, 0);

          return (
            <Card key={type} className="flex flex-col gap-3 p-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700/80">
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-xl ${color} flex items-center justify-center`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-white">{label}</h2>
                  <span className="text-xs text-slate-500 dark:text-slate-400">({Math.round(mealCalories)} kcal)</span>
                </div>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => openAddModal(type)}
                  className="text-xs py-1 font-bold"
                >
                  <Plus className="w-3.5 h-3.5 mr-1" />
                  Add Food
                </Button>
              </div>

              {items.length === 0 ? (
                <p className="text-xs text-slate-400 py-3 italic">No items logged yet for {label.toLowerCase()}.</p>
              ) : (
                <div className="flex flex-col gap-2">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors text-xs"
                    >
                      <div className="flex flex-col gap-0.5">
                        <span className="font-bold text-slate-900 dark:text-white text-sm">{item.name}</span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">
                          Portion: <strong className="text-slate-700 dark:text-slate-300">{item.portionQuantity}{item.unit}</strong> • ({item.basePer100.calories} kcal / 100{item.unit})
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <span className="font-black text-slate-900 dark:text-white">{item.calories} kcal</span>
                          <p className="text-[10px] text-slate-400 font-medium">
                            {item.proteinG}g P | {item.carbsG}g C | {item.fatG}g F
                          </p>
                        </div>

                        <button
                          onClick={() => openEditModal(type, item)}
                          className="p-1.5 text-slate-400 hover:text-[#FF9466] transition-colors rounded-lg"
                          title="Edit quantity & nutrition"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleDeleteItem(type, item.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors rounded-lg"
                          title="Delete item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Add / Edit Dynamic Food Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <Card className="w-full max-w-lg p-6 flex flex-col gap-4 shadow-2xl border-slate-200 dark:border-slate-700 max-h-[90dvh] overflow-y-auto">
            <h3 className="text-lg font-black text-slate-900 dark:text-white capitalize">
              {editingItemId ? 'Edit Food Item & Nutrition' : `Add Food to ${activeMealType}`}
            </h3>

            {/* Food Name & AI Estimate Button */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Food Item Name</label>
              <div className="flex gap-2">
                <Input
                  placeholder="e.g. Bread Butter, Whole Milk, Oatmeal..."
                  value={foodName}
                  onChange={(e) => setFoodName(e.target.value)}
                  className="flex-1"
                />
                <Button
                  onClick={handleAiEstimate}
                  disabled={!foodName.trim() || isAiLoading}
                  variant="accent"
                  size="sm"
                  className="shrink-0 text-xs font-bold"
                >
                  {isAiLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 mr-1" />
                      ✨ AI Estimate
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Serving Unit & Portion Quantity */}
            <div className="grid grid-cols-2 gap-3 bg-slate-50 dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Serving Type</label>
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    onClick={() => setPortionUnit('g')}
                    className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all ${
                      portionUnit === 'g'
                        ? 'bg-[#FF9466] text-slate-950 shadow-2xs'
                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    <Scale className="w-3.5 h-3.5" />
                    Solid (100g)
                  </button>

                  <button
                    type="button"
                    onClick={() => setPortionUnit('ml')}
                    className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all ${
                      portionUnit === 'ml'
                        ? 'bg-[#38BDF8] text-slate-950 shadow-2xs'
                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    <Droplet className="w-3.5 h-3.5" />
                    Liquid (100ml)
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Your Portion ({portionUnit})
                </label>
                <input
                  type="number"
                  min="1"
                  max="2000"
                  value={portionQuantity}
                  onChange={(e) => setPortionQuantity(Math.max(1, parseInt(e.target.value || '1', 10)))}
                  className="w-full px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-sm"
                />
              </div>
            </div>

            {/* Base Nutrients per 100g / 100ml */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Base Nutrition per 100{portionUnit} (Editable)
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div className="flex flex-col gap-1 bg-slate-50 dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Calories (kcal)</span>
                  <input
                    type="number"
                    value={baseCal}
                    onChange={(e) => setBaseCal(parseFloat(e.target.value || '0'))}
                    className="w-full bg-transparent font-black text-sm text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1 bg-slate-50 dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] font-bold uppercase text-rose-400">Protein (g)</span>
                  <input
                    type="number"
                    step="0.1"
                    value={baseProtein}
                    onChange={(e) => setBaseProtein(parseFloat(e.target.value || '0'))}
                    className="w-full bg-transparent font-black text-sm text-rose-500 focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1 bg-slate-50 dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] font-bold uppercase text-amber-400">Carbs (g)</span>
                  <input
                    type="number"
                    step="0.1"
                    value={baseCarbs}
                    onChange={(e) => setBaseCarbs(parseFloat(e.target.value || '0'))}
                    className="w-full bg-transparent font-black text-sm text-amber-500 focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1 bg-slate-50 dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] font-bold uppercase text-sky-400">Fat (g)</span>
                  <input
                    type="number"
                    step="0.1"
                    value={baseFat}
                    onChange={(e) => setBaseFat(parseFloat(e.target.value || '0'))}
                    className="w-full bg-transparent font-black text-sm text-[#38BDF8] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Recalculated Live Preview Box */}
            <div className="bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/30 p-3.5 rounded-2xl flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs text-amber-700 dark:text-amber-300 font-bold">
                <span>Calculated Totals for {portionQuantity}{portionUnit}:</span>
                <span className="text-slate-900 dark:text-white font-black">{previewCal} kcal</span>
              </div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-300">
                <span>Protein: {previewP}g</span>
                <span>Carbs: {previewC}g</span>
                <span>Fat: {previewF}g</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <Button variant="ghost" onClick={closeModal}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleSaveItem}
                disabled={!foodName.trim()}
                className="font-bold px-6"
              >
                {editingItemId ? 'Update Item & Nutrition' : 'Log Food Item'}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
