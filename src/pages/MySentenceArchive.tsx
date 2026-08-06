import { MY_SENTENCE_POSTS } from "@/api/dummyData";
import PostBoard from "@/components/makeIt/PostBoard";

export default function MySentenceArchive() {
  return (
    <PostBoard
      title="My Sentence Archive"
      subtitle="지금까지 만든 문장을 한눈에 확인해봐요"
      posts={MY_SENTENCE_POSTS}
    />
  );
}
