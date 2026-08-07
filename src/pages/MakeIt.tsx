import { MAKE_IT_POSTS } from "@/api/dummyData";
import PostBoard from "@/components/makeIt/PostBoard";

export default function MakeIt() {
  return (
    <PostBoard
      title="See how others used Today's sentence"
      subtitle="오늘의 문장, 다들 이렇게 썼어요. 이제 당신 차례예요"
      posts={MAKE_IT_POSTS}
    />
  );
}
