+++
title = 'Reinstalling Ubuntu'
description = "Instructions to reinstall Ubuntu on a dual-boot partition."
slug = "reinstalling-ubuntu"
type = "note"
date = "2025-09-25T11:49:56Z"
date_planted = "2025-09-25T11:49:56Z"
date_tended = "2025-09-25T11:49:56Z"
draft = false
# Epistemic status - certainty and vibe
certainty = "medium"
vibes = "pretty sure this is a thing"
# Epistemic effort - how much time spent on this
effort = "medium"
# Maintenance status
growth_stage = "bloom"
# Thematic clustering
topics = ["Development"]
tags = ["linux", "ubuntu", "windows"]
+++

## Overview

Some time ago, I had partitioned an old Windows laptop to dual-boot Ubuntu. For reasons, I needed to reinstall Ubuntu on the partition. I looked around the internet to piece together a coherent set of instructions

## Formatting the USB flash drive

The first time I installed Ubuntu, I used a USB drive to flash Ubuntu v24.04 ISO onto it. I wanted to use the newer version this time around. The USB drive was write-protected from the first installation, so these are the steps I followed to be able to format it. All steps were performed on a Windows machine.

### Make USB drive writable:

1. Open **Command Prompt** as administrator
2. Type `diskpart` and press Enter
3. Type `list disk` to see all drives
4. Identify your USB drive. Use the sizes to help you determine the right one
5. Type `select disk X` (where `X` is your USB drive number)
6. Type `attributes disk clear readonly`
7. Type `clean` to wipe the drive
8. Type `exit` twice

Following the above steps seemed to work, but the USB drive sort of “vanished” from the system. I was not able to see it even when I pulled it out and plugged it in again. This likely happened because there is no primary partition on the USB drive. The steps below describe how this was remedied:

### Recreate the partition

1. Open **Command Prompt** as administrator again
2. Type `diskpart`
3. Type `list disk` - your USB drive should still appear here (even if not in File Explorer)
4. Select your USB drive: `select disk X` (where X is your USB number)
5. Create a new partition table: `create partition primary`
6. Type `exit` twice

This solved the "invisible" USB drive issue. At this point the USB drive is ready to be formatted.

1. Open `Computer`
2. Right-click on the USB drive and `Format`
3. Select `NTFS` format.

After this step, the USB drive was usable again. Now it was ready to be used to create a new bootable Ubuntu Flash Drive.

## Flashing Ubuntu image on USB drive

{{< link-preview "https://www.youtube.com/watch?v=qq-7X8zLP7g" >}}

I followed the instructions in the first 2 minutes of the linked video to create the bootable Ubuntu flash drive.

## Reinstalling ubuntu

Once the Ubuntu flash drive was ready, I plugged it in and restart the machine. From the resulting menu, I chose:

```bash
Try or install Ubuntu.
```

Choosing this booted Ubuntu from the USB drive. On the desktop, there was an icon, likely in the bottom-right corner with the title:

```bash
Install Ubuntu v25.04
```

Double-clicking this icon will open up the installation wizard. I want through the steps until I reached the installation type. Here I chose the last option on the list, which was:

```bash
Manual installation
```

On the next screen, I choose the partition I wanted to reinstall Ubuntu on. The partition had the `EXT4` filesystem and `Ubuntu vXX.XX` in the details.

I clicked the `change` option and set the format to `EXT4` and the mount point as `/`.

Then I continued to the end of the installation wizard.

Then once all that is complete, you will be asked to restart your machine. You will also be asked to remove the USB drive. This should complete the reinstallation. The whole process was user friendly and not as intimidating as it initially seemed.
