"use client";

import type { Session } from "next-auth";
import { startTransition, useMemo, useOptimistic, useState } from "react";
import { saveChatModelAsCookie } from "@/app/(chat)/actions";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { entitlementsByUserType } from "@/lib/ai/entitlements";
import { chatModels, getModelsByProvider } from "@/lib/ai/models";
import { cn } from "@/lib/utils";
import { CheckCircleFillIcon, ChevronDownIcon } from "./icons";

export function ModelSelector({
  session,
  selectedModelId,
  className,
}: {
  session: Session;
  selectedModelId: string;
} & React.ComponentProps<typeof Button>) {
  const [open, setOpen] = useState(false);
  const [optimisticModelId, setOptimisticModelId] =
    useOptimistic(selectedModelId);

  const userType = session.user.type;
  const { availableChatModelIds } = entitlementsByUserType[userType];

  const availableChatModels = chatModels.filter((chatModel) =>
    availableChatModelIds.includes(chatModel.id)
  );

  const selectedChatModel = useMemo(
    () =>
      availableChatModels.find(
        (chatModel) => chatModel.id === optimisticModelId
      ),
    [optimisticModelId, availableChatModels]
  );

  // Group models by provider
  const googleModels = availableChatModels.filter(m => m.provider === 'google');
  const openaiModels = availableChatModels.filter(m => m.provider === 'openai');
  const anthropicModels = availableChatModels.filter(m => m.provider === 'anthropic');
  const openrouterModels = availableChatModels.filter(m => m.provider === 'openrouter');

  const renderModelGroup = (models: typeof availableChatModels, label: string) => {
    if (models.length === 0) return null;
    
    return (
      <>
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        {models.map((chatModel) => {
          const { id } = chatModel;

          return (
            <DropdownMenuItem
              asChild
              data-active={id === optimisticModelId}
              data-testid={`model-selector-item-${id}`}
              key={id}
              onSelect={() => {
                setOpen(false);

                startTransition(() => {
                  setOptimisticModelId(id);
                  saveChatModelAsCookie(id);
                });
              }}
            >
              <button
                className="group/item flex w-full flex-row items-center justify-between gap-2 sm:gap-4"
                type="button"
              >
                <div className="flex flex-col items-start gap-1">
                  <div className="text-sm sm:text-base">{chatModel.name}</div>
                  <div className="line-clamp-2 text-muted-foreground text-xs">
                    {chatModel.description}
                  </div>
                </div>

                <div className="shrink-0 text-foreground opacity-0 group-data-[active=true]/item:opacity-100 dark:text-foreground">
                  <CheckCircleFillIcon />
                </div>
              </button>
            </DropdownMenuItem>
          );
        })}
      </>
    );
  };

  return (
    <DropdownMenu onOpenChange={setOpen} open={open}>
      <DropdownMenuTrigger
        asChild
        className={cn(
          "w-fit data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
          className
        )}
      >
        <Button
          className="md:h-[34px] md:px-2"
          data-testid="model-selector"
          variant="outline"
        >
          {selectedChatModel?.name}
          <ChevronDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="min-w-[280px] max-w-[90vw] sm:min-w-[300px]"
      >
        {renderModelGroup(googleModels, "Google Gemini (Default)")}
        {googleModels.length > 0 && (openaiModels.length > 0 || anthropicModels.length > 0 || openrouterModels.length > 0) && <DropdownMenuSeparator />}
        
        {renderModelGroup(openaiModels, "OpenAI")}
        {openaiModels.length > 0 && (anthropicModels.length > 0 || openrouterModels.length > 0) && <DropdownMenuSeparator />}
        
        {renderModelGroup(anthropicModels, "Anthropic")}
        {anthropicModels.length > 0 && openrouterModels.length > 0 && <DropdownMenuSeparator />}
        
        {renderModelGroup(openrouterModels, "OpenRouter")}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
