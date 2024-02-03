import { StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { View, Text } from "../../../components/Themed";
import { Poll as PollType } from "../../../types";
import Checkbox from "expo-checkbox";
import { useState } from "react";

interface PollProps {
  poll: PollType;
}

const Poll = ({ poll }: PollProps) => {
  const [selected, setSelected] = useState<boolean[]>(
    Array(poll?.options?.length).fill(false)
  );
  const [selectedOption, setSelectedOption] = useState<string[]>([]);
  const handlePoll = (pollId: string, index: number) => {
    console.log(poll.allowMultiple, "poll.allowMultiple");
    if (poll.allowMultiple == false) {
      setSelected(Array(poll?.options?.length).fill(false));

      setSelected(selected.map((item, i) => (i === index ? !item : item)));
    } else {
      setSelected(selected.map((item, i) => (i === index ? !item : item)));
    }
    console.log(poll.allowMultiple, "poll.allowMultiple");
    setSelectedOption((prv) => [...prv, pollId]);
  };

  return (
    <View>
      <View style={styles.pollMainContainer}>
        <View style={styles.pollContainer}>
          <FontAwesome5 name="poll" size={24} color="#BF6A63" />
          <Text style={styles.pollQuestion}>Poll</Text>
          <Text style={styles.pollParticipants}>
            {poll.participants} Participants
          </Text>
        </View>
        {poll?.allowMultiple ? (
          <Text style={styles.pollAllowMultiple}>Select answer</Text>
        ) : (
          <Text>Select only one answer</Text>
        )}
        <View>
          {poll?.options?.map((option, index) => (
            <View style={styles.pollOptionMainContainer} key={option.id}>
              <View style={styles.pollOptionContainer}>
                <Checkbox
                  style={styles.checkbox}
                  value={selected[index]}
                  onValueChange={() =>
                    handlePoll(option.id ? option.id : "", index)
                  }
                />

                <Text style={styles.pollOption}>{option.option}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default Poll;

const styles = StyleSheet.create({
  pollMainContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#262628",
    shadowColor: "#000",
    padding: 15,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  pollAllowMultiple: {
    color: "grey",
    fontSize: 16,
  },
  pollContainer: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#262628",
    borderRadius: 10,
    padding: 10,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#262628",
    marginBottom: 5,
    paddingVertical: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  pollParticipants: {
    fontSize: 16,
    fontWeight: "400",
    color: "#E7E7E8",
    paddingLeft: 10,
  },
  pollQuestion: {
    fontSize: 16,
    fontWeight: "600",
    color: "#BF6A63",
    paddingHorizontal: 5,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: "grey",
  },
  pollOptionMainContainer: {
    marginVertical: 5,
    marginHorizontal: 10,
  },
  pollOptionContainer: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#262628",
    borderRadius: 10,
    width: "100%",
    backgroundColor: "#262628",
    marginBottom: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    marginHorizontal: 10,
    borderRadius: 100,
    borderColor: "#E7E7E8",
  },
  pollOption: {
    fontSize: 16,
    fontWeight: "400",
    color: "#E7E7E8",
    paddingLeft: 10,
  },
});
