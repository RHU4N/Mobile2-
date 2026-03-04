//imports
import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  ScrollView,
} from "react-native";
import styles from "./styles";

//post genericos 
const INITIAL_POSTS = [
  {
    id: "1",
    author: "João Silva",
    avatar: "👨‍💻",
    content: "Que dia incrível para programar em React Native! 🚀",
    timestamp: "Há 2 horas",
    likes: 45,
    comments: 8,
    shares: 3,
    liked: false,
  },
  {
    id: "2",
    author: "Maria Santos",
    avatar: "👩‍🏫",
    content: "Dicas de estudo para React: sempre pratique projetos reais!",
    timestamp: "Há 4 horas",
    likes: 120,
    comments: 25,
    shares: 15,
    liked: false,
  },
  {
    id: "3",
    author: "Pedro Costa",
    avatar: "🎨",
    content: "Novo design pattern implementado com sucesso no projeto!",
    timestamp: "Há 6 horas",
    likes: 78,
    comments: 12,
    shares: 7,
    liked: false,
  },
  {
    id: "4",
    author: "Ana Oliveira",
    avatar: "🌟",
    content: "Alcancei meu primeiro milestone de 10k seguidores! Obrigada a todos!",
    timestamp: "Há 8 horas",
    likes: 256,
    comments: 48,
    shares: 89,
    liked: false,
  },
  {
    id: "5",
    author: "Carlos Mendes",
    avatar: "⚡",
    content: "Performance é tudo! Otimizando renderização de listas...",
    timestamp: "Há 10 horas",
    likes: 92,
    comments: 20,
    shares: 11,
    liked: false,
  },
];

export default function App() {
  //useState
  const [posts, setPosts] = useState(INITIAL_POSTS);

  //darLike
  const toggleLike = (postId) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            liked: !post.liked,
            likes: post.liked ? post.likes - 1 : post.likes + 1,
          };
        }
        return post;
      })
    );
  };

  //comment++
  const addComment = (postId) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: post.comments + 1,
          };
        }
        return post;
      })
    );
  };

  //compartilhar++
  const addShare = (postId) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            shares: post.shares + 1,
          };
        }
        return post;
      })
    );
  };

  //mostrar Post
  const renderPost = ({ item }) => (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <Text style={styles.avatar}>{item.avatar}</Text>
        <View style={styles.authorInfo}>
          <Text style={styles.authorName}>{item.author}</Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
      </View>

      <Text style={styles.postContent}>{item.content}</Text>

      <View style={styles.statsContainer}>
        <Text style={styles.stat}>{item.likes} curtidas</Text>
        <Text style={styles.stat}>{item.comments} comentários</Text>
        <Text style={styles.stat}>{item.shares} compartilhamentos</Text>
      </View>

      <View style={styles.actionsContainer}>
        <Pressable
          style={[
            styles.actionButton,
            item.liked && styles.actionButtonActive,
          ]}
          onPress={() => toggleLike(item.id)}
        >
          <Text style={styles.actionIcon}>👍</Text>
          <Text style={styles.actionText}>
            {item.liked ? "Descurtir" : "Curtir"}
          </Text>
        </Pressable>

        <Pressable
          style={styles.actionButton}
          onPress={() => addComment(item.id)}
        >
          <Text style={styles.actionIcon}>💬</Text>
          <Text style={styles.actionText}>Comentar</Text>
        </Pressable>

        <Pressable
          style={styles.actionButton}
          onPress={() => addShare(item.id)}
        >
          <Text style={styles.actionIcon}>📤</Text>
          <Text style={styles.actionText}>Compartilhar</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Rede Social</Text>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderPost}
        scrollEnabled={true}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}
