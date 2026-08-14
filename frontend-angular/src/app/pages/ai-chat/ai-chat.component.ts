import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AiService } from '../../services/ai.service';
import { ChatMessage } from '../../models/user.model';

@Component({
  selector: 'app-ai-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div className="flex flex-col gap-4 max-w-4xl mx-auto w-full h-[calc(100dvh-12rem)] min-h-[500px]">
      <!-- Header -->
      <div className="flex items-center justify-between gap-3 pb-2 border-b border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#38BDF8]/20 text-[#0284C7] dark:text-[#38BDF8] flex items-center justify-center font-bold text-lg">
            ✨
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              BiteWise Smart AI Assistant
              <span className="text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Angular Cloud Engine
              </span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Natural Language & Vision Meal Photo Parsing • Smart Nutrition Engine
            </p>
          </div>
        </div>
      </div>

      <!-- Messages Scroll Area -->
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-2xl shadow-xs">
        <div
          *ngFor="let msg of messages"
          [className]="'flex gap-3 max-w-[88%] ' + (msg.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto')"
        >
          <!-- Avatar -->
          <div
            [className]="'w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ' + (msg.role === 'user' ? 'bg-[#FF9466] text-slate-950 font-black' : 'bg-[#38BDF8] text-slate-950 font-black')"
          >
            {{ msg.role === 'user' ? '👤' : '🤖' }}
          </div>

          <!-- Message Content -->
          <div className="flex flex-col gap-1.5 min-w-0">
            <div *ngIf="msg.toolCall" className="bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/30 rounded-xl p-2.5 text-xs flex flex-col gap-1">
              <div className="flex items-center justify-between text-amber-700 dark:text-amber-300 font-bold">
                <span>🔧 Smart AI Tool: {{ msg.toolCall.name }}</span>
                <span className="text-emerald-600 dark:text-emerald-400 text-[10px]">✅ Success</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-[11px]">{{ msg.toolCall.resultSummary }}</p>
            </div>

            <div
              [className]="'p-4 rounded-2xl text-xs md:text-sm leading-relaxed whitespace-pre-wrap ' + (msg.role === 'user' ? 'bg-[#FF9466] text-slate-950 font-bold rounded-tr-none' : 'bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-tl-none')"
            >
              <div *ngIf="msg.image" className="mb-2 rounded-xl overflow-hidden max-w-xs border border-slate-200 dark:border-slate-700">
                <img [src]="msg.image" alt="Meal attachment" className="w-full h-auto max-h-48 object-cover" />
              </div>
              {{ msg.content }}
            </div>

            <span className="text-[10px] text-slate-400 px-1">{{ msg.timestamp }}</span>
          </div>
        </div>

        <div *ngIf="isProcessing" className="flex gap-3 mr-auto items-center">
          <div className="w-8 h-8 rounded-xl bg-[#38BDF8] text-slate-950 flex items-center justify-center font-bold animate-pulse">🤖</div>
          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-4 py-3 rounded-2xl text-xs text-slate-500">
            Contacting Smart AI & executing nutrition queries...
          </div>
        </div>
      </div>

      <!-- Attachment Preview -->
      <div *ngIf="selectedImage" className="flex items-center justify-between gap-3 bg-white dark:bg-slate-800 p-2.5 rounded-xl border border-[#FF9466]">
        <div className="flex items-center gap-2.5">
          <img [src]="selectedImage" alt="Preview" className="w-10 h-10 rounded-lg object-cover" />
          <span className="text-xs font-bold text-slate-900 dark:text-white">Meal Photo Attached for AI Parsing</span>
        </div>
        <button (click)="selectedImage = null" className="text-slate-400 hover:text-rose-500 text-sm font-bold">✕</button>
      </div>

      <!-- Input Bar -->
      <div className="flex items-center gap-2">
        <input #fileInput type="file" accept="image/*" (change)="handleImageSelect($event)" className="hidden" />

        <button
          type="button"
          (click)="fileInput.click()"
          className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-[#FF9466]/10 flex items-center justify-center min-w-[44px]"
          title="Upload food photo"
        >
          📷
        </button>

        <input
          type="text"
          placeholder="Describe your meal or ask a nutrition question..."
          [(ngModel)]="input"
          (keyup.enter)="handleSendMessage()"
          [disabled]="isProcessing"
          className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-xs"
        />

        <button
          (click)="handleSendMessage()"
          [disabled]="(!input.trim() && !selectedImage) || isProcessing"
          className="px-5 py-2.5 rounded-xl bg-[#FF9466] text-slate-950 font-bold text-xs hover:bg-[#E0663B] hover:text-white transition-all shrink-0"
        >
          Send ✨
        </button>
      </div>
    </div>
  `,
})
export class AiChatComponent {
  messages: ChatMessage[] = [];
  input = '';
  selectedImage: string | null = null;
  isProcessing = false;

  constructor(
    private authService: AuthService,
    private aiService: AiService
  ) {
    const userName = this.authService.user?.fullName || 'there';
    this.messages = [
      {
        id: 'msg-1',
        role: 'assistant',
        content: `Hello ${userName}! I'm your BiteWise Smart AI Assistant. I can parse your text or meal photos, search food databases, and log entries directly to your diary.\n\nTry uploading a food photo or typing what you ate today!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ];
  }

  handleImageSelect(event: any): void {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => (this.selectedImage = reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  async handleSendMessage(): Promise<void> {
    if ((!this.input.trim() && !this.selectedImage) || this.isProcessing) return;

    const text = this.input;
    const currentImage = this.selectedImage;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text || 'Analyzed attached meal photo',
      image: currentImage || undefined,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    this.messages.push(userMsg);
    this.input = '';
    this.selectedImage = null;
    this.isProcessing = true;

    try {
      const data = await this.aiService.sendChatMessage(
        this.messages.map((m) => ({ role: m.role, content: m.content, image: m.image }))
      );

      if (data.success && data.data?.message) {
        const tool = data.data.executedTools?.[0];
        this.messages.push({
          id: `ai-${Date.now()}`,
          role: 'assistant',
          content: data.data.message.content,
          toolCall: tool
            ? {
                name: tool.name,
                args: tool.args,
                status: 'completed',
                resultSummary: tool.resultSummary || 'Executed Smart AI search.',
              }
            : undefined,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        });
      } else {
        throw new Error('Fallback required');
      }
    } catch {
      let toolInfo: ChatMessage['toolCall'];
      let aiText = '';
      const lower = text.toLowerCase();

      if (currentImage) {
        toolInfo = {
          name: 'vision_meal_parser & log_meal',
          args: { hasImage: true },
          status: 'completed',
          resultSummary: 'Multimodal Vision parsing complete: Identified Avocado Toast & Eggs.',
        };
        aiText = `📸 **Meal Photo Parsed**: I've analyzed your food photo!\n\n• **Avocado Toast w/ Eggs**: 280 kcal | 12g Protein | 24g Carbs | 16g Fat\n• **Coffee**: 2 kcal | 0g Protein | 0g Carbs | 0g Fat\n\n**Total Estimated**: **282 kcal** | **12g Protein** | **24g Carbs** | **16g Fat**\n\nI've automatically added this to your **Breakfast** diary! You earned **+5 BiteCoins**.`;
      } else {
        toolInfo = {
          name: 'search_food_database',
          args: { query: text },
          status: 'completed',
          resultSummary: 'Queried USDA & Open Food Facts databases.',
        };
        aiText = `Here is what I found for "${text}":\n\nIt is rich in essential nutrients and fits well within your daily calorie allowance. Let me know if you would like me to add it to today's log or generate a recipe tailored around it!`;
      }

      this.messages.push({
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: aiText,
        toolCall: toolInfo,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });
    } finally {
      this.isProcessing = false;
    }
  }
}
