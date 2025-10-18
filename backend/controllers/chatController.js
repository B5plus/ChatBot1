class ChatController {
  constructor(aiService) {
    this.aiService = aiService;
  }

  /**
   * Create a new chat
   */
  async createChat(req, res, next) {
    try {
      const chat = await this.aiService.createChat();
      res.json({ success: true, chat, provider: this.aiService.getProvider() });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get chat with messages
   */
  async getChat(req, res, next) {
    try {
      const { chatId } = req.params;
      const chat = await this.aiService.getChat(chatId);
      res.json({ success: true, chat, provider: this.aiService.getProvider() });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Post message to chat
   */
  async postMessage(req, res, next) {
    try {
      const { chatId } = req.params;
      const { content, jsonSchema } = req.body;

      if (!content) {
        return res.status(400).json({ error: "Content is required" });
      }

      const response = await this.aiService.postMessage(
        chatId,
        content,
        jsonSchema
      );
      res.json({
        success: true,
        response,
        provider: this.aiService.getProvider(),
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Process query without chat
   */
  async processQuery(req, res, next) {
    try {
      const { content, jsonSchema } = req.body;

      if (!content) {
        return res.status(400).json({ error: "Content is required" });
      }

      const response = await this.aiService.processQuery(content, jsonSchema);
      res.json({
        success: true,
        response,
        provider: this.aiService.getProvider(),
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete chat
   */
  async deleteChat(req, res, next) {
    try {
      const { chatId } = req.params;
      await this.aiService.deleteChat(chatId);
      res.json({
        success: true,
        message: "Chat deleted",
        provider: this.aiService.getProvider(),
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get provider info
   */
  getProviderInfo(req, res) {
    res.json({
      provider: this.aiService.getProvider(),
      message: `Currently using ${this.aiService.getProvider()} as AI provider`,
    });
  }
}

export { ChatController };
