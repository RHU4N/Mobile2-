import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f4f7fb",
  },
  screen: {
    flex: 1,
    backgroundColor: "#f4f7fb",
    paddingTop: 48,
    paddingHorizontal: 16,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 12,
  },
  loginContainer: {
    flex: 1,
    justifyContent: "center",
  },
  loginHint: {
    color: "#4b5563",
    marginBottom: 12,
  },
  loginHintSmall: {
    color: "#6b7280",
    marginBottom: 12,
    fontSize: 12,
    lineHeight: 16,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
  },
  errorText: {
    color: "#b91c1c",
    marginBottom: 8,
  },
  primaryButton: {
    backgroundColor: "#2563eb",
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: 12,
    marginTop: 2,
  },
  primaryButtonText: {
    color: "#fff",
    fontWeight: "700",
  },
  appHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  userText: {
    color: "#4b5563",
    marginBottom: 10,
  },
  themeText: {
    color: "#475569",
    fontSize: 13,
    marginBottom: 12,
  },
  crudBody: {
    flex: 1,
  },
  menuContainer: {
    gap: 12,
    marginTop: 8,
  },
  menuButton: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: "#dbe4ee",
  },
  menuButtonText: {
    color: "#111827",
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 4,
  },
  menuButtonDescription: {
    color: "#4b5563",
    fontSize: 13,
    lineHeight: 18,
  },
  secondaryButton: {
    borderColor: "#6b7280",
    borderWidth: 1,
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: 10,
    marginTop: 8,
    width: 100,
  },
  secondaryButtonText: {
    color: "#374151",
    fontWeight: "600",
  },
  formContainer: {
    backgroundColor: "#ffffff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },
  warningButton: {
    backgroundColor: "#d97706",
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: 12,
  },
  listContainer: {
    flex: 1,
    marginBottom: 8,
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyText: {
    color: "#6b7280",
    textAlign: "center",
    marginTop: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  cardInfo: {
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  cardText: {
    color: "#4b5563",
    marginTop: 2,
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
  },
  editButton: {
    backgroundColor: "#0891b2",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "700",
  },
  deleteButton: {
    backgroundColor: "#dc2626",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "700",
  },
  emptyStateCard: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginBottom: 12,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 6,
  },
  emptyStateText: {
    color: "#4b5563",
    lineHeight: 20,
    marginBottom: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.55)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  modalContent: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },
  modalText: {
    color: "#4b5563",
    lineHeight: 20,
    marginBottom: 16,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
  modalCancelButton: {
    borderWidth: 1,
    borderColor: "#9ca3af",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  modalCancelButtonText: {
    color: "#374151",
    fontWeight: "600",
  },
  modalDeleteButton: {
    backgroundColor: "#dc2626",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  modalDeleteButtonText: {
    color: "#fff",
    fontWeight: "700",
  },
});

export default styles;
