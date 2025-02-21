import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getSubscriberInvitesCount } from '../functions/get-subscribe-invites-counter'
import { getSubscriberRankingPosition } from '../functions/get-subscribe-ranking-position'

export const getSubscriberRankingPositionRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/subscribers/:subscriberId/ranking/position',
      {
        schema: {
          tags: ['referral'],
          params: z.object({
            subscriberId: z.string(),
          }),
          response: {
            200: z.object({
              position: z.number().nullable(),
            }),
          },
        },
      },
      async (request, _) => {
        const { subscriberId } = request.params

        const { position } = await getSubscriberRankingPosition({
          subscriberId,
        })

        return { position }
      }
    )
  }
