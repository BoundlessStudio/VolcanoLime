/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface AuthorDocument {
  /** @minLength 1 */
  picture: string
  /** @minLength 1 */
  name: string
  /** @minLength 1 */
  mention: string
}

export interface CommentCreateDocument {
  /** @minLength 1 */
  feedId: string
  /** @default "comment" */
  type?: string
  /** @minLength 1 */
  body: string
}

export interface CommentDocument {
  /** @minLength 1 */
  commentId: string
  /** @minLength 1 */
  type: string
  /** @minLength 1 */
  body: string
  inContext: boolean
  /** @format int32 */
  tokens: number
  /** @format double */
  relevance: number
  /** @minLength 1 */
  feedId: string
  author: AuthorDocument
  /** @format date-time */
  timestamp: string
}

/** @format int32 */
export enum FeedAccess {
  Private = 0,
  Public = 1
}

export interface FeedCreateDocument {
  /** @minLength 1 */
  name: string
  /** @minLength 1 */
  template: string
}

export interface FeedDocument {
  /** @minLength 1 */
  feedId: string
  /** @minLength 1 */
  name: string
  /** @minLength 1 */
  description: string
  access: FeedAccess
  selectedSkills: string[]
}

export interface FeedEditDocument {
  /** @minLength 1 */
  feedId: string
  /** @minLength 1 */
  name: string
  /** @minLength 1 */
  description: string
  access: FeedAccess
  selectedSkills: string[]
}

export interface FileDocument {
  /** @minLength 1 */
  name: string
  /** @minLength 1 */
  url: string
  /** @minLength 1 */
  type: string
  /** @format int64 */
  size: number
}

export interface SkillDocument {
  /** @minLength 1 */
  skillId: string
  /** @minLength 1 */
  name: string
  /** @minLength 1 */
  owner: string
  type: SkillType
  typeOf?: string | null
  prompt?: string | null
  description?: string | null
  url?: string | null
}

/** @format int32 */
export enum SkillType {
  Unknown = 0,
  Coded = 1,
  Semantic = 2,
  OpenApi = 3
}

import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type HeadersDefaults,
  type ResponseType
} from 'axios'

export type QueryParamsType = Record<string | number, any>

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, 'data' | 'params' | 'url' | 'responseType'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean
  /** request path */
  path: string
  /** content type of request body */
  type?: ContentType
  /** query params */
  query?: QueryParamsType
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType
  /** request body */
  body?: unknown
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, 'data' | 'cancelToken'> {
  securityWorker?: (
    securityData: SecurityDataType | null
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void
  secure?: boolean
  format?: ResponseType
}

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain'
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance
  private securityData: SecurityDataType | null = null
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker']
  private secure?: boolean
  private format?: ResponseType

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || 'https://electric-raspberry.azurewebsites.net'
    })
    this.secure = secure
    this.format = format
    this.securityWorker = securityWorker
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data
  }

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method)

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {})
      }
    }
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === 'object' && formItem !== null) {
      return JSON.stringify(formItem)
    } else {
      return `${formItem}`
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key]
      const propertyContent: any[] = property instanceof Array ? property : [property]

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem))
      }

      return formData
    }, new FormData())
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {}
    const requestParams = this.mergeRequestParams(params, secureParams)
    const responseFormat = format || this.format || undefined

    if (type === ContentType.FormData && body && body !== null && typeof body === 'object') {
      body = this.createFormData(body as Record<string, unknown>)
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== 'string') {
      body = JSON.stringify(body)
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {})
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path
    })
  }
}

/**
 * @title Electric Raspberry
 * @version v1
 * @baseUrl https://electric-raspberry.ngrok.app
 *
 * Apis for Volcano Lime
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags CommentController
     * @name ListComments
     * @request GET:/api/comments/{feed_id}
     * @secure
     */
    listComments: (feedId: string, params: RequestParams = {}) =>
      this.request<CommentDocument[], void>({
        path: `/api/comments/${feedId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags CommentController
     * @name CreateComment
     * @request POST:/api/comment
     * @secure
     */
    createComment: (data: CommentCreateDocument, params: RequestParams = {}) =>
      this.request<CommentDocument, void | string>({
        path: `/api/comment`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags CommentController
     * @name DeleteComment
     * @request DELETE:/api/comment/{comment_id}
     * @secure
     */
    deleteComment: (commentId: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/api/comment/${commentId}`,
        method: 'DELETE',
        secure: true,
        ...params
      }),

    /**
     * No description
     *
     * @tags FeedController
     * @name ListFeeds
     * @request GET:/api/feeds
     * @secure
     */
    listFeeds: (params: RequestParams = {}) =>
      this.request<FeedDocument[], void>({
        path: `/api/feeds`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags FeedController
     * @name CreateFeed
     * @request POST:/api/feed
     * @secure
     */
    createFeed: (data: FeedCreateDocument, params: RequestParams = {}) =>
      this.request<FeedDocument, void>({
        path: `/api/feed`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags FeedController
     * @name EditFeed
     * @request PUT:/api/feed
     * @secure
     */
    editFeed: (data: FeedEditDocument, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/api/feed`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params
      }),

    /**
     * No description
     *
     * @tags FeedController
     * @name GetFeed
     * @request GET:/api/feed/{feed_id}
     * @secure
     */
    getFeed: (feedId: string, params: RequestParams = {}) =>
      this.request<FeedDocument, void>({
        path: `/api/feed/${feedId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags FeedController
     * @name DeleteFeed
     * @request DELETE:/api/feed/{feed_id}
     * @secure
     */
    deleteFeed: (feedId: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/api/feed/${feedId}`,
        method: 'DELETE',
        secure: true,
        ...params
      }),

    /**
     * No description
     *
     * @tags FileController
     * @name Whisper
     * @request POST:/api/whisper
     * @secure
     */
    whisper: (
      data: {
        /** @format binary */
        file: File
      },
      params: RequestParams = {}
    ) =>
      this.request<string, void>({
        path: `/api/whisper`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags FileController
     * @name Upload
     * @request POST:/api/upload/{feed_id}
     * @secure
     */
    upload: (
      feedId: string,
      data: {
        files: File[]
      },
      params: RequestParams = {}
    ) =>
      this.request<FileDocument[], void>({
        path: `/api/upload/${feedId}`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags SkillController
     * @name ListSkills
     * @request GET:/api/skills
     * @secure
     */
    listSkills: (params: RequestParams = {}) =>
      this.request<SkillDocument[], void>({
        path: `/api/skills`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      })
  }
}
