import type { NextApiRequest, NextApiResponse } from 'next'
import LumosRailsApi from '@backend/libs/LumosRailsApi'
import logger from '@backend/libs/logger'

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {

  const service = new LumosRailsApi()
  const accessToken = 'bgsi2uge4jsa86pw613ib4tgz'

  try {
    const result = await service.saveGameResult(accessToken, 'raindrops-nest', {
      "score": 3000,
      "session_level": 0,
      "user_level": 0,
      "game_result_data": {
        "num_correct": 6,
        "num_tries": 0,
        "num_pauses": 7,
        "num_defocus": 0,
        "num_restart": 0,
        "width": 819.2,
        "height": 480,
        "locale_id": "en_US",
        "default_locale_id": null,
        "version": "30103",
        "seed": 1626963995605,
        "num_problems": 10,
        "num_tries_corrections": 0,
        "num_corrections": 0,
        "cheatCount": 0,
        "punishmentTime": 0,
        "speed": 18,
        "num_problems_correct": 6,
        "response_time_correct": 5213,
        "time": 57713,
        "playTime": 57713,
        "fit_test": "F",
        "average_frame": 23,
        "slowest_frame": 732,
        "slowest_frame_at_time": 732,
        "game_sound_on": true,
        "pauses": "43122:52444:T;55376:56530:T;56856:59952:T;63461:64717:T;65169:68470:T;71914:73366:T",
        "tutorial_start": 0,
        "tutorial_finish": 0,
        "tutorial": null,
        "trial_csv": "response_id,type,response,correct,num_drops,water_level,problem,horizontal,vertical,speed,time_offset,response_time,input_type,num_corrections,regulateRate,nextUpThreshold,spawnPeriod/0,P,T,T,2,0,2+4,132,88,36,5111,3433,S,0,1321,4,1911/2,P,T,T,2,0,5-1,523,127,36,7042,4501,S,0,1443,3,1424/6,P,T,T,2,0,9+4,224,199,36,8544,6439,S,0,534,9,1291/7,P,T,T,2,0,5+1,587,218,36,11543,6858,S,0,500,10,998/7,P,T,T,2,0,2+4,143,91,37,15022,3379,S,0,500,10,998/11,P,T,T,2,0,8-3,550,218,37,18401,6667,S,0,500,10,608/12,P,,F,2,0,5-2,403,360,37,19110,10420,,0,500,10,3614/12,P,,F,2,0,4+1,580,136,38,25068,4462,,0,500,10,3614/13,P,,F,2,1,4+1,239,335,30,29530,12290,,0,500,10,3614/14,P,,F,2,2,7+4,143,310,23,41820,34376,,0,500,10,3614",
        "response_csv": null,
        "dpi": 96,
        "num_trials": 10,
        "num_responses": 0
      },
      "gameStats": {
        "NumberOfTrialsCorrect": 6
      },
      "bestStatKey": "NumberOfTrialsCorrect",
      "stat": 6,
      "specName": "Raindrops"
    })
    console.log('result', result)
    res.send(result)
  } catch (error) {
    logger.error(error.response, 'saveGameResult')
    res.send(error.response.data)
  }
  /*
    try {
      const result = await service.loginByGoogleToken(token)
      if (!result?.access_token) {
        throw new Error('access_token is incorrect')
      }
      await authService.saveUser(userId, {
        lumosity_access_token: result?.access_token
      })
      //TODO: mark user as linked
      res.send(result)
    } catch (error) {
      logger.error(error, 'loginByGoogleToken')
      res.send('aaa')
    }*/
  /*
    try {
  
      const accessToken = await service.getApiAccessToken()
      console.log('access_token', accessToken.access_token)
      const result = await service.createAccountWithGoogleIdToken(accessToken.access_token, token) //("sn69nto4ykwfclz7urzywcy7", token)
      console.log('result', result)
      res.send(result)
  
    } catch (error) {
      console.log(error.response)
      console.log('error')
      res.send(error?.response?.data)
    }
    */
}
