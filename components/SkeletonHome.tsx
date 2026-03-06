import React, { useState, useEffect  } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../utils/loads/stylesHomeLoad';
import { ChevronRight, Clock, Dumbbell, Flame, User} from 'lucide-react-native';

export default function SkeletonHome() {
    
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
            <View style={styles.header}>
                <View>
                <Text style={styles.greeting}></Text>
                <Text style={styles.headerTitle}></Text>
                </View>
                <TouchableOpacity>
                <View style={styles.avatar}>
                    <User color="#a1a1aa" size={20} />
                </View>
                </TouchableOpacity>
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}></Text>
                <TouchableOpacity style={styles.workoutCard}>
                <View style={styles.workoutCardContent}>
                    <View style={styles.badge}>
                    <Text style={styles.badgeText}></Text>
                    </View>
                    <Text style={styles.workoutTitle}></Text>
                    <Text style={styles.workoutSubtext}>
                    
                    </Text>
                    <View style={styles.startNow}>
                    <Text style={styles.startNowText}></Text>
                    <ChevronRight color="#10b981" size={18} />
                    </View>
                </View>
                <View style={styles.workoutCardIcon}>
                    <Dumbbell color="#10b981" size={60} opacity={0.1} />
                </View>
                </TouchableOpacity>
            </View>
            </ScrollView>
    )
}