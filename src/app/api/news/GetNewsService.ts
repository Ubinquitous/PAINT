import axios from "axios";
import { NextResponse } from "next/server";
import { getAuthorizationToken } from "~/lib/getAuthorizationToken";
import { jwtUtils } from "~/lib/jwtUtils";

class GetNewsService {
  public async execute() {
    const { connectedId } = jwtUtils().verify(getAuthorizationToken());
    if (!connectedId)
      return NextResponse.json({ data: "인증이 되지 않았어요" });
    const keyword = "금융";
    const { data } = await axios.get(
      `https://openapi.naver.com/v1/search/news.json`,
      {
        params: {
          query: keyword,
          display: 100,
          sort: "date",
        },
        headers: {
          "X-Naver-Client-Id": process.env.NEXT_PUBLIC_NAVER_CLIENT_ID,
          "X-Naver-Client-Secret": process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET,
        },
      }
    );
    return NextResponse.json({ data });
  }
}

export default GetNewsService;
