import { Card, Tag, Space, Typography } from "antd";
import { SmileTwoTone, FrownTwoTone } from "@ant-design/icons";
import type { Post } from "../model/types";

const { Paragraph } = Typography;

type PostCardProps = {
  post: Post;
};

export const PostCard = ({ post }: PostCardProps) => {
  return (
    <Card
      title={post.title}
      style={{ marginBottom: 24, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
      hoverable
    >
      <Paragraph ellipsis={{ rows: 3, expandable: true, symbol: "ещё" }}>
        {post.body}
      </Paragraph>
      <div style={{ marginTop: 12 }}>
        <Space wrap>
          {post.tags.map((tag) => (
            <Tag key={tag} color="magenta">
              #{tag}
            </Tag>
          ))}
        </Space>
      </div>
      <div
        style={{
          marginTop: 16,
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <SmileTwoTone twoToneColor="#52c41a" />
          <span>{post.reactions.likes}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <FrownTwoTone twoToneColor="#f5222d" />
          <span>{post.reactions.dislikes}</span>
        </div>
      </div>
    </Card>
  );
};
