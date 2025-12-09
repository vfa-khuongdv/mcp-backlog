import axios from "axios";
import { config } from "./config.js";

type AxiosInstance = ReturnType<typeof axios.create>;

export class BacklogApi {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: `https://${config.backlogHost}/api/v2`,
      params: {
        apiKey: config.backlogApiKey,
      },
    });
  }

  // --- Issues ---
  async createIssue(params: any) {
    const response = await this.client.post("/issues", null, { params });
    return response.data;
  }

  async getIssue(issueIdOrKey: string) {
    const response = await this.client.get(`/issues/${issueIdOrKey}`);
    return response.data;
  }

  async updateIssue(issueIdOrKey: string, params: any) {
    const response = await this.client.patch(`/issues/${issueIdOrKey}`, null, {
      params,
    });
    return response.data;
  }

  async deleteIssue(issueIdOrKey: string) {
    const response = await this.client.delete(`/issues/${issueIdOrKey}`);
    return response.data;
  }

  async listIssues(params: any) {
    const response = await this.client.get("/issues", { params });
    return response.data;
  }

  async countIssues(params: any) {
    const response = await this.client.get("/issues/count", { params });
    return response.data;
  }

  // --- Comments ---
  async listComments(issueIdOrKey: string) {
    const response = await this.client.get(`/issues/${issueIdOrKey}/comments`);
    return response.data;
  }

  async addComment(issueIdOrKey: string, content: string) {
    const params = { content };
    const response = await this.client.post(
      `/issues/${issueIdOrKey}/comments`,
      null,
      { params }
    );
    return response.data;
  }

  async updateComment(
    issueIdOrKey: string,
    commentId: number,
    content: string
  ) {
    const params = { content };
    const response = await this.client.patch(
      `/issues/${issueIdOrKey}/comments/${commentId}`,
      null,
      { params }
    );
    return response.data;
  }

  async getComment(issueIdOrKey: string, commentId: number) {
    const response = await this.client.get(
      `/issues/${issueIdOrKey}/comments/${commentId}`
    );
    return response.data;
  }

  async deleteComment(issueIdOrKey: string, commentId: number) {
    const response = await this.client.delete(
      `/issues/${issueIdOrKey}/comments/${commentId}`
    );
    return response.data;
  }

  // --- Projects ---
  async listProjects() {
    const response = await this.client.get("/projects");
    return response.data;
  }

  async getProject(projectIdOrKey: string) {
    const response = await this.client.get(`/projects/${projectIdOrKey}`);
    return response.data;
  }

  async listProjectUsers(projectIdOrKey: string) {
    const response = await this.client.get(`/projects/${projectIdOrKey}/users`);
    return response.data;
  }

  async addProjectUser(projectIdOrKey: string, userId: number) {
    const params = { userId };
    const response = await this.client.post(
      `/projects/${projectIdOrKey}/users`,
      null,
      { params }
    );
    return response.data;
  }

  async removeProjectUser(projectIdOrKey: string, userId: number) {
    const params = { userId };
    const response = await this.client.delete(
      `/projects/${projectIdOrKey}/users`,
      { params }
    );
    return response.data;
  }

  // --- Metadata ---
  async getMyself() {
    const response = await this.client.get("/users/myself");
    return response.data;
  }

  async listPriorities() {
    const response = await this.client.get("/priorities");
    return response.data;
  }

  async listStatuses() {
    const response = await this.client.get("/statuses");
    return response.data;
  }

  async listIssueTypes(projectIdOrKey: string) {
    const response = await this.client.get(
      `/projects/${projectIdOrKey}/issueTypes`
    );
    return response.data;
  }

  async listCategories(projectIdOrKey: string) {
    const response = await this.client.get(
      `/projects/${projectIdOrKey}/categories`
    );
    return response.data;
  }

  async listVersions(projectIdOrKey: string) {
    const response = await this.client.get(
      `/projects/${projectIdOrKey}/versions`
    );
    return response.data;
  }

  async listMilestones(projectIdOrKey: string) {
    // Milestones are essentially versions in Backlog API jargon (often used interchangeably or as a subset)
    // But typically 'versions' endpoint covers versions/milestones.
    // Let's double check if there's a specific 'milestones' endpoint.
    // Backlog API v2 uses 'versions' for both.
    const response = await this.client.get(
      `/projects/${projectIdOrKey}/versions`
    );
    return response.data;
  }

  // --- Wikis ---
  async listWikis(projectIdOrKey: string) {
    const response = await this.client.get(`/wikis`, {
      params: { projectIdOrKey },
    });
    return response.data;
  }

  async getWiki(wikiId: number) {
    const response = await this.client.get(`/wikis/${wikiId}`);
    return response.data;
  }

  async createWiki(params: any) {
    const response = await this.client.post(`/wikis`, params);
    return response.data;
  }

  async updateWiki(wikiId: number, params: any) {
    const response = await this.client.patch(`/wikis/${wikiId}`, params);
    return response.data;
  }

  async deleteWiki(wikiId: number) {
    const response = await this.client.delete(`/wikis/${wikiId}`);
    return response.data;
  }

  // --- Attachments ---
  async listIssueAttachments(issueIdOrKey: string) {
    const response = await this.client.get(
      `/issues/${issueIdOrKey}/attachments`
    );
    return response.data;
  }

  async getAttachment(issueIdOrKey: string, attachmentId: number) {
    // Determines download URL or content.
    // For MCP, returning the download URL might be best if possible,
    // or we might need to download it.
    // Backlog API: GET /issues/:issueIdOrKey/attachments/:attachmentId
    // This returns the file binary.
    // We'll return the metadata or a helper message for now as binary transfer might be tricky in text.
    // Actually, let's just return the metadata from list if possible, or try to get info.
    // The individual get endpoint downloads the file.
    // Let's implement a 'getAttachmentUrl' helper if we can construct it, otherwise we'll skip binary download for now.
    // We can return the path relative to host.
    return {
      message: "Binary download not fully supported in text mode.",
      url: `https://${config.backlogHost}/api/v2/issues/${issueIdOrKey}/attachments/${attachmentId}?apiKey=${config.backlogApiKey}`,
    };
  }
}
