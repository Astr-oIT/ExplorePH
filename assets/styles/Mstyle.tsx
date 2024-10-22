import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  calloutTitle: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    position: 'absolute',
    top: 100,
    right: 10,
    borderRadius: 20,
    backgroundColor: '#87CEEB',
  },
  mapToggleText: {
    fontSize: 16,
    color: 'black',
  },
  mapToggleButton: {
    padding: 10,
    borderRadius: 5,
  },
  travelModeContainer: {
    position: 'absolute',
    top: 160,
    right: 10,
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginBottom: 30,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
  travelModeButton: {
    alignItems: 'center',
  },
  
});

export default styles;
